import crypto from 'crypto';
import { 
  Certification, 
  Provider, 
  Category, 
  Order, 
  OrderItem, 
  VoucherItem, 
  VoucherStatus, 
  OrderStatus, 
  SupportTicket, 
  TicketCategory,
  UserProfile 
} from '../types';
import { CERTIFICATIONS } from '../data/certifications';
import { PROVIDERS } from '../data/providers';
import { CATEGORIES } from '../data/categories';
import { generateOrderNumber } from '../utils/formatters';

export interface InternalVoucher {
  id: string;
  certificationId: string;
  voucherCode: string; // Plain/encrypted storage
  expiryDate: string;
  region: string;
  redemptionInstructions: string;
  supplierReference?: string;
  status: VoucherStatus;
  orderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InternalAllocation {
  id: string;
  orderId: string;
  orderItemId: string;
  voucherId: string;
  userId: string;
  allocatedAt: string;
  revealedAt?: string;
  revealCount: number;
  lastIpHash?: string;
}

// In-Memory state with initial seed data
class DatabaseStore {
  private static instance: DatabaseStore;

  private certifications: Certification[] = [...CERTIFICATIONS];
  private providers: Provider[] = [...PROVIDERS];
  private categories: Category[] = [...CATEGORIES];
  private vouchers: InternalVoucher[] = [];
  private allocations: InternalAllocation[] = [];
  private orders: Order[] = [];
  private supportTickets: SupportTicket[] = [];
  private users: Map<string, UserProfile> = new Map();

  private constructor() {
    this.seedDefaultData();
  }

  public static getInstance(): DatabaseStore {
    if (!DatabaseStore.instance) {
      DatabaseStore.instance = new DatabaseStore();
    }
    return DatabaseStore.instance;
  }

