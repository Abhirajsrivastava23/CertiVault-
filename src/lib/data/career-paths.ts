export interface CareerPath {
  id: string;
  slug: string;
  title: string;
  targetRole: string;
  salaryRangeInr: string;
  industryDemand: string;
  description: string;
  iconName: string;
  skillsNeeded: string[];
  stages: {
    stage: string;
    level: string;
    certificationSlugs: string[];
    description: string;
  }[];
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'path-cloud-architect',
    slug: 'cloud-solutions-architect',
    title: 'Enterprise Cloud Solutions Architect',
    targetRole: 'Lead Cloud Solutions Architect',
    salaryRangeInr: '₹16,00,000 – ₹42,00,000 / year',
    industryDemand: 'Extremely High (Over 180,000 cloud architecture openings across India & APAC)',
    description: 'Transform from a systems administrator or developer into an elite solutions architect capable of designing multi-region, resilient, cost-efficient, and secure enterprise infrastructure.',
    iconName: 'Cloud',
    skillsNeeded: [
      'High Availability & Disaster Recovery Topology Design',
      'Virtual Private Clouds (VPCs), Subnetting & Peering',
      'Cost Optimization & Cloud Financial Management (FinOps)',
      'Serverless Architectures (AWS Lambda, Azure Functions)',
      'Security Posture & Multi-tier Compliance'
    ],
    stages: [
      {
        stage: 'Stage 1: Foundational Cloud Literacy',
        level: 'Beginner',
        certificationSlugs: ['microsoft-azure-fundamentals-az-900', 'aws-certified-cloud-practitioner-clf-c02'],
        description: 'Understand cloud economics, shared responsibility, core storage, compute, and security concepts.'
      },
      {
        stage: 'Stage 2: Core Architecture & Administration',
        level: 'Intermediate',
        certificationSlugs: ['aws-certified-solutions-architect-associate-saa-c03', 'microsoft-azure-administrator-az-104'],
        description: 'Master practical design of resilient workloads, IAM governance, container instances, and virtual networks.'
      },
      {
        stage: 'Stage 3: Advanced Enterprise Design',
        level: 'Advanced',
        certificationSlugs: ['microsoft-azure-solutions-architect-az-305', 'google-cloud-professional-cloud-architect-pca'],
        description: 'Design hybrid multi-cloud systems, enterprise landing zones, zero-downtime database replication, and business continuity.'
      }
    ]
  },
  {
    id: 'path-cybersecurity-defense',
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Defense & SOC Analyst',
    targetRole: 'Security Operations Center (SOC) Specialist',
    salaryRangeInr: '₹8,00,000 – ₹26,00,000 / year',
    industryDemand: 'Critical (Global cybersecurity workforce deficit of 4M+ professionals)',
    description: 'Defend corporate infrastructure against ransomware, advanced persistent threats (APTs), and perimeter breaches with hands-on security engineering and compliance.',
    iconName: 'ShieldCheck',
    skillsNeeded: [
      'SIEM / EDR Operations & Log Correlation',
      'Zero Trust Network Access & Identity Security',
      'Threat Intelligence & MITRE ATT&CK Framework',
      'Vulnerability Scanning & Penetration Testing Basics',
      'Incident Response Playbooks & Forensics'
    ],
    stages: [
      {
        stage: 'Stage 1: Networking Foundations',
        level: 'Beginner to Intermediate',
        certificationSlugs: ['comptia-network-plus-n10-008', 'cisco-certified-network-associate-ccna-200-301'],
        description: 'Master OSI layer fundamentals, TCP/IP handshakes, packet headers, VLANs, and firewall ACLs.'
      },
      {
        stage: 'Stage 2: Core Cyber Defense',
        level: 'Intermediate',
        certificationSlugs: ['comptia-security-plus-sy0-701'],
        description: 'Establish deep competence across identity management, cryptographic algorithms, vulnerability assessment, and zero-trust perimeter defense.'
      }
    ]
  },
  {
    id: 'path-devops-platform',
    slug: 'devops-platform-engineer',
    title: 'DevOps & Cloud Platform Engineer',
    targetRole: 'Site Reliability Engineer (SRE) / DevOps Architect',
    salaryRangeInr: '₹14,00,000 – ₹38,00,000 / year',
    industryDemand: 'Very High (Crucial competency for engineering teams shipping modern microservices)',
    description: 'Bridge software engineering and operational stability. Master continuous integration/continuous delivery (CI/CD), Kubernetes orchestration, and cloud automation.',
    iconName: 'GitBranch',
    skillsNeeded: [
      'Container Orchestration with Kubernetes & Docker',
      'Infrastructure as Code (Terraform, Bicep, CloudFormation)',
      'Automated CI/CD Pipelines (GitHub Actions, GitLab CI)',
      'Observability (Prometheus, Grafana, OpenTelemetry)',
      'Linux Kernel & Network Troubleshooting'
    ],
    stages: [
      {
        stage: 'Stage 1: Cloud Application Development',
        level: 'Intermediate',
        certificationSlugs: ['aws-certified-developer-associate-dva-c02', 'google-cloud-associate-cloud-engineer-ace'],
        description: 'Build and deploy containerized, serverless applications with managed databases and API gateways.'
      },
      {
        stage: 'Stage 2: Production Kubernetes Mastery',
        level: 'Advanced',
        certificationSlugs: ['certified-kubernetes-administrator-cka'],
        description: 'Deploy, configure, network, secure, and troubleshoot production multi-node Kubernetes clusters.'
      }
    ]
  },
  {
    id: 'path-enterprise-networking',
    slug: 'enterprise-network-engineer',
    title: 'Enterprise Network & Infrastructure Engineer',
    targetRole: 'Senior Network Operations Engineer',
    salaryRangeInr: '₹7,00,000 – ₹22,00,000 / year',
    industryDemand: 'High & Resilient (Essential for telecom, financial institutions, datacenters, and enterprise campuses)',
    description: 'Design and support resilient enterprise backbones, high-speed switching fabrics, dynamic routing, SD-WAN, and automated network operations.',
    iconName: 'Network',
    skillsNeeded: [
      'OSPF, BGP, and Static Route Engineering',
      'VLANs, 802.1Q Trunking, Spanning Tree (RSTP/MSTP)',
      'Network Automation with Python, REST APIs & Netmiko',
      'VPN Tunnels (IPsec, SSL, DMVPN)',
      'Traffic Shaping, QoS & Packet Analysis'
    ],
    stages: [
      {
        stage: 'Stage 1: Enterprise Switching & Routing',
        level: 'Intermediate',
        certificationSlugs: ['cisco-certified-network-associate-ccna-200-301'],
        description: 'Hands-on routing table configuration, VLAN segmentation, ACL filtering, and Cisco IOS mastery.'
      },
      {
        stage: 'Stage 2: Hyperconverged Datacenter Virtualization',
        level: 'Intermediate to Advanced',
        certificationSlugs: ['nutanix-certified-professional-multicloud-infrastructure-ncp-mci'],
        description: 'Connect enterprise campus networks with modern software-defined storage and Nutanix HCI datacenters.'
      }
    ]
  }
];
