import { CERTIFICATIONS } from '@/lib/data/certifications';
import { PROVIDERS } from '@/lib/data/providers';
import { formatInr, calculateDiscount } from '@/lib/utils/formatters';

export interface AssistantAction {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary';
}

export interface AssistantResponse {
  reply: string;
  actions?: AssistantAction[];
  suggestedPrompts?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Intelligent NLP & Knowledge Retrieval Engine for CertiVault
 */
export async function generateAssistantResponse(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<AssistantResponse> {
  const query = userQuery.trim().toLowerCase();

  // 1. GREETING & INTRO
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query === 'namaste' ||
    query.startsWith('kya help') ||
    query === 'help'
  ) {
    return {
      reply: `Namaste! 👋 Main **CertiVault AI Assistant** hu. Main aapko website par legitimate IT certification vouchers dhoondhne, vendor testing center (Pearson VUE / PSI) redemption samajhne, **100% Free Learning Quests** explore karne, aur kisi bhi order ya payment query ko resolve karne mein help kar sakta hu.\n\nAap mujhse kisi bhi exam code (jaise **AZ-900**, **AWS SAA-C03**, **CCNA**, **Security+**), Free vouchers, discounts, ya career guidance ke bare mein pooch sakte hain!`,
      actions: [
        { label: '🎁 100% Free Vouchers', url: '/free-vouchers', variant: 'primary' },
        { label: 'Browse All Certifications', url: '/certifications', variant: 'secondary' },
      ],
      suggestedPrompts: [
        'How to get 100% Free Vouchers?',
        'Find Best AWS Vouchers',
        'Microsoft Azure AZ-900 Price',
        'How to redeem on Pearson VUE?',
      ],
    };
  }

  // 1.5. FREE VOUCHERS & LEARNING QUESTS
  if (
    query.includes('free') ||
    query.includes('muft') ||
    query.includes('bina paise') ||
    query.includes('0 cost') ||
    query.includes('zero cost') ||
    query.includes('task') ||
    query.includes('quest') ||
    query.includes('scholarship')
  ) {
    return {
      reply: `### 🎁 100% Free Certification Quests & Vouchers\n\nAap CertiVault ke **Free Vouchers** section se bina kisi kharche ke official certificates aur Pearson VUE exam fee waivers achieve kar sakte hain:\n\n1. **Microsoft Learn AI Skills Challenge**: 8 interactive micro-modules complete karein aur **AI-900 / AZ-900** ka 100% Free Pearson VUE Exam Waiver paayein *(Original Value: ₹4,800)*.\n2. **Google Cloud Generative AI Quest**: Vertex AI & prompt engineering labs complete karein aur Google Cloud Digital Credential paayein *(Value: ₹3,500)*.\n3. **Cisco Junior Cybersecurity Analyst**: Network defense virtual labs complete karein aur verified Cisco Certificate + Credly badge paayein *(Value: ₹6,500)*.\n4. **AWS Cloud Quest 3D**: Browser game mein 12 cloud tasks solve karke AWS Digital Badge earn karein.\n5. **Oracle University OCI Foundations**: Video course complete karke 100% free online proctored exam attempt paayein.\n\nKisi bhi credit card ki zaroorat nahi hai. Sabhi tasks sandbox environment mein run hote hain!`,
      actions: [
        { label: '🎁 Explore Free Quests & Codes', url: '/free-vouchers', variant: 'primary' },
        { label: 'Learn on Microsoft Portal', url: 'https://learn.microsoft.com/en-us/training/challenges', variant: 'secondary' },
      ],
      suggestedPrompts: [
        'How to redeem Microsoft AI-900 voucher?',
        'Do I need a credit card for free quests?',
        'What is Credly badge?',
      ],
    };
  }

  // 2. REDEMPTION / HOW TO USE VOUCHER
  if (
    query.includes('redeem') ||
    query.includes('kaise use') ||
    query.includes('how to use') ||
    query.includes('pearson') ||
    query.includes('psi') ||
    query.includes('webassessor') ||
    query.includes('promocode') ||
    query.includes('coupon')
  ) {
    return {
      reply: `### 📝 Pearson VUE & Testing Center Redemption Guide\n\nCertiVault se mila voucher code ek **100% exam fee waiver** hota hai. Ise redeem karne ke simple steps:\n\n1. **Vendor Portal par Login Karein**: Official vendor website par jayein (e.g. [learn.microsoft.com](https://learn.microsoft.com) for Azure, [aws.training](https://aws.training) for AWS).\n2. **Exam Schedule Karein**: Apna exam aur preferred testing center ya online proctoring choose karein.\n3. **Delivery Partner Select Karein**: Pearson VUE ya Webassessor select karein.\n4. **Checkout Step par Code Enter Karein**: Final payment page par **"Add Voucher or Promo Code"** par click karein aur apna voucher code paste karein.\n5. **Balance ₹0.00 Ho Jayega**: Total exam amount turant zero ho jayega aur aapka slot confirm ho jayega!`,
      actions: [
        { label: 'View Customer Vault', url: '/dashboard/vouchers', variant: 'primary' },
        { label: 'Detailed Redemption FAQ', url: '/faq', variant: 'secondary' },
      ],
      suggestedPrompts: [
        'What if voucher code does not work?',
        'What is the voucher validity period?',
      ],
    };
  }

  // 3. REFUND POLICY / GUARANTEE
  if (
    query.includes('refund') ||
    query.includes('guarantee') ||
    query.includes('paisa wapas') ||
    query.includes('return') ||
    query.includes('fake') ||
    query.includes('genuine')
  ) {
    return {
      reply: `### 🛡️ CertiVault 100% Buyer Guarantee & Refund Policy\n\n- **100% Legitimate & Authorized**: Hamare sabhi vouchers official authorized partner inventory se pre-allocated hote hain.\n- **Full Money-Back Guarantee**: Agar Pearson VUE ya PSI portal par aapka voucher invalid mark hota hai, toh hum immediate replacement code provide karte hain ya 100% full refund karte hain.\n- **Validity**: Sabhi vouchers ki validity **12 months** hoti hai, jisme aap kabhi bhi apna exam schedule kar sakte hain.`,
      actions: [
        { label: 'Read Full Refund Policy', url: '/refund-policy', variant: 'secondary' },
        { label: 'Contact Support Desk', url: '/support', variant: 'primary' },
      ],
      suggestedPrompts: [
        'How fast is voucher delivered?',
        'Payment issue / money debited help',
      ],
    };
  }

  // 4. ORDER STATUS / PAYMENT ISSUES
  if (
    query.includes('payment') ||
    query.includes('paisa kat gaya') ||
    query.includes('money debited') ||
    query.includes('track') ||
    query.includes('code nahi mila') ||
    query.includes('order status')
  ) {
    return {
      reply: `### 💳 Payment & Order Tracking Support\n\n- **Instant Delivery**: Payment verify hote hi aapka voucher aapke **Customer Vault** mein unlock ho jata hai.\n- **Voucher Reveal Karein**: [Dashboard > My Vouchers](/dashboard/vouchers) par jayein aur **"Reveal Code"** button click karein.\n- **Agar payment debited hai par pending show ho raha hai**: Razorpay webhook automatic sync karta hai. Aap apna Order Number ke sath hamari support team ko ticket raise kar sakte hain — hum within 15 minutes resolve kar dete hain.`,
      actions: [
        { label: 'Open My Vouchers Vault', url: '/dashboard/vouchers', variant: 'primary' },
        { label: 'Create Support Ticket', url: '/dashboard/support', variant: 'secondary' },
      ],
      suggestedPrompts: [
        'How to reveal voucher code?',
        'Contact customer care',
      ],
    };
  }

  // 5. SPECIFIC EXAM CODE SEARCH (e.g. AZ-900, SAA-C03, CCNA, Security+)
  const foundCert = CERTIFICATIONS.find(
    (c) =>
      c.examCode.toLowerCase() === query ||
      c.examCode.toLowerCase().replace(/[-_ ]/g, '') === query.replace(/[-_ ]/g, '') ||
      query.includes(c.examCode.toLowerCase()) ||
      query.includes(c.name.toLowerCase()) ||
      c.slug.includes(query)
  );

  if (foundCert) {
    const discount = calculateDiscount(foundCert.retailPriceInr, foundCert.voucherPriceInr);
    return {
      reply: `### 🎯 ${foundCert.name} (${foundCert.examCode})\n\n- **Vendor**: ${foundCert.providerName} | **Level**: ${foundCert.difficultyLevel}\n- **Marketplace Price**: **${formatInr(foundCert.voucherPriceInr)}** *(Original: ~~${formatInr(foundCert.retailPriceInr)}~~)*\n- **Savings**: **${discount}% Discount** (Includes GST)\n- **Validity**: ${foundCert.validityMonths} Months | **Stock**: ${foundCert.stockCount > 0 ? `In Stock (${foundCert.stockCount} Available)` : 'Restocking'}\n\n**Overview**: ${foundCert.shortDescription}\n\n**Target Roles**: ${foundCert.careerOpportunities.slice(0, 3).join(', ')}`,
      actions: [
        { label: `Buy Voucher (${formatInr(foundCert.voucherPriceInr)})`, url: `/checkout?certId=${foundCert.id}`, variant: 'primary' },
        { label: 'View Exam Syllabus', url: `/certifications/${foundCert.slug}`, variant: 'secondary' },
      ],
      suggestedPrompts: [
        `What are the prerequisites for ${foundCert.examCode}?`,
        `How to redeem ${foundCert.examCode} voucher?`,
      ],
    };
  }

  // 6. SPECIFIC PROVIDER SEARCH (AWS, Azure, Google Cloud, Cisco, CompTIA)
  const foundProvider = PROVIDERS.find(
    (p) =>
      query.includes(p.slug) ||
      query.includes(p.shortName.toLowerCase()) ||
      query.includes(p.name.toLowerCase())
  );

  if (foundProvider) {
    const providerCerts = CERTIFICATIONS.filter((c) => c.providerSlug === foundProvider.slug).slice(0, 4);
    const certList = providerCerts
      .map((c) => `• **${c.examCode}**: ${c.name} — **${formatInr(c.voucherPriceInr)}** *(Save ${calculateDiscount(c.retailPriceInr, c.voucherPriceInr)}%)*`)
      .join('\n');

    return {
      reply: `### ☁️ ${foundProvider.name} Certification Vouchers\n\nCertiVault par **${foundProvider.name}** ke sabhi major examination vouchers available hain:\n\n${certList}\n\nSabhi vouchers Pearson VUE par direct redeemable hain aur instant customer vault mein deliver hote hain.`,
      actions: [
        { label: `View All ${foundProvider.shortName} Vouchers`, url: `/certifications?provider=${foundProvider.slug}`, variant: 'primary' },
      ],
      suggestedPrompts: [
        `Compare ${foundProvider.shortName} Associate vs Professional`,
        'How to redeem exam voucher?',
      ],
    };
  }

  // 7. CAREER DOMAIN SEARCH (DevOps, Cloud, Cybersecurity, AI/ML)
  if (
    query.includes('devops') ||
    query.includes('cloud') ||
    query.includes('cyber') ||
    query.includes('security') ||
    query.includes('ai') ||
    query.includes('machine learning') ||
    query.includes('network')
  ) {
    let domainLabel = 'Cloud Computing';
    let matchedCerts = CERTIFICATIONS.filter((c) => c.categorySlug === 'cloud-computing').slice(0, 3);

    if (query.includes('devops')) {
      domainLabel = 'DevOps & Containers';
      matchedCerts = CERTIFICATIONS.filter((c) => c.name.includes('DevOps') || c.examCode.includes('CKA') || c.name.includes('Terraform')).slice(0, 3);
    } else if (query.includes('cyber') || query.includes('security')) {
      domainLabel = 'Cybersecurity';
      matchedCerts = CERTIFICATIONS.filter((c) => c.categorySlug === 'cybersecurity' || c.name.includes('Security')).slice(0, 3);
    }

    const list = matchedCerts
      .map((c) => `• **[${c.examCode}] ${c.name}** — ${formatInr(c.voucherPriceInr)}`)
      .join('\n');

    return {
      reply: `### 🚀 Recommended ${domainLabel} Certifications\n\nIndustry standard hiring requirements ke according ye top certifications hain:\n\n${list}\n\nDetailed career path ke liye aap hamara **Career Finder** tool use kar sakte hain jo aapke experience ke hisab se step-by-step roadmap batata hai!`,
      actions: [
        { label: 'Open Career Roadmap Finder', url: '/career-finder', variant: 'primary' },
        { label: 'Browse Category', url: '/categories', variant: 'secondary' },
      ],
      suggestedPrompts: [
        'Which cloud cert is best for beginners?',
        'AZ-900 vs AWS Cloud Practitioner',
      ],
    };
  }

  // 8. DEFAULT FALLBACK WITH SMART RECOMMENDATIONS
  const popularCerts = CERTIFICATIONS.filter((c) => c.isFeatured).slice(0, 3);
  const popularList = popularCerts.map((c) => `• **${c.examCode}**: ${c.name} (${formatInr(c.voucherPriceInr)})`).join('\n');

  return {
    reply: `Aapki query se related best resources ye hain:\n\n${popularList}\n\nAap mujhse kisi bhi exam code (jaise **AZ-900, AWS SAA-C03, CCNA, Security+**), voucher discount, Pearson VUE redemption ya payment help ke bare mein pooch sakte hain!`,
    actions: [
      { label: 'Search Full Catalog', url: '/certifications', variant: 'primary' },
      { label: 'Open Help & Support', url: '/support', variant: 'secondary' },
    ],
    suggestedPrompts: [
      'AWS Solutions Architect Associate',
      'Microsoft Azure AZ-900 Price',
      'How to redeem voucher on Pearson VUE',
      'Refund and Guarantee Policy',
    ],
  };
}

