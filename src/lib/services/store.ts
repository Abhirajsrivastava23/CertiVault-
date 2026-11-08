import { Order, VoucherItem, SupportTicket, Certification, UserProfile } from '../types';
import { CERTIFICATIONS } from '../data/certifications';

// Private voucher pool for backend allocation
export interface PrivateVoucher {
  id: string;
  certificationId: string;
  certificationSlug: string;
  voucherCode: string;
  expiryDate: string;
  region: string;
  redemptionInstructions: string;
  supplierReference: string;
  status: 'available' | 'reserved' | 'sold' | 'disabled';
  reservedForOrderId?: string;
  allocatedToUserId?: string;
  allocatedAt?: string;
  firstRevealedAt?: string;
  revealCount: number;
}

// Initializing verified test inventory matching our seed data
const initialInventory: PrivateVoucher[] = [
  {
    id: 'vouch-1',
    certificationId: 'cert-aws-saa',
    certificationSlug: 'aws-certified-solutions-architect-associate-saa-c03',
    voucherCode: 'AWS-SAA-2026-X982-A741',
    expiryDate: '2027-04-15',
    region: 'India / South Asia',
    redemptionInstructions: 'Log in to aws.training/certification. Select Schedule with Pearson VUE. On the checkout screen, enter this voucher code in the Promo Code field.',
    supplierReference: 'DIST-INGRAM-BATCH-01',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-2',
    certificationId: 'cert-aws-saa',
    certificationSlug: 'aws-certified-solutions-architect-associate-saa-c03',
    voucherCode: 'AWS-SAA-2026-B419-M602',
    expiryDate: '2027-05-20',
    region: 'India / South Asia',
    redemptionInstructions: 'Log in to aws.training/certification. Select Schedule with Pearson VUE. On the checkout screen, enter this voucher code in the Promo Code field.',
    supplierReference: 'DIST-INGRAM-BATCH-01',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-3',
    certificationId: 'cert-az-104',
    certificationSlug: 'microsoft-azure-administrator-az-104',
    voucherCode: 'MSFT-AZ104-2026-T830-W441',
    expiryDate: '2027-05-30',
    region: 'India',
    redemptionInstructions: 'Visit learn.microsoft.com/credentials, find AZ-104, click Schedule Exam. On Pearson VUE payment page, enter voucher code under Add Voucher/Promo Code.',
    supplierReference: 'MS-DIRECT-PARTNER-09',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-4',
    certificationId: 'cert-az-900',
    certificationSlug: 'microsoft-azure-fundamentals-az-900',
    voucherCode: 'MSFT-AZ900-2026-C209-P110',
    expiryDate: '2027-06-15',
    region: 'India',
    redemptionInstructions: 'Visit learn.microsoft.com/credentials, find AZ-900, click Schedule Exam. Apply voucher code on Pearson VUE payment checkout.',
    supplierReference: 'MS-DIRECT-PARTNER-09',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-5',
    certificationId: 'cert-comptia-sec',
    certificationSlug: 'comptia-security-plus-sy0-701',
    voucherCode: 'COMP-SEC-2026-V901-L772',
    expiryDate: '2027-08-01',
    region: 'Global',
    redemptionInstructions: 'Log in to pearsonvue.com/comptia, choose SY0-701, enter voucher code in payment details section.',
    supplierReference: 'COMPTIA-GLOBAL-AUTH-02',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-6',
    certificationId: 'cert-cisco-ccna',
    certificationSlug: 'cisco-certified-network-associate-ccna-200-301',
    voucherCode: 'CSCO-CCNA-2026-R440-J318',
    expiryDate: '2027-06-30',
    region: 'India',
    redemptionInstructions: 'Go to pearsonvue.com/cisco, select 200-301 CCNA, apply voucher code under Vouchers/Promotion Codes.',
    supplierReference: 'CISCO-LEARNING-NET-11',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-7',
    certificationId: 'cert-gcp-ace',
    certificationSlug: 'google-cloud-associate-cloud-engineer-ace',
    voucherCode: 'GCP-ACE-2026-K732-F204',
    expiryDate: '2027-06-30',
    region: 'Global',
    redemptionInstructions: 'Log in to webassessor.com/googlecloud, select Associate Cloud Engineer, apply voucher code at checkout.',
    supplierReference: 'GCP-AUTH-PARTNER-05',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-8',
    certificationId: 'cert-nutanix-mci',
    certificationSlug: 'nutanix-certified-professional-multicloud-infrastructure-ncp-mci',
    voucherCode: 'NTNX-MCI-2026-P650-D199',
    expiryDate: '2027-07-31',
    region: 'Global',
    redemptionInstructions: 'Log in to Nutanix certification portal, schedule NCP-MCI with Webassessor, enter voucher code.',
    supplierReference: 'NUTANIX-PARTNER-01',
    status: 'available',
    revealCount: 0,
  },
  {
    id: 'vouch-9',
    certificationId: 'cert-lf-cka',
    certificationSlug: 'certified-kubernetes-administrator-cka',
    voucherCode: 'LF-CKA-2026-K991-Z882',
    expiryDate: '2027-10-15',
    region: 'Global',
    redemptionInstructions: 'Visit training.linuxfoundation.org, add CKA to cart, apply voucher code at checkout to reduce total to zero.',
    supplierReference: 'LINUX-FDN-AUTH-07',
    status: 'available',
    revealCount: 0,
  }
];