  private seedDefaultData() {
    // Default demo user
    const demoUser: UserProfile = {
      id: 'usr_demo_882910',
      email: 'alex.morgan@example.com',
      fullName: 'Alex Morgan',
      phone: '+91 98765 43210',
      company: 'CloudScale Technologies',
      jobTitle: 'DevOps Specialist',
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    this.users.set(demoUser.id, demoUser);
    this.users.set(demoUser.email, demoUser);

    // Seed realistic vouchers for all active certifications
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const defaultExpiry = futureDate.toISOString().split('T')[0];

    const redemptionGuides: Record<string, string> = {
      'prov-msft': '1. Sign in to your Microsoft Learn profile (learn.microsoft.com).\n2. Navigate to your desired exam schedule page.\n3. Choose Pearson VUE as the exam delivery partner.\n4. On the checkout/payment page, select "Add Voucher or Promo Code".\n5. Enter this voucher code to reduce the balance to ₹0.00.\n6. Confirm your appointment time and appointment confirmation email.',
      'prov-aws': '1. Sign in to your AWS Certification Account at aws.training/Certification.\n2. Click "Schedule New Exam" and select Pearson VUE.\n3. Select your preferred date, time, and test delivery method (online or testing center).\n4. Proceed to the payment screen and click "Voucher/Promotion Code".\n5. Enter your voucher code and apply.\n6. Verify the 100% price waiver and submit.',
      'prov-gcp': '1. Create or log in to your Google Cloud Webassessor account.\n2. Select your scheduled certification exam and choose remote or on-site proctoring.\n3. In the checkout screen, enter your voucher code in the "Coupon/Voucher" box.\n4. Click "Apply" to zero out the exam cost and click "Submit Order".',
      'prov-cisco': '1. Visit pearsonvue.com/cisco and log in with your Cisco ID (CSCO).\n2. Schedule exam 200-301 CCNA or your designated Cisco exam code.\n3. At the payment step, paste your voucher code in the "Promo Code / Voucher" input.\n4. Complete the checkout verification.',
      'prov-comptia': '1. Log in to your CompTIA Store or Pearson VUE CompTIA candidate portal.\n2. Schedule your exam session.\n3. In the final payment screen, enter this voucher in the "Voucher/Promo Code" field.\n4. The exam total will automatically adjust to ₹0.',
      'prov-nutanix': '1. Sign in to Nutanix University (nutanix.com/support-services/training-certification).\n2. Select the NCP exam on PSI Online.\n3. Enter the voucher code on the payment summary screen.',
      'prov-linux-foundation': '1. Go to training.linuxfoundation.org.\n2. Add CKA exam registration to your shopping cart.\n3. In the discount coupon/voucher box, enter your unique voucher code.\n4. The checkout will reflect a 100% discount.',
      'prov-hashicorp': '1. Go to hashicorp.com/certification.\n2. Choose PSI Testing for Terraform Associate.\n3. Apply your voucher code at checkout to confirm your test slot.',
    };

    this.certifications.forEach((cert) => {
      const providerGuide = redemptionGuides[cert.providerId] || 'Redeem via official exam portal during checkout.';
      // Create 5 real inventory vouchers per certification
      for (let i = 1; i <= 5; i++) {
        const uniqueSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `CV-${cert.examCode.replace(/[^A-Z0-9]/gi, '')}-${uniqueSuffix}-${1000 + i}`;
        this.vouchers.push({
          id: `vch_${cert.id}_${i}`,
          certificationId: cert.id,
          voucherCode: code,
          expiryDate: defaultExpiry,
          region: cert.availableRegions[0] || 'India / Global',
          redemptionInstructions: providerGuide,
          supplierReference: `PO-CERTIVAULT-2026-${cert.providerSlug.toUpperCase()}`,
          status: 'available',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    });

    // Seed one completed historical order for demo user so dashboard looks great immediately
    const sampleCert = this.certifications[0]; // AZ-900
    const orderNumber = 'CV-2026-819204';
    const orderId = 'ord_demo_az900';
    const orderItemId = 'ord_item_demo_1';
    const unitPrice = sampleCert.voucherPriceInr;
    const taxAmount = Math.round(unitPrice * 0.18);
    const totalAmount = unitPrice + taxAmount;

    // Allocate 1 voucher to demo user
    const allocatedVoucher = this.vouchers.find(v => v.certificationId === sampleCert.id);
    if (allocatedVoucher) {
      allocatedVoucher.status = 'sold';
      allocatedVoucher.orderId = orderId;

      this.allocations.push({
        id: 'alloc_demo_1',
        orderId: orderId,
        orderItemId: orderItemId,
        voucherId: allocatedVoucher.id,
        userId: demoUser.id,
        allocatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        revealedAt: undefined, // starts masked
        revealCount: 0,
      });
    }

    this.orders.push({
      id: orderId,
      orderNumber: orderNumber,
      userId: demoUser.id,
      customerName: demoUser.fullName,
      customerEmail: demoUser.email,
      customerPhone: demoUser.phone || '',
      totalAmountInr: totalAmount,
      taxAmountInr: taxAmount,
      status: 'fulfilled',
      razorpayOrderId: 'order_MOCK_AZ900_DEMO',
      razorpayPaymentId: 'pay_MOCK_AZ900_CONFIRMED',
      paymentMethod: 'UPI (Google Pay)',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      items: [
        {
          id: orderItemId,
          orderId: orderId,
          certificationId: sampleCert.id,
          certificationName: sampleCert.name,
          examCode: sampleCert.examCode,
          providerName: sampleCert.providerName,
          quantity: 1,
          unitPriceInr: unitPrice,
          totalPriceInr: unitPrice,
        },
      ],
    });

    // Seed a sample support ticket
    this.supportTickets.push({
      id: 'tkt_demo_1',
      ticketNumber: 'TKT-2026-4401',
      userId: demoUser.id,
      orderId: orderId,
      subject: 'Clarification regarding Pearson VUE scheduling window',
      category: 'Voucher Redemption',
      message: 'Hello CertiVault team, does the voucher need to be scheduled within 3 months, or can the actual exam date be scheduled up to the full 12-month validity date?',
      status: 'resolved',
      priority: 'medium',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    });
  }

  // ==========================================
  // CATALOG METHODS
  // ==========================================

  public getCertifications(filter?: {
    provider?: string;
    category?: string;
    difficulty?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Certification[] {
    let result = [...this.certifications];

    // Recalculate dynamic stock counts based on real available vouchers
    result = result.map(cert => {
      const availCount = this.vouchers.filter(
        v => v.certificationId === cert.id && v.status === 'available'
      ).length;
      return {
        ...cert,
        stockCount: availCount,
      };
    });

    if (!filter) return result;

    if (filter.provider && filter.provider !== 'all') {
      result = result.filter(c => c.providerSlug === filter.provider || c.providerId === filter.provider);
    }

    if (filter.category && filter.category !== 'all') {
      result = result.filter(c => c.categorySlug === filter.category || c.categoryId === filter.category);
    }

    if (filter.difficulty && filter.difficulty !== 'all') {
      result = result.filter(c => c.difficultyLevel === filter.difficulty);
    }

    if (filter.minPrice !== undefined) {
      result = result.filter(c => c.voucherPriceInr >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter(c => c.voucherPriceInr <= filter.maxPrice!);
    }

    if (filter.search && filter.search.trim()) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.examCode.toLowerCase().includes(q) ||
        c.providerName.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q) ||
        c.skillsCovered.some(s => s.toLowerCase().includes(q)) ||
        c.careerOpportunities.some(o => o.toLowerCase().includes(q))
      );
    }

    return result;
  }

  public getCertificationBySlug(slug: string): Certification | undefined {
    const cert = this.certifications.find(c => c.slug === slug);
    if (!cert) return undefined;
    const availCount = this.vouchers.filter(
      v => v.certificationId === cert.id && v.status === 'available'
    ).length;
    return {
      ...cert,
      stockCount: availCount,
    };
  }

  public getCertificationById(id: string): Certification | undefined {
    const cert = this.certifications.find(c => c.id === id);
    if (!cert) return undefined;
    const availCount = this.vouchers.filter(
      v => v.certificationId === cert.id && v.status === 'available'
    ).length;
    return {
      ...cert,
      stockCount: availCount,
    };
  }

  public getProviders(): Provider[] {
    return [...this.providers];
  }

  public getCategories(): Category[] {
    return [...this.categories];
  }

  // ==========================================
  // ORDER & PAYMENT TRANSACTIONS
  // ==========================================

  public createOrder(params: {
    userId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    certificationId: string;
    quantity: number;
    billingAddress?: Record<string, unknown>;
    notes?: string;
  }): { success: boolean; order?: Order; error?: string } {
    const cert = this.getCertificationById(params.certificationId);
    if (!cert) {
      return { success: false, error: 'Certification not found' };
    }

    // Verify inventory availability
    const availableVouchers = this.vouchers.filter(
      v => v.certificationId === cert.id && v.status === 'available'
    );

    if (availableVouchers.length < params.quantity) {
      return { 
        success: false, 
        error: `Insufficient voucher inventory. Only ${availableVouchers.length} vouchers available.` 
      };
    }

    const unitPrice = cert.voucherPriceInr;
    const subtotal = unitPrice * params.quantity;
    const taxAmount = Math.round(subtotal * 0.18); // 18% GST standard in India
    const totalAmount = subtotal + taxAmount;

    const orderId = typeof crypto.randomUUID === 'function' 
      ? crypto.randomUUID() 
      : `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const orderNumber = generateOrderNumber();
    const orderItemId = typeof crypto.randomUUID === 'function' 
      ? crypto.randomUUID() 
      : `item_${Date.now()}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNumber,
      userId: params.userId,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
      totalAmountInr: totalAmount,
      taxAmountInr: taxAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [
        {
          id: orderItemId,
          orderId: orderId,
          certificationId: cert.id,
          certificationName: cert.name,
          examCode: cert.examCode,
          providerName: cert.providerName,
          quantity: params.quantity,
          unitPriceInr: unitPrice,
          totalPriceInr: subtotal,
        },
      ],
    };

    this.orders.unshift(newOrder);
    return { success: true, order: newOrder };
  }

  public getOrderById(orderId: string): Order | undefined {
    return this.orders.find(o => o.id === orderId || o.orderNumber === orderId);
  }

  public getOrderByRazorpayOrderId(razorpayOrderId: string): Order | undefined {
    return this.orders.find(o => o.razorpayOrderId === razorpayOrderId);
  }

  public restoreOrderFromSupabase(sbOrder: any): Order {
    const existing = this.orders.find(o => 
      o.id === sbOrder.id || 
      o.orderNumber === sbOrder.order_number || 
      (sbOrder.razorpay_order_id && o.razorpayOrderId === sbOrder.razorpay_order_id)
    );
    if (existing) {
      existing.status = sbOrder.status;
      existing.razorpayOrderId = sbOrder.razorpay_order_id || existing.razorpayOrderId;
      existing.razorpayPaymentId = sbOrder.razorpay_payment_id || existing.razorpayPaymentId;
      existing.paymentMethod = sbOrder.payment_method || existing.paymentMethod;
      return existing;
    }

    const totalAmount = Number(sbOrder.total_amount_inr || sbOrder.total_paise || 0);
    const taxAmount = Number(sbOrder.tax_amount_inr || sbOrder.tax_paise || 0);

    const items: OrderItem[] = [];
    if (Array.isArray(sbOrder.order_items) && sbOrder.order_items.length > 0) {
      for (const item of sbOrder.order_items) {
        const cert = this.getCertificationById(item.certification_id) || CERTIFICATIONS[0];
        items.push({
          id: item.id || crypto.randomUUID(),
          orderId: sbOrder.id,
          certificationId: cert.id,
          certificationName: cert.name,
          examCode: cert.examCode,
          providerName: cert.providerName,
          quantity: item.quantity || 1,
          unitPriceInr: Number(item.unit_price_inr || item.unit_price || cert.voucherPriceInr),
          totalPriceInr: Number(item.total_price_inr || item.total_price || cert.voucherPriceInr),
        });
      }
    } else {
      const defaultCert = CERTIFICATIONS[0];
      items.push({
        id: crypto.randomUUID(),
        orderId: sbOrder.id,
        certificationId: defaultCert.id,
        certificationName: defaultCert.name,
        examCode: defaultCert.examCode,
        providerName: defaultCert.providerName,
        quantity: 1,
        unitPriceInr: defaultCert.voucherPriceInr,
        totalPriceInr: defaultCert.voucherPriceInr,
      });
    }

    const restoredOrder: Order = {
      id: sbOrder.id,
      orderNumber: sbOrder.order_number,
      userId: sbOrder.user_id,
      customerName: sbOrder.customer_name,
      customerEmail: sbOrder.customer_email,
      customerPhone: sbOrder.customer_phone,
      totalAmountInr: totalAmount,
      taxAmountInr: taxAmount,
      status: sbOrder.status,
      razorpayOrderId: sbOrder.razorpay_order_id,
      razorpayPaymentId: sbOrder.razorpay_payment_id,
      paymentMethod: sbOrder.payment_method,
      createdAt: sbOrder.created_at,
      updatedAt: sbOrder.updated_at,
      items,
    };

    this.orders.unshift(restoredOrder);
    return restoredOrder;
  }

  public getOrdersByUserId(userId: string): Order[] {
    return this.orders.filter(o => o.userId === userId);
  }

  public updateOrderStatus(
    orderId: string, 
    status: OrderStatus, 
    paymentId?: string, 
    paymentMethod?: string
  ): Order | undefined {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return undefined;

    // Prevent marking already fulfilled/paid orders back to failed/pending
    if ((order.status === 'paid' || order.status === 'fulfilled') && (status === 'failed' || status === 'pending')) {
      return order;
    }

    order.status = status;
    if (paymentId) order.razorpayPaymentId = paymentId;
    if (paymentMethod) order.paymentMethod = paymentMethod;
    order.updatedAt = new Date().toISOString();

    return order;
  }

  /**
   * Atomic transactional allocation equivalent to PostgreSQL `allocate_voucher_for_order`
   */
  public allocateVouchersForOrder(orderId: string): { 
    success: boolean; 
    error?: string; 
    allocatedCount?: number 
  } {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    if (order.status !== 'paid' && order.status !== 'pending') {
      return { success: false, error: `Order is in ${order.status} state, cannot fulfill` };
    }

    let allocatedCount = 0;

    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        // Find available voucher with earliest expiry
        const availableVoucher = this.vouchers
          .filter(v => v.certificationId === item.certificationId && v.status === 'available')
          .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())[0];

        if (!availableVoucher) {
          return {
            success: false,
            error: `Insufficient stock to fulfill item ${item.certificationName}`,
            allocatedCount,
          };
        }

        // Lock & assign voucher
        availableVoucher.status = 'sold';
        availableVoucher.orderId = order.id;
        availableVoucher.updatedAt = new Date().toISOString();

        // Create allocation record
        const allocation: InternalAllocation = {
          id: `alloc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          orderId: order.id,
          orderItemId: item.id,
          voucherId: availableVoucher.id,
          userId: order.userId,
          allocatedAt: new Date().toISOString(),
          revealCount: 0,
        };

        this.allocations.push(allocation);
        allocatedCount++;
      }
    }

    order.status = 'fulfilled';
    order.updatedAt = new Date().toISOString();

    return { success: true, allocatedCount };
  }

  // ==========================================
  // VOUCHER RETRIEVAL & SECURE REVEAL
  // ==========================================

  public getUserVouchers(userId: string): VoucherItem[] {
    const userAllocations = this.allocations.filter(a => a.userId === userId);
    
    return userAllocations.map(alloc => {
      const voucher = this.vouchers.find(v => v.id === alloc.voucherId);
      const order = this.orders.find(o => o.id === alloc.orderId);
      const cert = voucher ? this.certifications.find(c => c.id === voucher.certificationId) : undefined;

      return {
        allocationId: alloc.id,
        orderId: alloc.orderId,
        orderNumber: order?.orderNumber || 'CV-ORDER',
        certificationId: cert?.id || '',
        certificationName: cert?.name || 'Certification Voucher',
        examCode: cert?.examCode || 'EXAM',
        providerName: cert?.providerName || 'Provider',
        expiryDate: voucher?.expiryDate || '',
        region: voucher?.region || 'Global',
        redemptionInstructions: voucher?.redemptionInstructions || '',
        status: voucher?.status || 'sold',
        isRevealed: Boolean(alloc.revealedAt),
        revealedAt: alloc.revealedAt,
        // Raw code is intentionally NOT populated here!
      };
    });
  }

  /**
   * Secure Voucher Reveal function matching PostgreSQL `reveal_voucher_code`
   * Only the verified owner of a fulfilled order can reveal their plaintext voucher code
   */
  public revealVoucherCode(allocationId: string, userId: string, ipHash?: string): {
    success: boolean;
    error?: string;
    voucherCode?: string;
    expiryDate?: string;
    region?: string;
    redemptionInstructions?: string;
    revealedAt?: string;
  } {
    const allocation = this.allocations.find(a => a.id === allocationId && a.userId === userId);
    if (!allocation) {
      return { success: false, error: 'Voucher allocation not found or unauthorized' };
    }

    const order = this.orders.find(o => o.id === allocation.orderId);
    if (!order || (order.status !== 'fulfilled' && order.status !== 'paid')) {
      return { success: false, error: 'Order is not in paid or fulfilled status' };
    }

    const voucher = this.vouchers.find(v => v.id === allocation.voucherId);
    if (!voucher) {
      return { success: false, error: 'Voucher record not located in private inventory' };
    }

    // Record reveal audit event
    allocation.revealedAt = allocation.revealedAt || new Date().toISOString();
    allocation.revealCount += 1;
    allocation.lastIpHash = ipHash;

    return {
      success: true,
      voucherCode: voucher.voucherCode,
      expiryDate: voucher.expiryDate,
      region: voucher.region,
      redemptionInstructions: voucher.redemptionInstructions,
      revealedAt: allocation.revealedAt,
    };
  }

  // ==========================================
  // INVENTORY IMPORT & MANAGEMENT
  // ==========================================

  public importVoucherBatch(items: Array<{
    certificationId: string;
    voucherCode: string;
    expiryDate: string;
    region: string;
    redemptionInstructions: string;
    supplierReference?: string;
  }>): { success: boolean; insertedCount: number; errors: string[] } {
    const errors: string[] = [];
    let insertedCount = 0;

    const existingCodes = new Set(this.vouchers.map(v => v.voucherCode.trim().toUpperCase()));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const rowNum = index + 1;

      // 1. Validate required fields
      if (!item.certificationId || !item.voucherCode || !item.expiryDate) {
        errors.push(`Row ${rowNum}: Missing required fields (certificationId, voucherCode, or expiryDate).`);
        continue;
      }

      // 2. Validate certification mapping
      const cert = this.getCertificationById(item.certificationId) || 
                   this.certifications.find(c => c.examCode.toLowerCase() === item.certificationId.toLowerCase() || c.slug === item.certificationId);
      if (!cert) {
        errors.push(`Row ${rowNum}: Certification "${item.certificationId}" is not recognized in catalog.`);
        continue;
      }

      // 3. Detect duplicate codes
      const cleanCode = item.voucherCode.trim().toUpperCase();
      if (existingCodes.has(cleanCode)) {
        errors.push(`Row ${rowNum}: Duplicate voucher code "${cleanCode}" already exists in inventory.`);
        continue;
      }

      // 4. Validate future expiry date
      const expDate = new Date(item.expiryDate);
      if (isNaN(expDate.getTime()) || expDate <= today) {
        errors.push(`Row ${rowNum}: Expiry date "${item.expiryDate}" must be a valid future date.`);
        continue;
      }

      // Insert into private inventory
      this.vouchers.push({
        id: `vch_import_${Date.now()}_${insertedCount}`,
        certificationId: cert.id,
        voucherCode: cleanCode,
        expiryDate: item.expiryDate,
        region: item.region || 'India / Global',
        redemptionInstructions: item.redemptionInstructions || 'Redeem via official exam testing center checkout.',
        supplierReference: item.supplierReference || 'BATCH-IMPORT',
        status: 'available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      existingCodes.add(cleanCode);
      insertedCount++;
    }

    return {
      success: insertedCount > 0,
      insertedCount,
      errors,
    };
  }

  public getInventorySummary(): Array<{
    certificationId: string;
    examCode: string;
    name: string;
    availableCount: number;
    soldCount: number;
    disabledCount: number;
  }> {
    return this.certifications.map(cert => {
      const certVouchers = this.vouchers.filter(v => v.certificationId === cert.id);
      return {
        certificationId: cert.id,
        examCode: cert.examCode,
        name: cert.name,
        availableCount: certVouchers.filter(v => v.status === 'available').length,
        soldCount: certVouchers.filter(v => v.status === 'sold').length,
        disabledCount: certVouchers.filter(v => v.status === 'disabled').length,
      };
    });
  }

  // ==========================================
  // SUPPORT TICKETS
  // ==========================================

  public getSupportTickets(userId: string): SupportTicket[] {
    return this.supportTickets.filter(t => t.userId === userId);
  }

  public createSupportTicket(params: {
    userId: string;
    subject: string;
    category: TicketCategory;
    message: string;
    orderId?: string;
  }): SupportTicket {
    const ticketNum = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: ticketNum,
      userId: params.userId,
      orderId: params.orderId,
      subject: params.subject,
      category: params.category,
      message: params.message,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.supportTickets.unshift(ticket);
    return ticket;
  }

  // ==========================================
  // USER PROFILES
  // ==========================================

  public getUserProfile(userId: string): UserProfile | undefined {
    return this.users.get(userId);
  }

  public upsertUserProfile(profile: UserProfile): UserProfile {
    this.users.set(profile.id, profile);
    this.users.set(profile.email, profile);
    return profile;
  }
}

export const dbStore = DatabaseStore.getInstance();

