export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type OrderStatus = 
  | 'pending' 
  | 'paid' 
  | 'fulfilled' 
  | 'failed' 
  | 'expired' 
  | 'refund_pending' 
  | 'refunded';

export type VoucherStatus = 'available' | 'reserved' | 'sold' | 'disabled';

export type TicketCategory = 
  | 'Voucher Redemption' 
  | 'Payment Issue' 
  | 'Order Inquiry' 
  | 'Technical Support' 
  | 'General';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Provider {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  websiteUrl: string;
  description: string;
  certCount?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  certCount?: number;
}

export interface ExamDetails {
  durationMinutes: number;
  numberOfQuestions: string;
  passingScore: string;
  format: string;
  languages: string[];
  testingCenter: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  duration: string;
  topics: string[];
}

export interface Certification {
  id: string;
  slug: string;
  providerId: string;
  providerSlug: string;
  providerName: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  examCode: string;
  difficultyLevel: DifficultyLevel;
  voucherPriceInr: number; // in paise
  retailPriceInr: number;  // in paise
  validityMonths: number;
  shortDescription: string;
  fullDescription: string;
  purpose: string;
  prerequisites: string[];
  targetAudience: string[];
  careerOpportunities: string[];
  skillsCovered: string[];
  officialExamDetails: ExamDetails;
  officialProviderUrl: string;
  preparationRoadmap: RoadmapStep[];
  status: 'active' | 'draft' | 'archived';
  isFeatured: boolean;
  stockCount: number;
  availableRegions: string[];
  restrictions?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  certificationId: string;
  certificationName: string;
  examCode: string;
  providerName: string;
  quantity: number;
  unitPriceInr: number;
  totalPriceInr: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmountInr: number; // in paise
  taxAmountInr: number;   // in paise
  status: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface VoucherItem {
  allocationId: string;
  orderId: string;
  orderNumber: string;
  certificationId: string;
  certificationName: string;
  examCode: string;
  providerName: string;
  expiryDate: string;
  region: string;
  redemptionInstructions: string;
  status: VoucherStatus;
  isRevealed: boolean;
  revealedAt?: string;
  voucherCode?: string; // only populated if revealed via authorized API
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userEmail?: string;
  orderId?: string;
  subject: string;
  category: TicketCategory;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  role: 'customer' | 'admin' | 'support';
  createdAt: string;
}
