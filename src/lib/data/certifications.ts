import { Certification } from '../types';

export const CERTIFICATIONS: Certification[] = [
  // ==========================================
  // MICROSOFT
  // ==========================================
  {
    id: 'cert-az-900',
    slug: 'microsoft-azure-fundamentals-az-900',
    providerId: 'prov-msft',
    providerSlug: 'microsoft',
    providerName: 'Microsoft',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'Microsoft Azure Fundamentals',
    examCode: 'AZ-900',
    difficultyLevel: 'Beginner',
    voucherPriceInr: 349900, // ₹3,499
    retailPriceInr: 429900,  // ₹4,299
    validityMonths: 6,
    shortDescription: 'Master cloud concepts, core Azure services, security, privacy, compliance, and Azure pricing and SLAs.',
    fullDescription: 'The Microsoft Certified: Azure Fundamentals certification validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure. It is intended for candidates seeking to demonstrate foundational knowledge of cloud concepts, Azure architecture and services, and Azure management and governance.',
    purpose: 'Validate baseline comprehension of cloud economics, core architectural components, identity, governance, and compliance within Microsoft Azure.',
    prerequisites: [
      'No technical IT background required.',
      'General familiarity with the internet and basic computing concepts is recommended.'
    ],
    targetAudience: [
      'Students and fresh engineering graduates entering tech.',
      'Non-technical managers, sales representatives, and procurement specialists.',
      'Software developers transitioning into cloud-first architecture.'
    ],
    careerOpportunities: [
      'Junior Cloud Associate (₹4 - 7 LPA)',
      'Cloud Support Executive (₹3.5 - 6.5 LPA)',
      'Technical Account Associate (₹4.5 - 8 LPA)'
    ],
    skillsCovered: [
      'Cloud computing models (IaaS, PaaS, SaaS)',
      'Azure Regions, Availability Zones & Resource Groups',
      'Compute, Storage, Networking & Database services',
      'Microsoft Entra ID, RBAC & Zero Trust',
      'Azure Policy, Cost Management & Resource Locks'
    ],
    officialExamDetails: {
      durationMinutes: 60,
      numberOfQuestions: '35 - 50 questions',
      passingScore: '700 / 1000',
      format: 'Multiple choice, drag and drop, hot area',
      languages: ['English', 'Japanese', 'Chinese', 'Korean', 'German', 'Spanish', 'French'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE Online Proctored'
    },
    officialProviderUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Cloud Concepts & Benefits',
        duration: '1 Week',
        topics: ['High Availability, Scalability, Elasticity', 'CapEx vs OpEx cloud economics', 'Shared Responsibility Model']
      },
      {
        step: 2,
        title: 'Core Azure Architecture & Compute',
        duration: '1 Week',
        topics: ['Virtual Machines, App Services, Container Instances', 'Virtual Networks, VPNs, ExpressRoute', 'Blob Storage, Files, Disks']
      },
      {
        step: 3,
        title: 'Security, Identity & Governance',
        duration: '1 Week',
        topics: ['Microsoft Entra ID authentication & MFA', 'Role-Based Access Control (RBAC)', 'Cost Management & Azure Advisor']
      },
      {
        step: 4,
        title: 'Practice & Exam Scheduling',
        duration: '3 Days',
        topics: ['Official Microsoft Learn practice assessments', 'Voucher redemption on Pearson VUE']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 42,
    availableRegions: ['India', 'Global']
  },
  {
    id: 'cert-ai-900',
    slug: 'microsoft-azure-ai-fundamentals-ai-900',
    providerId: 'prov-msft',
    providerSlug: 'microsoft',
    providerName: 'Microsoft',
    categoryId: 'cat-ai',
    categorySlug: 'artificial-intelligence',
    categoryName: 'Artificial Intelligence',
    name: 'Microsoft Azure AI Fundamentals',
    examCode: 'AI-900',
    difficultyLevel: 'Beginner',
    voucherPriceInr: 349900,
    retailPriceInr: 429900,
    validityMonths: 6,
    shortDescription: 'Demonstrate foundational knowledge of Machine Learning and Artificial Intelligence concepts and related Azure services.',
    fullDescription: 'This certification validates foundational knowledge of machine learning (ML) and artificial intelligence (AI) concepts and related Microsoft Azure services. It covers computer vision, natural language processing, conversational AI, and responsible AI principles.',
    purpose: 'Validate fundamental understanding of predictive algorithms, NLP, computer vision, and generative AI ethics on Azure.',
    prerequisites: [
      'Basic awareness of computing and internet concepts.',
      'No programming background strictly required.'
    ],
    targetAudience: [
      'Engineers wanting to transition into Generative AI.',
      'Business analysts and product leaders managing AI projects.',
      'Data analysts adopting automated machine learning.'
    ],
    careerOpportunities: [
      'Junior AI Practitioner (₹5 - 9 LPA)',
      'AI Product Specialist (₹6 - 12 LPA)',
      'Cognitive Services Associate (₹5.5 - 10 LPA)'
    ],
    skillsCovered: [
      'Fundamental Machine Learning principles & metrics',
      'Computer Vision features (OCR, facial recognition, image tagging)',
      'Natural Language Processing (sentiment, translation, NER)',
      'Azure OpenAI Service & Prompt Engineering fundamentals',
      'Responsible AI framework (Fairness, Reliability, Transparency)'
    ],
    officialExamDetails: {
      durationMinutes: 60,
      numberOfQuestions: '40 - 50 questions',
      passingScore: '700 / 1000',
      format: 'Multiple choice, case-based questions',
      languages: ['English', 'Japanese', 'Spanish', 'German', 'French'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE Online Proctored'
    },
    officialProviderUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'AI Workloads & Responsible AI',
        duration: '1 Week',
        topics: ['Types of AI workloads', 'The six principles of Responsible AI']
      },
      {
        step: 2,
        title: 'Azure Machine Learning',
        duration: '1 Week',
        topics: ['Automated ML', 'Azure Machine Learning Studio designer', 'Model evaluation metrics']
      },
      {
        step: 3,
        title: 'Computer Vision & NLP',
        duration: '1 Week',
        topics: ['Azure AI Vision, Document Intelligence, Language Understanding', 'Azure OpenAI models']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 28,
    availableRegions: ['India', 'Global']
  },
  {
    id: 'cert-az-104',
    slug: 'microsoft-azure-administrator-az-104',
    providerId: 'prov-msft',
    providerSlug: 'microsoft',
    providerName: 'Microsoft',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'Microsoft Certified: Azure Administrator Associate',
    examCode: 'AZ-104',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 499900, // ₹4,999
    retailPriceInr: 599900,  // ₹5,999
    validityMonths: 6,
    shortDescription: 'Implement, manage, and monitor an organization’s Microsoft Azure environment, including virtual networks, storage, compute, and identity.',
    fullDescription: 'Candidates for this certification have subject matter expertise in implementing, managing, and monitoring an organization’s Microsoft Azure environment. Responsibilities for this role include implementing, managing, and monitoring identity, governance, storage, compute, and virtual networks in a cloud environment.',
    purpose: 'Certify high-level operational ability to build, scale, and maintain mission-critical enterprise workloads on Azure.',
    prerequisites: [
      'At least six months of hands-on experience administering Azure.',
      'Strong understanding of core Azure services, workloads, security, and governance.',
      'Familiarity with PowerShell, Azure CLI, ARM/Bicep templates.'
    ],
    targetAudience: [
      'Cloud Administrators',
      'System Engineers & Infrastructure Analysts',
      'DevOps Engineers managing hybrid environments'
    ],
    careerOpportunities: [
      'Azure Cloud Administrator (₹8 - 18 LPA)',
      'Cloud Infrastructure Specialist (₹10 - 22 LPA)',
      'Senior Systems Engineer (₹9 - 20 LPA)'
    ],
    skillsCovered: [
      'Manage Azure identities and governance (Entra ID, RBAC, Subscriptions)',
      'Implement and manage storage (Accounts, Blobs, Azure Files, Backup)',
      'Deploy and manage Azure compute resources (VMs, Containers, App Services)',
      'Configure and manage virtual networking (VNets, Peering, Bastion, NSGs)',
      'Monitor and maintain Azure resources (Azure Monitor, Log Analytics, Alerts)'
    ],
    officialExamDetails: {
      durationMinutes: 100,
      numberOfQuestions: '50 - 60 questions',
      passingScore: '700 / 1000',
      format: 'Multiple choice, scenario case studies, interactive UI tasks',
      languages: ['English', 'Chinese', 'Japanese', 'Korean', 'German', 'Spanish', 'French'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE'
    },
    officialProviderUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Identities & Governance Mastery',
        duration: '2 Weeks',
        topics: ['Microsoft Entra ID users, groups, licenses', 'Custom RBAC roles', 'Resource tagging and management groups']
      },
      {
        step: 2,
        title: 'Virtual Networking Deep Dive',
        duration: '2 Weeks',
        topics: ['VNet peering, user-defined routing (UDR)', 'Network Security Groups & Application Security Groups', 'Azure Firewall & VPN Gateways']
      },
      {
        step: 3,
        title: 'Compute & Storage Operations',
        duration: '2 Weeks',
        topics: ['VM sizing, availability sets, scale sets', 'Container Instances & AKS basics', 'Azure Storage lifecycles & replication']
      },
      {
        step: 4,
        title: 'Monitoring, Troubleshooting & Labs',
        duration: '1 Week',
        topics: ['Azure Monitor metric alerts', 'Log Analytics KQL queries', 'Network Watcher packet inspection']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 35,
    availableRegions: ['India', 'Global']
  },
  {
    id: 'cert-az-305',
    slug: 'microsoft-azure-solutions-architect-az-305',
    providerId: 'prov-msft',
    providerSlug: 'microsoft',
    providerName: 'Microsoft',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'Designing Microsoft Azure Infrastructure Solutions',
    examCode: 'AZ-305',
    difficultyLevel: 'Advanced',
    voucherPriceInr: 499900,
    retailPriceInr: 599900,
    validityMonths: 6,
    shortDescription: 'Design identity, governance, data storage, business continuity, and infrastructure solutions across enterprise Azure architectures.',
    fullDescription: 'The AZ-305 exam proves advanced architecture skills. Solutions architects advise stakeholders and translate business requirements into secure, scalable, and reliable cloud solutions. Earning this alongside AZ-104 qualifies you as a Microsoft Certified: Azure Solutions Architect Expert.',
    purpose: 'Validate enterprise-tier solution architecture, high-availability data topologies, disaster recovery, and hybrid networking designs.',
    prerequisites: [
      'Passing AZ-104 Azure Administrator Associate is required for the full Expert credential.',
      'Advanced experience in cloud computing, networking, virtualization, and business continuity.'
    ],
    targetAudience: [
      'Senior Cloud Architects',
      'Principal Systems Engineers',
      'Enterprise Technology Consultants'
    ],
    careerOpportunities: [
      'Azure Solutions Architect (₹16 - 35 LPA)',
      'Enterprise Cloud Consultant (₹18 - 40 LPA)',
      'Lead Infrastructure Architect (₹20 - 45 LPA)'
    ],
    skillsCovered: [
      'Design identity, governance, and monitoring solutions',
      'Design data storage solutions (relational, NoSQL, data lakes)',
      'Design business continuity solutions (backup, recovery, high availability)',
      'Design infrastructure solutions (compute, network, application architecture)'
    ],
    officialExamDetails: {
      durationMinutes: 100,
      numberOfQuestions: '50 - 60 questions',
      passingScore: '700 / 1000',
      format: 'Complex case studies and architecture decision scenarios',
      languages: ['English', 'Japanese', 'German'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE'
    },
    officialProviderUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Identity & Governance Architecture',
        duration: '2 Weeks',
        topics: ['Conditional Access, Identity Protection, PIM', 'Enterprise landing zone architecture']
      },
      {
        step: 2,
        title: 'Data Storage & Database Design',
        duration: '2 Weeks',
        topics: ['Azure SQL Database tiers, Cosmos DB consistency levels', 'Azure Synapse, Data Lake Gen2']
      },
      {
        step: 3,
        title: 'Business Continuity & Resiliency',
        duration: '2 Weeks',
        topics: ['Azure Site Recovery (ASR), multi-region active-active patterns', 'RTO/RPO SLA calculations']
      }
    ],
    status: 'active',
    isFeatured: false,
    stockCount: 19,
    availableRegions: ['India', 'Global']
  },

  // ==========================================
  // AMAZON WEB SERVICES (AWS)
  // ==========================================
  {
    id: 'cert-aws-saa',
    slug: 'aws-certified-solutions-architect-associate-saa-c03',
    providerId: 'prov-aws',
    providerSlug: 'aws',
    providerName: 'Amazon Web Services',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'AWS Certified Solutions Architect – Associate',
    examCode: 'SAA-C03',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 1299900, // ₹12,999
    retailPriceInr: 1499900,  // ₹14,999
    validityMonths: 6,
    shortDescription: 'The premier cloud credential validating ability to design resilient, high-performing, secure, and cost-optimized AWS architectures.',
    fullDescription: 'The AWS Certified Solutions Architect - Associate (SAA-C03) showcases knowledge and skills in AWS technology, across a wide range of AWS services. The focus of this certification is on the design of cost and performance optimized solutions, demonstrating a strong understanding of the AWS Well-Architected Framework.',
    purpose: 'Validate comprehensive ability to translate business requirements into fault-tolerant, secure, and performant architectures on Amazon Web Services.',
    prerequisites: [
      'Hands-on experience with compute, networking, storage, and database AWS services.',
      'Basic understanding of IT infrastructure and security compliance.'
    ],
    targetAudience: [
      'Solutions Architects and Cloud Engineers',
      'Backend Developers building distributed applications',
      'Systems Administrators migrating on-premise infrastructure to AWS'
    ],
    careerOpportunities: [
      'AWS Solutions Architect (₹12 - 28 LPA)',
      'Cloud Infrastructure Engineer (₹10 - 24 LPA)',
      'DevOps Architect (₹14 - 30 LPA)'
    ],
    skillsCovered: [
      'Design Secure Architectures (IAM, KMS, Security Groups, WAF)',
      'Design Resilient Architectures (Multi-AZ, Auto Scaling, ELB, Route 53)',
      'Design High-Performing Architectures (EC2, Lambda, S3, RDS, DynamoDB)',
      'Design Cost-Optimized Architectures (Spot Instances, Savings Plans, S3 Tiering)'
    ],
    officialExamDetails: {
      durationMinutes: 130,
      numberOfQuestions: '65 questions',
      passingScore: '720 / 1000',
      format: 'Multiple choice and multiple response questions',
      languages: ['English', 'Japanese', 'Korean', 'Simplified Chinese', 'German', 'Spanish', 'French'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE Online Proctored'
    },
    officialProviderUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Core VPC Networking & Compute',
        duration: '2 Weeks',
        topics: ['Custom VPCs, Subnets, NAT Gateways, Route Tables', 'EC2 instance families, EBS volume types, and AMI lifecycle']
      },
      {
        step: 2,
        title: 'High Availability & Database Design',
        duration: '2 Weeks',
        topics: ['Application Load Balancers vs Network Load Balancers', 'RDS Multi-AZ and Read Replicas, DynamoDB global tables']
      },
      {
        step: 3,
        title: 'Decoupling, Serverless & Storage',
        duration: '2 Weeks',
        topics: ['SQS standard/FIFO, SNS push notifications, EventBridge', 'Lambda event sources, API Gateway, CloudFront CDN']
      },
      {
        step: 4,
        title: 'Well-Architected Framework & Practice Tests',
        duration: '1 Week',
        topics: ['5 Pillars of Well-Architected Framework', 'Timed mock exams scoring 85%+']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 38,
    availableRegions: ['India', 'Global']
  },
  {
    id: 'cert-aws-clf',
    slug: 'aws-certified-cloud-practitioner-clf-c02',
    providerId: 'prov-aws',
    providerSlug: 'aws',
    providerName: 'Amazon Web Services',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'AWS Certified Cloud Practitioner',
    examCode: 'CLF-C02',
    difficultyLevel: 'Beginner',
    voucherPriceInr: 849900,
    retailPriceInr: 999900,
    validityMonths: 6,
    shortDescription: 'Validates overall understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.',
    fullDescription: 'The AWS Certified Cloud Practitioner validation helps organizations identify and develop talent with critical knowledge related to implementing cloud initiatives. Earning CLF-C02 validates cloud fluency and foundational AWS knowledge across billing, security, and core services.',
    purpose: 'Prove fundamental understanding of AWS cloud terminology, core compute/storage/database services, and cost models.',
    prerequisites: [
      'No previous cloud experience required.',
      'General IT or business familiarity is recommended.'
    ],
    targetAudience: [
      'Tech novices, students, and career changers.',
      'Product managers, scrum masters, and business analysts.',
      'IT support staff and technical sales professionals.'
    ],
    careerOpportunities: [
      'Cloud Support Associate (₹4 - 8 LPA)',
      'Technical Sales Consultant (₹5 - 10 LPA)',
      'Junior Cloud Operations Analyst (₹4.5 - 8 LPA)'
    ],
    skillsCovered: [
      'Cloud concepts, cloud economics, and billing practices',
      'Security and compliance within the AWS Shared Responsibility Model',
      'Understanding of core AWS services (EC2, S3, RDS, Lambda, VPC)',
      'AWS CloudWatch, CloudTrail, and Trusted Advisor monitoring'
    ],
    officialExamDetails: {
      durationMinutes: 90,
      numberOfQuestions: '65 questions',
      passingScore: '700 / 1000',
      format: 'Multiple choice questions',
      languages: ['English', 'Japanese', 'Korean', 'Spanish', 'German', 'French'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE'
    },
    officialProviderUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Cloud Value Proposition',
        duration: '1 Week',
        topics: ['Cloud agility, global reach, disaster recovery benefits', 'AWS global infrastructure: Regions & Availability Zones']
      },
      {
        step: 2,
        title: 'Core Services Overview',
        duration: '1 Week',
        topics: ['Compute: EC2, Lightsail, Lambda, ECS', 'Storage: S3, EBS, EFS', 'Database: RDS, DynamoDB']
      },
      {
        step: 3,
        title: 'Security, Pricing & Support Plans',
        duration: '1 Week',
        topics: ['IAM policies and MFA', 'AWS Cost Explorer, Budgets, Pricing Calculator', 'Basic vs Developer vs Business Support']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 50,
    availableRegions: ['India', 'Global']
  },
  {
    id: 'cert-aws-dva',
    slug: 'aws-certified-developer-associate-dva-c02',
    providerId: 'prov-aws',
    providerSlug: 'aws',
    providerName: 'Amazon Web Services',
    categoryId: 'cat-devops',
    categorySlug: 'devops',
    categoryName: 'DevOps',
    name: 'AWS Certified Developer – Associate',
    examCode: 'DVA-C02',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 1299900,
    retailPriceInr: 1499900,
    validityMonths: 6,
    shortDescription: 'Validates proficiency in developing, deploying, and debugging cloud-based applications using AWS services and CI/CD pipelines.',
    fullDescription: 'The AWS Certified Developer - Associate (DVA-C02) validates technical expertise in developing, testing, deploying, and debugging secure, scalable serverless and cloud-native applications on AWS using AWS SDKs, CLI, CI/CD, and serverless compute.',
    purpose: 'Validate expertise in cloud-native software development, containerization, microservices, and serverless architecture.',
    prerequisites: [
      'Proficiency in at least one high-level programming language (Node.js, Python, Java, Go).',
      'Knowledge of core AWS services and basic debugging tools.'
    ],
    targetAudience: [
      'Software Engineers & Full Stack Developers',
      'Cloud Application Developers',
      'DevOps Engineers automating deployment pipelines'
    ],
    careerOpportunities: [
      'AWS Cloud Developer (₹9 - 22 LPA)',
      'Serverless Application Engineer (₹11 - 25 LPA)',
      'Full Stack Cloud Engineer (₹10 - 24 LPA)'
    ],
    skillsCovered: [
      'Development with AWS Services (DynamoDB API, S3 SDK, SQS/SNS)',
      'Security (IAM roles, KMS encryption, Secrets Manager, Cognito)',
      'Deployment (CloudFormation, SAM, Elastic Beanstalk, CodePipeline)',
      'Refactoring & Troubleshooting (X-Ray tracing, CloudWatch Logs, Lambda concurrency)'
    ],
    officialExamDetails: {
      durationMinutes: 130,
      numberOfQuestions: '65 questions',
      passingScore: '720 / 1000',
      format: 'Multiple choice and multiple response questions',
      languages: ['English', 'Japanese', 'Korean', 'German', 'Spanish'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE'
    },
    officialProviderUrl: 'https://aws.amazon.com/certification/certified-developer-associate/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Serverless Application Stack',
        duration: '2 Weeks',
        topics: ['AWS Lambda triggers, layers, execution context', 'API Gateway WebSocket and REST APIs, Cognito user pools']
      },
      {
        step: 2,
        title: 'NoSQL Data Modeling with DynamoDB',
        duration: '2 Weeks',
        topics: ['Partition keys, sort keys, Global Secondary Indexes (GSI)', 'Read/Write capacity units (RCU/WCU), DAX caching']
      },
      {
        step: 3,
        title: 'CI/CD & Observability',
        duration: '2 Weeks',
        topics: ['AWS CodeCommit, CodeBuild, CodeDeploy, CodePipeline', 'AWS X-Ray subsegments and trace daemon']
      }
    ],
    status: 'active',
    isFeatured: false,
    stockCount: 22,
    availableRegions: ['India', 'Global']
  },

  // ==========================================
  // GOOGLE CLOUD PLATFORM (GCP)
  // ==========================================
  {
    id: 'cert-gcp-ace',
    slug: 'google-cloud-associate-cloud-engineer-ace',
    providerId: 'prov-gcp',
    providerSlug: 'google-cloud',
    providerName: 'Google Cloud Platform',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'Google Cloud Associate Cloud Engineer',
    examCode: 'ACE',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 1149900, // ₹11,499
    retailPriceInr: 1349900,  // ₹13,499
    validityMonths: 6,
    shortDescription: 'Deploy applications, monitor operations, and manage enterprise solutions on Google Cloud Platform using console and gcloud CLI.',
    fullDescription: 'An Associate Cloud Engineer deploys applications, monitors operations, and manages enterprise solutions. They use Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.',
    purpose: 'Validate practical command-line and console proficiency for deploying and operating workloads across Google Cloud infrastructure.',
    prerequisites: [
      '6+ months hands-on experience with Google Cloud.',
      'Working knowledge of Linux command-line, networking, and containers.'
    ],
    targetAudience: [
      'Cloud Engineers and DevOps Specialists',
      'System Administrators migrating to GCP',
      'Platform Engineers supporting Kubernetes workloads'
    ],
    careerOpportunities: [
      'Google Cloud Engineer (₹8 - 20 LPA)',
      'GCP Infrastructure Specialist (₹10 - 24 LPA)',
      'Site Reliability Engineer (₹12 - 26 LPA)'
    ],
    skillsCovered: [
      'Setting up a cloud solution environment (Projects, IAM, Billing)',
      'Planning and configuring cloud solutions (Compute Engine, GKE, Cloud Run, Storage)',
      'Deploying and implementing cloud solutions (VPC networks, Cloud SQL, BigQuery)',
      'Ensuring successful operations (Cloud Monitoring, Logging, Error Reporting)',
      'Configuring access and security (IAM roles, Service accounts, Audit logs)'
    ],
    officialExamDetails: {
      durationMinutes: 120,
      numberOfQuestions: '50 - 60 questions',
      passingScore: '70%',
      format: 'Multiple choice and multiple select',
      languages: ['English', 'Japanese', 'Spanish'],
      testingCenter: 'Kryterion Testing Centers or Online Proctored'
    },
    officialProviderUrl: 'https://cloud.google.com/learn/certification/cloud-engineer',
    preparationRoadmap: [
      {
        step: 1,
        title: 'GCP Hierarchy & IAM Security',
        duration: '2 Weeks',
        topics: ['Organization, Folders, Projects, Resource inheritance', 'Custom IAM roles, Service account keys, and impersonation']
      },
      {
        step: 2,
        title: 'Compute Engine & Google Kubernetes Engine (GKE)',
        duration: '3 Weeks',
        topics: ['GCE sizing, preemptible VMs, instance groups', 'GKE Autopilot vs Standard, node pools, kubectl operations']
      },
      {
        step: 3,
        title: 'Networking & Managed Databases',
        duration: '2 Weeks',
        topics: ['VPC firewall rules, Cloud NAT, Cloud Router, Peering', 'Cloud SQL high availability, Cloud Spanner, Cloud Bigtable']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 26,
    availableRegions: ['India', 'Global']
  },
  {
    id: 'cert-gcp-pca',
    slug: 'google-cloud-professional-cloud-architect-pca',
    providerId: 'prov-gcp',
    providerSlug: 'google-cloud',
    providerName: 'Google Cloud Platform',
    categoryId: 'cat-cloud',
    categorySlug: 'cloud-computing',
    categoryName: 'Cloud Computing',
    name: 'Google Cloud Professional Cloud Architect',
    examCode: 'PCA',
    difficultyLevel: 'Advanced',
    voucherPriceInr: 1699900,
    retailPriceInr: 1899900,
    validityMonths: 6,
    shortDescription: 'Architect robust, secure, scalable, highly available, and dynamic solutions to drive business objectives on Google Cloud.',
    fullDescription: 'Professional Cloud Architects enable organizations to leverage Google Cloud technologies. Through an understanding of cloud architecture and Google technology, they design, develop, and manage robust, secure, scalable, and dynamic solutions to drive business objectives.',
    purpose: 'Certify elite architectural mastery across enterprise multi-region scale, data compliance, and complex hybrid connectivity.',
    prerequisites: [
      '3+ years of industry experience including 1+ years designing and managing solutions using Google Cloud.',
      'Strong grasp of enterprise case studies (EHR Healthcare, Mountkirk Games, TerramEarth).'
    ],
    targetAudience: [
      'Enterprise Cloud Architects',
      'Chief Technology Officers and Solution Directors',
      'Principal Infrastructure Consultants'
    ],
    careerOpportunities: [
      'Principal Google Cloud Architect (₹22 - 48 LPA)',
      'Enterprise Cloud Consultant (₹20 - 45 LPA)',
      'Cloud Strategy Director (₹30 - 60 LPA)'
    ],
    skillsCovered: [
      'Designing and planning a cloud solution architecture',
      'Managing and provisioning cloud solution infrastructure',
      'Designing for security and compliance (KMS, Cloud Armor, DLP)',
      'Analyzing and optimizing technical and business processes',
      'Managing implementations and ensuring solution reliability'
    ],
    officialExamDetails: {
      durationMinutes: 120,
      numberOfQuestions: '50 - 60 questions',
      passingScore: 'Pass/Fail evaluation based on psychometrics',
      format: 'Multiple choice, case studies (EHR Healthcare, Mountkirk Games)',
      languages: ['English', 'Japanese'],
      testingCenter: 'Kryterion Testing Centers or Online Proctored'
    },
    officialProviderUrl: 'https://cloud.google.com/learn/certification/cloud-architect',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Deep Case Study Analysis',
        duration: '2 Weeks',
        topics: ['Deconstruct Mountkirk Games, TerramEarth, and EHR requirements', 'Identify technical constraints, compliance mandates, and SLAs']
      },
      {
        step: 2,
        title: 'Hybrid Multi-Cloud Connectivity & Security',
        duration: '3 Weeks',
        topics: ['Dedicated Interconnect, Partner Interconnect, Cloud VPN', 'Anthos / GKE Enterprise, Cloud Armor DDoS mitigation']
      },
      {
        step: 3,
        title: 'Data Architecture & Migration Strategies',
        duration: '2 Weeks',
        topics: ['BigQuery partitioning, clustering, Bigtable schemas', 'Database Migration Service (DMS), Transfer Appliance']
      }
    ],
    status: 'active',
    isFeatured: false,
    stockCount: 15,
    availableRegions: ['India', 'Global']
  },

  // ==========================================
  // CISCO SYSTEMS
  // ==========================================
  {
    id: 'cert-cisco-ccna',
    slug: 'cisco-certified-network-associate-ccna-200-301',
    providerId: 'prov-cisco',
    providerSlug: 'cisco',
    providerName: 'Cisco Systems',
    categoryId: 'cat-networking',
    categorySlug: 'networking',
    categoryName: 'Networking',
    name: 'Cisco Certified Network Associate (CCNA)',
    examCode: '200-301',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 2249900, // ₹22,499
    retailPriceInr: 2599900,  // ₹25,999
    validityMonths: 6,
    shortDescription: 'The bedrock of modern networking covering network fundamentals, network access, IP connectivity, IP services, security, and automation.',
    fullDescription: 'The Cisco CCNA certification proves you have what it takes to navigate the ever-changing landscape of modern IT. The CCNA exam covers networking fundamentals, IP services, security fundamentals, and software automation and programmability.',
    purpose: 'Validate foundational enterprise network switching, routing, wireless controllers, IP access controls, and REST API network automation.',
    prerequisites: [
      'Basic computer literacy and IP addressing knowledge.',
      'One or more years of experience implementing and administering Cisco solutions recommended.'
    ],
    targetAudience: [
      'Network Administrators and Support Technicians',
      'Network Operations Center (NOC) Engineers',
      'Systems Engineers transitioning to infrastructure networking'
    ],
    careerOpportunities: [
      'Network Engineer (₹5 - 14 LPA)',
      'NOC Specialist (₹4.5 - 10 LPA)',
      'Cisco Infrastructure Administrator (₹6 - 15 LPA)'
    ],
    skillsCovered: [
      'Network Fundamentals (Routers, Switches, IPv4 Subnetting, IPv6)',
      'Network Access (VLANs, Trunking, EtherChannel, STP, WLCs)',
      'IP Connectivity (Routing tables, Static routes, OSPFv2)',
      'IP Services (NAT, NTP, DHCP, DNS, SNMP, SSH, TFTP)',
      'Security Fundamentals (Port security, ACLs, AAA, VPN concepts)',
      'Automation & Programmability (REST APIs, JSON, Puppet, Chef, Ansible)'
    ],
    officialExamDetails: {
      durationMinutes: 120,
      numberOfQuestions: '100 - 105 questions',
      passingScore: '825 / 1000',
      format: 'Multiple choice, drag-and-drop, and live network configuration labs',
      languages: ['English', 'Japanese'],
      testingCenter: 'Pearson VUE Testing Centers or Online Proctored'
    },
    officialProviderUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html',
    preparationRoadmap: [
      {
        step: 1,
        title: 'IPv4 & IPv6 Subnetting Mastery',
        duration: '2 Weeks',
        topics: ['VLSM calculation speed, binary-to-decimal conversion', 'IPv6 unicast, multicast, link-local configurations']
      },
      {
        step: 2,
        title: 'Switching, VLANs & Spanning Tree',
        duration: '3 Weeks',
        topics: ['802.1Q trunking, Native VLANs, VTP', 'RSTP, PortFast, BPDU Guard, LACP EtherChannel']
      },
      {
        step: 3,
        title: 'Routing & Single-Area OSPF',
        duration: '3 Weeks',
        topics: ['Router on a stick, Layer 3 switching (SVIs)', 'OSPF neighbor adjacencies, DR/BDR election, passive interfaces']
      },
      {
        step: 4,
        title: 'Security, Services & Automation Labs',
        duration: '2 Weeks',
        topics: ['Standard and Extended ACLs, Dynamic NAT/PAT', 'Cisco DNA Center, RESTCONF, Python netmiko basics']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 30,
    availableRegions: ['India', 'Global']
  },

  // ==========================================
  // COMPTIA
  // ==========================================
  {
    id: 'cert-comptia-sec',
    slug: 'comptia-security-plus-sy0-701',
    providerId: 'prov-comptia',
    providerSlug: 'comptia',
    providerName: 'CompTIA',
    categoryId: 'cat-security',
    categorySlug: 'cybersecurity',
    categoryName: 'Cybersecurity',
    name: 'CompTIA Security+',
    examCode: 'SY0-701',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 2199900, // ₹21,999
    retailPriceInr: 2499900,  // ₹24,999
    validityMonths: 12,
    shortDescription: 'The global benchmark for baseline cybersecurity expertise required by major tech corporations and defense institutions.',
    fullDescription: 'CompTIA Security+ is the first security certification a candidate should earn. It establishes the core knowledge required of any cybersecurity role and provides a springboard to intermediate-level cybersecurity jobs. SY0-701 features expanded coverage on cloud environments, threat analysis, and zero-trust paradigms.',
    purpose: 'Validate operational competence in assessing security posture, recommending mitigations, and responding to security incidents.',
    prerequisites: [
      'CompTIA Network+ and two years of IT administration experience with a security focus recommended.'
    ],
    targetAudience: [
      'SOC Analysts and Security Engineers',
      'Systems and Network Administrators upgrading to Cyber Defense',
      'Consultants and Compliance Auditors'
    ],
    careerOpportunities: [
      'Information Security Analyst (₹8 - 18 LPA)',
      'SOC Tier 1/2 Analyst (₹6 - 15 LPA)',
      'Cybersecurity Specialist (₹9 - 22 LPA)'
    ],
    skillsCovered: [
      'General Security Concepts (CIA Triad, AAA, Zero Trust Architecture)',
      'Threats, Vulnerabilities & Mitigations (Malware, Social Engineering, CVEs)',
      'Security Architecture (Cloud, Infrastructure, Cryptography, PKI)',
      'Security Operations (SIEM, EDR, Incident Response, Firewall ACLs)',
      'Security Program Management (Risk Assessment, Vendor Risk, Compliance)'
    ],
    officialExamDetails: {
      durationMinutes: 90,
      numberOfQuestions: 'Up to 90 questions',
      passingScore: '750 / 900',
      format: 'Multiple choice and Performance-Based Questions (PBQs)',
      languages: ['English', 'Japanese', 'Portuguese', 'Spanish'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE'
    },
    officialProviderUrl: 'https://www.comptia.org/certifications/security',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Threat Landscape & Attack Vectors',
        duration: '2 Weeks',
        topics: ['Phishing variants, ransomware, zero-day exploits', 'Threat intelligence (MITRE ATT&CK, STIX/TAXII)']
      },
      {
        step: 2,
        title: 'Cryptographic Primitives & PKI',
        duration: '2 Weeks',
        topics: ['Symmetric vs Asymmetric ciphers, Hashing, Digital Signatures', 'Certificate Authorities, CRL, OCSP stapling']
      },
      {
        step: 3,
        title: 'Identity, Zero Trust & Cloud Defense',
        duration: '2 Weeks',
        topics: ['SAML, OAuth 2.0, OpenID Connect, RADIUS/TACACS+', 'CASB, SASE, micro-segmentation, and zero trust policies']
      },
      {
        step: 4,
        title: 'Incident Response & PBQ Simulations',
        duration: '2 Weeks',
        topics: ['NIST SP 800-61 response lifecycle', 'Performance-based lab scenarios on configuring firewall rules']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 45,
    availableRegions: ['Global', 'India']
  },
  {
    id: 'cert-comptia-net',
    slug: 'comptia-network-plus-n10-008',
    providerId: 'prov-comptia',
    providerSlug: 'comptia',
    providerName: 'CompTIA',
    categoryId: 'cat-networking',
    categorySlug: 'networking',
    categoryName: 'Networking',
    name: 'CompTIA Network+',
    examCode: 'N10-008',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 1999900,
    retailPriceInr: 2299900,
    validityMonths: 12,
    shortDescription: 'Validates vendor-neutral networking skills to troubleshoot, configure, and manage essential network infrastructure.',
    fullDescription: 'CompTIA Network+ validates the technical skills needed to securely establish, maintain and troubleshoot the essential networks that businesses rely on. Unlike other vendor-specific networking certifications, CompTIA Network+ prepares candidates to support the network regardless of the platform.',
    purpose: 'Validate foundational and vendor-neutral understanding of enterprise hardware, routing, wireless protocols, and network troubleshooting.',
    prerequisites: [
      'CompTIA A+ certification or equivalent 9-12 months networking experience recommended.'
    ],
    targetAudience: [
      'Network Support Technicians',
      'Junior Systems Engineers',
      'Field Support Specialists'
    ],
    careerOpportunities: [
      'Network Administrator (₹5 - 12 LPA)',
      'Infrastructure Support Specialist (₹4 - 9 LPA)',
      'Technical Helpdesk Level 2 (₹4.5 - 8.5 LPA)'
    ],
    skillsCovered: [
      'Networking Fundamentals (OSI 7-layer model, Ethernet standards, IP addressing)',
      'Network Implementations (Routing technologies, wireless standards, storage networks)',
      'Network Operations (Monitoring, baselines, high availability, business continuity)',
      'Network Security (Physical security, authentication, wireless encryption WPA3)',
      'Network Troubleshooting (Troubleshooting methodology, cable testers, Wireshark)'
    ],
    officialExamDetails: {
      durationMinutes: 90,
      numberOfQuestions: 'Up to 90 questions',
      passingScore: '720 / 900',
      format: 'Multiple choice and Performance-Based Questions',
      languages: ['English', 'German', 'Japanese', 'Spanish'],
      testingCenter: 'Pearson VUE Testing Centers or OnVUE'
    },
    officialProviderUrl: 'https://www.comptia.org/certifications/network',
    preparationRoadmap: [
      {
        step: 1,
        title: 'OSI Model & Port Numbers',
        duration: '2 Weeks',
        topics: ['7 Layers of OSI vs TCP/IP model', 'Memorize common ports: 20/21, 22, 23, 25, 53, 80, 443, 3389']
      },
      {
        step: 2,
        title: 'Cabling, Hardware & Wireless',
        duration: '2 Weeks',
        topics: ['Cat5e/6/6a/7 standards, Fiber optics (Single-mode vs Multi-mode)', '802.11a/b/g/n/ac/ax WiFi standards']
      },
      {
        step: 3,
        title: 'Troubleshooting Tools & Methodology',
        duration: '2 Weeks',
        topics: ['ping, traceroute, nslookup, netstat, arp, ipconfig', 'Wireshark packet capture analysis']
      }
    ],
    status: 'active',
    isFeatured: false,
    stockCount: 20,
    availableRegions: ['Global', 'India']
  },

  // ==========================================
  // NUTANIX
  // ==========================================
  {
    id: 'cert-nutanix-mci',
    slug: 'nutanix-certified-professional-multicloud-infrastructure-ncp-mci',
    providerId: 'prov-nutanix',
    providerSlug: 'nutanix',
    providerName: 'Nutanix',
    categoryId: 'cat-virt',
    categorySlug: 'virtualization',
    categoryName: 'Virtualization',
    name: 'Nutanix Certified Professional - Multicloud Infrastructure (NCP-MCI)',
    examCode: 'NCP-MCI',
    difficultyLevel: 'Intermediate',
    voucherPriceInr: 1499900, // ₹14,999
    retailPriceInr: 1799900,  // ₹17,999
    validityMonths: 6,
    shortDescription: 'Proves skills and knowledge in deploying, administering, and troubleshooting Nutanix AOS nodes, clusters, and Prism Central.',
    fullDescription: 'The Nutanix Certified Professional - Multicloud Infrastructure (NCP-MCI) certification validates your ability to configure, manage, and monitor Nutanix AOS clusters, Prism Element, Prism Central, storage containers, AHV virtual machines, and data protection strategies.',
    purpose: 'Certify hyperconverged infrastructure (HCI) engineering skills for enterprise private cloud and datacenter consolidation.',
    prerequisites: [
      'Experience administering virtualized data centers (VMware vSphere or Nutanix AHV).',
      'Understanding of storage concepts (SAN, NAS, RAID, IOPS, latency).'
    ],
    targetAudience: [
      'Datacenter Administrators',
      'Virtualization Engineers and Architects',
      'Storage Administrators managing converged platforms'
    ],
    careerOpportunities: [
      'Virtualization Specialist (₹10 - 22 LPA)',
      'HCI Infrastructure Architect (₹14 - 30 LPA)',
      'Senior Datacenter Engineer (₹12 - 25 LPA)'
    ],
    skillsCovered: [
      'Nutanix Enterprise Cloud Concepts & Distributed Storage Fabric',
      'Cluster Configuration, Storage Pools & Storage Containers',
      'AHV VM Deployment, Configuration, and Live Migration',
      'Data Protection, Asynchronous/Synchronous Replication & DR',
      'Prism Central Multicloud Management & NCC Cluster Health Checks'
    ],
    officialExamDetails: {
      durationMinutes: 120,
      numberOfQuestions: '75 questions',
      passingScore: '3000 / 6000',
      format: 'Multiple choice questions',
      languages: ['English', 'Japanese'],
      testingCenter: 'Webassessor / PSI Online Proctored'
    },
    officialProviderUrl: 'https://www.nutanix.com/support-services/training-certification/certifications/ncp-mci',
    preparationRoadmap: [
      {
        step: 1,
        title: 'AOS Distributed Storage Fabric',
        duration: '2 Weeks',
        topics: ['Data locality, Oplog, Extent Store, Content Cache', 'Deduplication, Compression, Erasure Coding (EC-X)']
      },
      {
        step: 2,
        title: 'AHV Hypervisor Management',
        duration: '2 Weeks',
        topics: ['Virtual Machine provisioning, IPAM, memory overcommit', 'High Availability (HA) reservations, affinity policies']
      },
      {
        step: 3,
        title: 'Protection Domains & NCC Diagnostics',
        duration: '2 Weeks',
        topics: ['Snapshot schedules, remote site replication, Leap runbooks', 'Nutanix Cluster Check (NCC) command-line analysis']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 18,
    availableRegions: ['Global', 'India']
  },

  // ==========================================
  // LINUX FOUNDATION / KUBERNETES
  // ==========================================
  {
    id: 'cert-lf-cka',
    slug: 'certified-kubernetes-administrator-cka',
    providerId: 'prov-linux-foundation',
    providerSlug: 'linux-foundation',
    providerName: 'The Linux Foundation',
    categoryId: 'cat-devops',
    categorySlug: 'devops',
    categoryName: 'DevOps',
    name: 'Certified Kubernetes Administrator (CKA)',
    examCode: 'CKA',
    difficultyLevel: 'Advanced',
    voucherPriceInr: 2799900, // ₹27,999
    retailPriceInr: 3299900,  // ₹32,999 (~$395 USD)
    validityMonths: 12,
    shortDescription: 'The gold standard 100% hands-on performance-based exam certifying mastery in configuring and managing production Kubernetes clusters.',
    fullDescription: 'The Certified Kubernetes Administrator (CKA) program was created by the Linux Foundation and the Cloud Native Computing Foundation (CNCF). The CKA certification allows users to demonstrate competence in basic installation and configuring of production-grade Kubernetes clusters, along with understanding key concepts of networking, storage, security, maintenance, and troubleshooting.',
    purpose: 'Validate hands-on command-line competence to install, configure, secure, and troubleshoot production Kubernetes clusters from scratch.',
    prerequisites: [
      'Strong proficiency in Linux command line and system administration.',
      'Understanding of container runtimes (Docker, containerd).',
      'Knowledge of YAML syntax and basic network routing.'
    ],
    targetAudience: [
      'DevOps Engineers and SREs',
      'Cloud Architects deploying microservices',
      'Platform Engineers managing multi-tenant Kubernetes clusters'
    ],
    careerOpportunities: [
      'Kubernetes Platform Engineer (₹16 - 36 LPA)',
      'Lead DevOps / SRE Architect (₹18 - 42 LPA)',
      'Cloud Native Infrastructure Engineer (₹15 - 32 LPA)'
    ],
    skillsCovered: [
      'Cluster Architecture, Installation & Configuration (kubeadm, etcd backup/restore)',
      'Workloads & Scheduling (Deployments, DaemonSets, StatefulSets, Affinity/Anti-affinity)',
      'Services & Networking (CoreDNS, CNI plugins, Ingress, NetworkPolicies)',
      'Storage (PersistentVolumes, PersistentVolumeClaims, StorageClasses)',
      'Troubleshooting (kubelet logs, API server failures, node unreadiness)'
    ],
    officialExamDetails: {
      durationMinutes: 120,
      numberOfQuestions: '15 - 20 performance-based real terminal tasks',
      passingScore: '66%',
      format: 'Hands-on practical terminal lab environment (Ubuntu Linux)',
      languages: ['English', 'Simplified Chinese', 'Japanese'],
      testingCenter: 'Online Proctored via PSI with one free retake'
    },
    officialProviderUrl: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/',
    preparationRoadmap: [
      {
        step: 1,
        title: 'Kubernetes Architecture & Kubeadm',
        duration: '2 Weeks',
        topics: ['Control plane components: kube-apiserver, etcd, kube-scheduler', 'Provisioning multi-node cluster using kubeadm', 'etcdctl snapshot save & restore']
      },
      {
        step: 2,
        title: 'Workloads, Scheduling & Storage',
        duration: '2 Weeks',
        topics: ['Rolling updates, rollbacks, initContainers', 'NodeAffinity, Taints and Tolerations', 'PV/PVC dynamic provisioning with NFS/CSI']
      },
      {
        step: 3,
        title: 'CNI Networking & Ingress Controllers',
        duration: '2 Weeks',
        topics: ['ClusterIP, NodePort, LoadBalancer services', 'Ingress resources with path-based routing', 'NetworkPolicy ingress/egress CIDR isolation']
      },
      {
        step: 4,
        title: 'Troubleshooting & Speed Drills',
        duration: '2 Weeks',
        topics: ['journalctl -u kubelet debugging, broken certificates', 'Master kubectl imperative commands for maximum test speed']
      }
    ],
    status: 'active',
    isFeatured: true,
    stockCount: 16,
    availableRegions: ['Global', 'India']
  }
];
