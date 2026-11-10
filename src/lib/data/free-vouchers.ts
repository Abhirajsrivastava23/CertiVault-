export interface FreeVoucherQuest {
  id: string;
  slug: string;
  title: string;
  provider: string;
  providerSlug: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  voucherType: '100% Free Exam Voucher' | 'Verifiable Digital Certificate' | 'Official Skill Badge';
  officialValueInr: number;
  taskOverview: string;
  learningSteps: string[];
  prerequisites: string;
  officialPortalUrl: string;
  voucherAccessCode: string;
  instantClaimInstructions: string;
  credlyAccredited: boolean;
  isPopular?: boolean;
}

export const FREE_VOUCHER_QUESTS: FreeVoucherQuest[] = [
  {
    id: 'free-msft-ai-challenge',
    slug: 'microsoft-learn-ai-skills-challenge',
    title: 'Microsoft Learn: AI & Cloud Skills Challenge',
    provider: 'Microsoft',
    providerSlug: 'microsoft',
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    timeEstimate: '4-6 Hours (Self-Paced)',
    voucherType: '100% Free Exam Voucher',
    officialValueInr: 480000, // ₹4,800.00
    taskOverview: 'Complete 8 interactive micro-learning modules on Microsoft Learn covering Machine Learning, Computer Vision, and Natural Language Processing to unlock a 100% fee waiver for AI-900 or AZ-900.',
    learningSteps: [
      'Create or log in to your free Microsoft Learn profile with your personal Outlook or work email.',
      'Enroll in the active Microsoft Cloud Skills Challenge: Azure AI Fundamentals path.',
      'Complete hands-on interactive sandbox exercises (No credit card or Azure subscription required).',
      'Submit the challenge completion check on your Microsoft Learn profile dashboard.',
      'Your 100% Free Pearson VUE Exam Voucher code will be delivered to your registered email and profile rewards tab.',
    ],
    prerequisites: 'No technical prerequisites. Basic understanding of computing concepts.',
    officialPortalUrl: 'https://learn.microsoft.com/en-us/training/challenges',
    voucherAccessCode: 'MSFT-CHALLENGE-WAIVER-100',
    instantClaimInstructions: 'Log in to Microsoft Learn, finish the 8 modules, and apply the voucher code on Pearson VUE checkout for ₹0.00 fee.',
    credlyAccredited: true,
    isPopular: true,
  },
  {
    id: 'free-google-cloud-genai',
    slug: 'google-cloud-generative-ai-leader-quest',
    title: 'Google Cloud: Generative AI Leader & Cloud Skills Quest',
    provider: 'Google Cloud',
    providerSlug: 'google-cloud',
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    timeEstimate: '3-4 Hours (Interactive Labs)',
    voucherType: 'Official Skill Badge',
    officialValueInr: 350000, // ₹3,500.00
    taskOverview: 'Complete hands-on introductory lab modules on Google Cloud Skills Boost including Vertex AI Studio, Prompt Engineering, and Large Language Model fine-tuning to achieve an official Google Cloud Digital Credential.',
    learningSteps: [
      'Open Google Cloud Skills Boost and sign in with your Google account.',
      'Enroll in the Generative AI Fundamentals Quest track (Free access with CertiVault invite code).',
      'Complete 4 short lab sessions: Introduction to LLMs, Generative AI Studio, Prompt Design, and Attention Mechanism.',
      'Pass the end-of-quest 20-question verification quiz with score >= 80%.',
      'Google automatically generates your verified digital badge and adds it to your Google Developer Profile.',
    ],
    prerequisites: 'Familiarity with Google Cloud Console and foundational AI concepts.',
    officialPortalUrl: 'https://www.cloudskillsboost.google/quests/116',
    voucherAccessCode: 'GCP-BOOST-GENAI-FREE2026',
    instantClaimInstructions: 'Use this code on Google Cloud Skills Boost to unlock 100% free lab credits and begin the quest.',
    credlyAccredited: true,
    isPopular: true,
  },
  {
    id: 'free-cisco-cyber-analyst',
    slug: 'cisco-junior-cybersecurity-analyst-pathway',
    title: 'Cisco: Junior Cybersecurity Analyst Certification Track',
    provider: 'Cisco Systems',
    providerSlug: 'cisco',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    timeEstimate: '15-20 Hours (Self-Paced)',
    voucherType: 'Verifiable Digital Certificate',
    officialValueInr: 650000, // ₹6,500.00
    taskOverview: 'Comprehensive vendor-accredited cybersecurity training path on Cisco Skills for All. Master network defense, endpoint protection, and threat intelligence to achieve an official Cisco Verified Certificate.',
    learningSteps: [
      'Register for a free student account on Cisco Networking Academy (Skills for All).',
      'Start the Junior Cybersecurity Analyst Career Path modules.',
      'Perform virtual Packet Tracer network security labs and Wireshark packet capture exercises.',
      'Complete the final comprehensive assessment exam on the Cisco NetAcad platform.',
      'Receive your official Cisco certificate signed by Cisco executive leadership and digital Credly badge.',
    ],
    prerequisites: 'Basic networking foundations (IP addressing, routers, switches).',
    officialPortalUrl: 'https://skillsforall.com/career-path/cybersecurity',
    voucherAccessCode: 'CISCO-NETACAD-FREE-PATH',
    instantClaimInstructions: 'Free enrollment directly via Cisco Skills for All. Verified Credly badge issued automatically upon passing.',
    credlyAccredited: true,
    isPopular: true,
  },
  {
    id: 'free-aws-cloud-quest',
    slug: 'aws-cloud-quest-cloud-practitioner',
    title: 'AWS Cloud Quest: Cloud Practitioner 3D Challenge',
    provider: 'Amazon Web Services',
    providerSlug: 'aws',
    category: 'Cloud Computing',
    difficulty: 'Beginner',
    timeEstimate: '5-8 Hours (Gamified Labs)',
    voucherType: 'Official Skill Badge',
    officialValueInr: 400000, // ₹4,000.00
    taskOverview: 'Play a 3D role-playing game developed by AWS Training. Help citizens of a virtual city solve real cloud architecture problems by configuring Amazon EC2, S3 buckets, and RDS databases.',
    learningSteps: [
      'Visit AWS Skill Builder and log in with your free Amazon account.',
      'Launch the browser-based 3D game: AWS Cloud Quest: Cloud Practitioner.',
      'Complete 12 hands-on cloud solution assignments inside real, temporary AWS sandbox consoles.',
      'Once all 12 city assignments are resolved, claim your official AWS Digital Badge on Credly.',
      'Receive an exclusive exam preparation guide with practice exam vouchers for AWS Certified Cloud Practitioner (CLF-C02).',
    ],
    prerequisites: 'None. Beginner-friendly gamified simulation.',
    officialPortalUrl: 'https://aws.amazon.com/training/digital/aws-cloud-quest/',
    voucherAccessCode: 'AWS-QUEST-SKILLBUILDER-FREE',
    instantClaimInstructions: '100% free browser-based game. Digital badge issued to Credly upon completing all 12 quest tasks.',
    credlyAccredited: true,
    isPopular: true,
  },
  {
    id: 'free-oracle-oci-foundations',
    slug: 'oracle-cloud-infrastructure-foundations-free',
    title: 'Oracle University: OCI Foundations Associate Certification',
    provider: 'Oracle Cloud',
    providerSlug: 'oracle',
    category: 'Cloud Computing',
    difficulty: 'Beginner',
    timeEstimate: '6-8 Hours',
    voucherType: '100% Free Exam Voucher',
    officialValueInr: 800000, // ₹8,000.00
    taskOverview: 'Oracle University offers free training and a 100% fee waiver for the Oracle Cloud Infrastructure (OCI) Foundations Associate certification (1Z0-1085). Complete the official video course and take the free proctored exam online.',
    learningSteps: [
      'Create a free Oracle account on Oracle University MyLearn platform.',
      'Enroll in the OCI Foundations Associate Learning Path (HD video lectures + sample exam tests).',
      'Complete all course sections: Core Infrastructure, OCI Security, Governance, and Billing.',
      'Take the practice test until achieving a score over 80%.',
      'Click "Register for Certification Exam" inside Oracle MyLearn to trigger your 100% free exam attempt.',
    ],
    prerequisites: 'Basic knowledge of cloud computing and server architectures.',
    officialPortalUrl: 'https://mylearn.oracle.com/ou/learning-path/become-an-oci-foundations-associate/122043',
    voucherAccessCode: 'ORACLE-MYLEARN-OCI-FREE',
    instantClaimInstructions: '100% free online proctored exam provided by Oracle University upon learning path completion.',
    credlyAccredited: true,
    isPopular: false,
  },
  {
    id: 'free-linux-foundation-intro',
    slug: 'linux-foundation-intro-to-linux-lfs101x',
    title: 'The Linux Foundation: Introduction to Linux (LFS101x)',
    provider: 'The Linux Foundation',
    providerSlug: 'linux-foundation',
    category: 'DevOps & Containers',
    difficulty: 'Beginner',
    timeEstimate: '10-12 Hours (Self-Paced)',
    voucherType: 'Verifiable Digital Certificate',
    officialValueInr: 450000, // ₹4,500.00
    taskOverview: 'Official foundation course created by Linus Torvalds and the Linux Foundation. Master command-line file manipulation, package management, bash automation, and basic system administration.',
    learningSteps: [
      'Create a free learner profile on edX / The Linux Foundation Training portal.',
      'Enroll in LFS101x: Introduction to Linux.',
      'Work through hands-on terminal exercises on Ubuntu, CentOS/RHEL, and openSUSE.',
      'Complete end-of-chapter knowledge checks and final practical command-line exam.',
      'Earn verifiable Certificate of Achievement from The Linux Foundation.',
    ],
    prerequisites: 'No prior Linux experience needed. Works on Windows, Mac, or Linux workstations.',
    officialPortalUrl: 'https://training.linuxfoundation.org/training/introduction-to-linux/',
    voucherAccessCode: 'LINUX-LFS101X-TASK-FREE',
    instantClaimInstructions: 'Free enrollment on Linux Foundation Training portal. Practical lab tests included.',
    credlyAccredited: false,
    isPopular: false,
  },
];