// Initial demo user
const defaultUser: UserProfile = {
  id: 'usr-demo-1001',
  email: 'learner@certivault.in',
  fullName: 'Arun Patel',
  phone: '+91 98765 43210',
  company: 'Apex Cloud Solutions',
  jobTitle: 'Senior Systems Engineer',
  role: 'customer',
  createdAt: '2026-01-15T09:30:00Z',
};

// Initial completed order for demo user so dashboard has immediate rich data
const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'CV-2026-784192',
    userId: 'usr-demo-1001',
    customerName: 'Arun Patel',
    customerEmail: 'learner@certivault.in',
    customerPhone: '+91 98765 43210',
    totalAmountInr: 349900,
    taxAmountInr: 0,
    status: 'fulfilled',
    razorpayOrderId: 'order_MhZ781293812',
    razorpayPaymentId: 'pay_MhZ819283129',
    paymentMethod: 'UPI',
    createdAt: '2026-11-01T14:22:00Z',
    updatedAt: '2026-11-01T14:22:30Z',
    items: [
      {
        id: 'item-1001',
        orderId: 'ord-1001',
        certificationId: 'cert-az-900',
        certificationName: 'Microsoft Azure Fundamentals',
        examCode: 'AZ-900',
        providerName: 'Microsoft',
        quantity: 1,
        unitPriceInr: 349900,
        totalPriceInr: 349900,
      }
    ]
  }
];

// Allocated voucher for ord-1001
initialInventory[3].status = 'sold';
initialInventory[3].reservedForOrderId = 'ord-1001';
initialInventory[3].allocatedToUserId = 'usr-demo-1001';
initialInventory[3].allocatedAt = '2026-11-01T14:22:30Z';

// In-Memory store singleton for runtime state
class MockStore {
  private inventory: PrivateVoucher[] = [...initialInventory];
  private orders: Order[] = [...initialOrders];
  private tickets: SupportTicket[] = [
    {
      id: 'tick-501',
      ticketNumber: 'TKT-2026-1049',
      userId: 'usr-demo-1001',
      userEmail: 'learner@certivault.in',
      orderId: 'ord-1001',
      subject: 'Question on Pearson VUE Online Proctoring Requirements',
      category: 'Voucher Redemption',
      message: 'Can I use this AZ-900 voucher for an online OnVUE proctored exam from home in India?',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2026-11-02T10:15:00Z',
      updatedAt: '2026-11-02T11:45:00Z',
    }
  ];
  private users: UserProfile[] = [defaultUser];

  // Users
  getUser(userId: string): UserProfile | undefined {
    return this.users.find(u => u.id === userId);
  }

  getUserByEmail(email: string): UserProfile | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  addUser(user: UserProfile) {
    this.users.push(user);
    return user;
  }

  // Inventory
  getInventory(): PrivateVoucher[] {
    return this.inventory;
  }

  getAvailableVoucher(certificationId: string): PrivateVoucher | undefined {
    return this.inventory.find(
      v => v.certificationId === certificationId && v.status === 'available'
    );
  }

