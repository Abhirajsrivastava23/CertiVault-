export interface CareerRecommendationItem {
  certificationId: string;
  certificationName: string;
  examCode: string;
  providerName: string;
  level: string;
  sequenceOrder: number;
  rationale: string;
}

export interface CareerPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  targetRoles: string[];
  averageSalaryRange: string;
  iconName: string;
  prerequisites: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTimeline: string;
  recommendations: CareerRecommendationItem[];
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'cp-cloud-architect',
    slug: 'cloud-solutions-architect',
    title: 'Cloud Solutions Architect',
    description: 'Lead enterprise digital transformations by designing resilient, secure, high-availability multi-tier cloud architectures.',
    targetRoles: ['Cloud Solutions Architect', 'Cloud Infrastructure Engineer', 'Enterprise Technical Consultant'],
    averageSalaryRange: '₹14,00,000 – ₹32,00,000 PA',
    iconName: 'Cloud',
    prerequisites: 'Foundational computing knowledge; understanding of networking and basic scripting is helpful.',
    difficulty: 'Intermediate',
    estimatedTimeline: '6 – 9 Months',
    recommendations: [
      {
        certificationId: 'cert-aws-clf',
        certificationName: 'AWS Certified Cloud Practitioner',
        examCode: 'CLF-C02',
        providerName: 'AWS',
        level: 'Beginner',
        sequenceOrder: 1,
        rationale: 'Build baseline cloud literacy, master the AWS shared responsibility security model, and grasp cloud economics.',
      },
      {
        certificationId: 'cert-aws-saa',
        certificationName: 'AWS Certified Solutions Architect – Associate',
        examCode: 'SAA-C03',
        providerName: 'AWS',
        level: 'Intermediate',
        sequenceOrder: 2,
        rationale: 'Core industry standard credential testing practical architectural design across VPCs, S3, IAM, and auto-scaling compute.',
      },
      {
        certificationId: 'cert-ms-az305',
        certificationName: 'Microsoft Azure Solutions Architect Expert',
        examCode: 'AZ-305',
        providerName: 'Microsoft',
        level: 'Expert',
        sequenceOrder: 3,
        rationale: 'Add multicloud enterprise prowess by mastering hybrid cloud, Azure governance, Entra ID federation, and disaster recovery.',
      },
    ],
  },
  {
    id: 'cp-devops-platform',
    slug: 'cloud-devops-platform-engineer',
    title: 'Cloud DevOps & Platform Engineer',
    description: 'Automate build, test, and release cycles with CI/CD pipelines, container orchestration, and Infrastructure as Code (IaC).',
    targetRoles: ['DevOps Engineer', 'Platform Engineer', 'Site Reliability Engineer (SRE)'],
    averageSalaryRange: '₹12,00,000 – ₹28,00,000 PA',
    iconName: 'GitBranch',
    prerequisites: 'Basic Linux terminal navigation and familiarity with Git version control.',
    difficulty: 'Intermediate',
    estimatedTimeline: '6 – 8 Months',
    recommendations: [
      {
        certificationId: 'cert-hashi-terraform',
        certificationName: 'HashiCorp Certified: Terraform Associate',
        examCode: 'TA-003',
        providerName: 'HashiCorp',
        level: 'Intermediate',
        sequenceOrder: 1,
        rationale: 'Standardize reproducible infrastructure delivery across any public cloud using declarative HCL code.',
      },
      {
        certificationId: 'cert-aws-dva',
        certificationName: 'AWS Certified Developer – Associate',
        examCode: 'DVA-C02',
        providerName: 'AWS',
        level: 'Intermediate',
        sequenceOrder: 2,
        rationale: 'Master serverless functions, API gateways, CloudWatch telemetry, and automated deployment pipelines.',
      },
      {
        certificationId: 'cert-lf-cka',
        certificationName: 'Certified Kubernetes Administrator (CKA)',
        examCode: 'CKA',
        providerName: 'The Linux Foundation',
        level: 'Advanced',
        sequenceOrder: 3,
        rationale: 'The ultimate container orchestration benchmark demonstrating command-line mastery over production Kubernetes clusters.',
      },
    ],
  },
  {
    id: 'cp-cybersecurity',
    slug: 'cybersecurity-analyst-defender',
    title: 'Cybersecurity Analyst & Defender',
    description: 'Defend corporate digital perimeters, conduct threat assessments, manage vulnerability triage, and investigate security breaches.',
    targetRoles: ['SOC Analyst', 'Cybersecurity Specialist', 'Information Security Officer'],
    averageSalaryRange: '₹10,00,000 – ₹24,00,000 PA',
    iconName: 'ShieldCheck',
    prerequisites: 'Basic awareness of operating systems and internet protocols.',
    difficulty: 'Intermediate',
    estimatedTimeline: '4 – 7 Months',
    recommendations: [
      {
        certificationId: 'cert-comptia-sec',
        certificationName: 'CompTIA Security+',
        examCode: 'SY0-701',
        providerName: 'CompTIA',
        level: 'Intermediate',
        sequenceOrder: 1,
        rationale: 'The internationally accepted baseline for defensive concepts, cryptography, threat vectors, and compliance.',
      },
      {
        certificationId: 'cert-cisco-cbrops',
        certificationName: 'Cisco Certified CyberOps Associate',
        examCode: '200-201',
        providerName: 'Cisco Systems',
        level: 'Intermediate',
        sequenceOrder: 2,
        rationale: 'Gain hands-on Security Operations Center (SOC) incident investigation, SIEM telemetry, and packet analysis skills.',
      },
    ],
  },
  {
    id: 'cp-network-engineer',
    slug: 'enterprise-network-engineer',
    title: 'Enterprise Network Engineer',
    description: 'Design, configure, and maintain robust enterprise local and wide area networks, routing fabrics, and secure interconnects.',
    targetRoles: ['Network Engineer', 'Network Operations Specialist', 'Infrastructure Support Lead'],
    averageSalaryRange: '₹8,00,000 – ₹20,00,000 PA',
    iconName: 'Network',
    prerequisites: 'High interest in hardware, cabling, and communication protocols.',
    difficulty: 'Intermediate',
    estimatedTimeline: '4 – 6 Months',
    recommendations: [
      {
        certificationId: 'cert-comptia-net',
        certificationName: 'CompTIA Network+',
        examCode: 'N10-009',
        providerName: 'CompTIA',
        level: 'Intermediate',
        sequenceOrder: 1,
        rationale: 'Establish vendor-neutral grasp of OSI layers, subnetting calculations, and physical infrastructure cabling.',
      },
      {
        certificationId: 'cert-cisco-ccna',
        certificationName: 'Cisco Certified Network Associate (CCNA)',
        examCode: '200-301',
        providerName: 'Cisco Systems',
        level: 'Intermediate',
        sequenceOrder: 2,
        rationale: 'The industry benchmark for configuring Cisco switches, OSPF routers, VLANs, and automation APIs.',
      },
    ],
  },
  {
    id: 'cp-ai-engineer',
    slug: 'artificial-intelligence-engineer',
    title: 'Applied AI & Cloud Data Specialist',
    description: 'Incorporate foundation models, cognitive vision APIs, and large language models into scalable business software systems.',
    targetRoles: ['AI Application Developer', 'Cognitive Services Specialist', 'ML Solutions Associate'],
    averageSalaryRange: '₹12,00,000 – ₹30,00,000 PA',
    iconName: 'Sparkles',
    prerequisites: 'Basic programming skills (Python/JavaScript) and cloud familiarity.',
    difficulty: 'Intermediate',
    estimatedTimeline: '3 – 5 Months',
    recommendations: [
      {
        certificationId: 'cert-ms-ai900',
        certificationName: 'Microsoft Azure AI Fundamentals',
        examCode: 'AI-900',
        providerName: 'Microsoft',
        level: 'Beginner',
        sequenceOrder: 1,
        rationale: 'Gain foundational knowledge of computer vision, NLP, and Responsible AI guidelines with Azure AI services.',
      },
      {
        certificationId: 'cert-gcp-ace',
        certificationName: 'Google Cloud Associate Cloud Engineer',
        examCode: 'ACE',
        providerName: 'Google Cloud',
        level: 'Intermediate',
        sequenceOrder: 2,
        rationale: 'Learn how to operationalize containerized AI backends and data pipelines reliably in Google Cloud infrastructure.',
      },
    ],
  },
];