  importVouchers(newVouchers: Omit<PrivateVoucher, 'id' | 'status' | 'revealCount'>[]): { added: number; errors: string[] } {
    const errors: string[] = [];
    let added = 0;

    for (const v of newVouchers) {
      if (this.inventory.some(existing => existing.voucherCode === v.voucherCode)) {
        errors.push(`Duplicate voucher code: ${v.voucherCode}`);
        continue;
      }
      this.inventory.push({
        ...v,
        id: `vouch-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        status: 'available',
        revealCount: 0,
      });
      added++;
    }

    return { added, errors };
  }

  // Orders
  getOrders(userId?: string): Order[] {
    if (userId) {
      return this.orders.filter(o => o.userId === userId);
    }
    return this.orders;
  }

  getOrder(orderId: string): Order | undefined {
    return this.orders.find(o => o.id === orderId);
  }

  getOrderByNumber(orderNumber: string): Order | undefined {
    return this.orders.find(o => o.orderNumber === orderNumber);
  }

  createOrder(order: Order): Order {
    this.orders.unshift(order);
    return order;
  }

  updateOrderStatus(orderId: string, status: Order['status'], paymentId?: string): Order | undefined {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return undefined;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    if (paymentId) {
      order.razorpayPaymentId = paymentId;
      order.paymentMethod = 'Razorpay / UPI';
    }
    return order;
  }

  // Fulfill order by allocating vouchers
  fulfillOrder(orderId: string): { success: boolean; allocatedVouchers: PrivateVoucher[]; error?: string } {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return { success: false, allocatedVouchers: [], error: 'Order not found' };

    const allocated: PrivateVoucher[] = [];

    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        const voucher = this.inventory.find(
          v => v.certificationId === item.certificationId && v.status === 'available'
        );

        if (!voucher) {
          return {
            success: false,
            allocatedVouchers: [],
            error: `Insufficient inventory for ${item.certificationName}`,
          };
        }

        voucher.status = 'sold';
        voucher.reservedForOrderId = order.id;
        voucher.allocatedToUserId = order.userId;
        voucher.allocatedAt = new Date().toISOString();
        allocated.push(voucher);
      }
    }

    order.status = 'fulfilled';
    order.updatedAt = new Date().toISOString();

    return { success: true, allocatedVouchers: allocated };
  }

  // User Vouchers with Masking
  getCustomerVouchers(userId: string): VoucherItem[] {
    const userAllocations = this.inventory.filter(
      v => v.allocatedToUserId === userId && v.status === 'sold'
    );

    return userAllocations.map(v => {
      const order = this.orders.find(o => o.id === v.reservedForOrderId);
      const cert = CERTIFICATIONS.find(c => c.id === v.certificationId);

      return {
        allocationId: v.id,
        orderId: order?.id || '',
        orderNumber: order?.orderNumber || 'CV-ORDER',
        certificationId: v.certificationId,
        certificationName: cert?.name || 'Certification Exam',
        examCode: cert?.examCode || 'EXAM',
        providerName: cert?.providerName || 'Provider',
        expiryDate: v.expiryDate,
        region: v.region,
        redemptionInstructions: v.redemptionInstructions,
        status: v.status,
        isRevealed: !!v.firstRevealedAt,
        revealedAt: v.firstRevealedAt,
        voucherCode: undefined, // Never expose raw code by default!
      };
    });
  }

  // Reveal unmasked code securely
  revealVoucher(allocationId: string, userId: string): { voucherCode: string; instructions: string } | null {
    const voucher = this.inventory.find(
      v => v.id === allocationId && v.allocatedToUserId === userId && v.status === 'sold'
    );

    if (!voucher) return null;

    if (!voucher.firstRevealedAt) {
      voucher.firstRevealedAt = new Date().toISOString();
    }
    voucher.revealCount += 1;

    return {
      voucherCode: voucher.voucherCode,
      instructions: voucher.redemptionInstructions,
    };
  }

  // Support Tickets
  getTickets(userId?: string): SupportTicket[] {
    if (userId) {
      return this.tickets.filter(t => t.userId === userId);
    }
    return this.tickets;
  }

  createTicket(ticket: SupportTicket): SupportTicket {
    this.tickets.unshift(ticket);
    return ticket;
  }
}

// Global singleton instance
const globalStore = (global as any).__certivault_store || new MockStore();
if (process.env.NODE_ENV !== 'production') {
  (global as any).__certivault_store = globalStore;
}

export const store = globalStore as MockStore;
