-- CertiVault Seed Data: Providers, Categories, Certifications, Skills, Career Paths, and Sample Authorized Vouchers

-- 1. PROVIDERS
INSERT INTO public.certification_providers (id, slug, name, short_name, website_url, description, display_order)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'aws', 'Amazon Web Services', 'AWS', 'https://aws.amazon.com/certification/', 'Industry-leading cloud platform offering globally recognized certifications across architecture, operations, development, and specialty domains.', 1),
  ('a1000000-0000-0000-0000-000000000002', 'microsoft', 'Microsoft', 'Azure', 'https://learn.microsoft.com/en-us/credentials/', 'Enterprise-focused credentials validating expertise in Microsoft Azure cloud infrastructure, AI solutions, security, and data platforms.', 2),
  ('a1000000-0000-0000-0000-000000000003', 'google-cloud', 'Google Cloud', 'GCP', 'https://cloud.google.com/learn/certification', 'High-impact certifications emphasizing cloud architecture, data engineering, modern DevOps, and scalable Google infrastructure.', 3),
  ('a1000000-0000-0000-0000-000000000004', 'cisco', 'Cisco Systems', 'Cisco', 'https://www.cisco.com/site/us/en/learn/training-certifications/index.html', 'The gold standard in enterprise networking, routing, switching, security operations, and digital infrastructure.', 4),
  ('a1000000-0000-0000-0000-000000000005', 'comptia', 'CompTIA', 'CompTIA', 'https://www.comptia.org/certifications', 'Vendor-neutral baseline certifications required by major defense, corporate IT, and cybersecurity organizations worldwide.', 5),
  ('a1000000-0000-0000-0000-000000000006', 'nutanix', 'Nutanix', 'Nutanix', 'https://www.nutanix.com/support-services/training-certification', 'Pioneers in hyperconverged infrastructure (HCI), enterprise virtualization, and hybrid multicloud management.', 6),
  ('a1000000-0000-0000-0000-000000000007', 'hashicorp', 'HashiCorp', 'HashiCorp', 'https://www.hashicorp.com/certification', 'Infrastructure-as-code and cloud automation benchmarks including Terraform and Vault Associate credentials.', 7),
  ('a1000000-0000-0000-0000-000000000008', 'linux-foundation', 'The Linux Foundation', 'Linux Fdn', 'https://training.linuxfoundation.org/certification/', 'Open-source and container standards including Certified Kubernetes Administrator (CKA) and Application Developer (CKAD).', 8)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website_url = EXCLUDED.website_url;

-- 2. CATEGORIES
INSERT INTO public.certification_categories (id, slug, name, description, icon_name, display_order)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'cloud-computing', 'Cloud Computing', 'Master hyperscale cloud infrastructure, multi-cloud strategy, compute, storage, and serverless architectures.', 'Cloud', 1),
  ('c1000000-0000-0000-0000-000000000002', 'cybersecurity', 'Cybersecurity', 'Defend enterprise perimeters, master threat intelligence, security engineering, compliance, and SOC operations.', 'ShieldCheck', 2),
  ('c1000000-0000-0000-0000-000000000003', 'artificial-intelligence', 'Artificial Intelligence', 'Implement generative AI solutions, prompt engineering, cognitive services, and AI ethics.', 'Sparkles', 3),
  ('c1000000-0000-0000-0000-000000000004', 'devops', 'DevOps & Site Reliability', 'Build robust CI/CD pipelines, container orchestration, Kubernetes workloads, and infrastructure automation.', 'Workflow', 4),
  ('c1000000-0000-0000-0000-000000000005', 'networking', 'Networking & Telephony', 'Design resilient enterprise LAN/WAN topologies, routing protocols, SD-WAN, and zero-trust network access.', 'Network', 5),
  ('c1000000-0000-0000-0000-000000000006', 'data-science', 'Data Science & Analytics', 'Architect scalable data lakes, streaming ETL pipelines, distributed query engines, and analytics workflows.', 'DatabaseZap', 6),
  ('c1000000-0000-0000-0000-000000000007', 'it-administration', 'IT Administration & Support', 'Core IT foundations, operating systems, hardware troubleshooting, identity management, and helpdesk operations.', 'Laptop', 7),
  ('c1000000-0000-0000-0000-000000000008', 'virtualization', 'Virtualization & HCI', 'Hyperconverged infrastructure, private cloud clusters, SAN/NAS storage virtualization, and hypervisors.', 'Server', 8),
  ('c1000000-0000-0000-0000-000000000009', 'database-management', 'Database Management', 'Design, optimize, and administer relational, NoSQL, and distributed transactional database systems.', 'Database', 9),
  ('c1000000-0000-0000-0000-000000000010', 'machine-learning', 'Machine Learning', 'Train, evaluate, fine-tune, and deploy predictive ML models and neural architectures in production environments.', 'BrainCircuit', 10)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- 3. CERTIFICATIONS
INSERT INTO public.certifications (
  id, provider_id, category_id, slug, name, exam_code, level,
  short_description, overview, purpose,
  prerequisites, target_audience, career_opportunities,
  official_exam_details, official_provider_url, preparation_roadmap,
  voucher_price_inr, retail_price_inr, validity_days, restrictions,
  stock_status, is_featured, is_active
) VALUES
  -- AWS SAA-C03
  (
    'e1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'aws-certified-solutions-architect-associate',
    'AWS Certified Solutions Architect – Associate',
    'SAA-C03',
    'Associate',
    'Showcases knowledge of how to design resilient, high-performing, secure, and cost-optimized architectures on AWS.',
    'The AWS Certified Solutions Architect - Associate (SAA-C03) examination is intended for individuals who perform a solutions architect role and have one or more years of hands-on experience designing available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.',
    'Validate your ability to design and implement distributed systems on AWS that optimize cost, security, resilience, and operational excellence.',
    ARRAY['Hands-on experience with compute, networking, storage, and database AWS services', 'Familiarity with the AWS Well-Architected Framework', 'Basic understanding of security controls and compliance'],
    ARRAY['Solutions Architects', 'Cloud Engineers', 'Systems Administrators', 'DevOps Engineers', 'Software Developers migrating to cloud'],
    ARRAY['Cloud Solutions Architect (₹12 - 28 LPA)', 'AWS Infrastructure Engineer (₹9 - 22 LPA)', 'Technical Account Manager', 'Cloud Consultant'],
    '{"duration_minutes": 130, "questions_count": 65, "passing_score": 720, "max_score": 1000, "format": "Multiple choice and multiple response", "delivery_method": "Pearson VUE test center or online proctored"}'::jsonb,
    'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    '[
      {"phase": "1. Foundation", "description": "Review IAM, VPC networking, EC2 compute, and S3 storage basics.", "duration_weeks": 2},
      {"phase": "2. High Availability & Data", "description": "Master RDS, DynamoDB, Auto Scaling, Elastic Load Balancing, and Route 53.", "duration_weeks": 3},
      {"phase": "3. Decoupling & Serverless", "description": "Explore SQS, SNS, EventBridge, Lambda, API Gateway, and CloudFront caching.", "duration_weeks": 2},
      {"phase": "4. Well-Architected Deep Dive", "description": "Practice architectural tradeoffs across Cost, Performance, Reliability, and Security.", "duration_weeks": 2},
      {"phase": "5. Practice Exams", "description": "Take timed mock tests scoring 85%+ consistently.", "duration_weeks": 1}
    ]'::jsonb,
    1299900, -- ₹12,999 (in paise)
    1499900, -- Retail ~₹15,000 ($150 USD + GST)
    180,
    'Authorized voucher valid at all Pearson VUE test centers in India and online proctored exams.',
    'in_stock',
    true,
    true
  ),

  -- AWS Cloud Practitioner CLF-C02
  (
    'e1000000-0000-0000-0000-000000000002',
    'a1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'aws-certified-cloud-practitioner',
    'AWS Certified Cloud Practitioner',
    'CLF-C02',
    'Foundational',
    'Validates overall understanding of the AWS Cloud platform, core services, security, pricing, and billing models.',
    'AWS Certified Cloud Practitioner validates foundational, high-level understanding of AWS Cloud, services, and terminology. This is an ideal starting point for anyone looking to step into cloud computing or business roles interfacing with technical teams.',
    'Provide non-technical and entry-level IT professionals with confirmed fluency in cloud economics, security, and shared responsibility.',
    ARRAY['No prior cloud experience required', 'General IT literacy is helpful'],
    ARRAY['Students & Fresh Graduates', 'IT Project Managers', 'Sales and Marketing specialists in tech', 'Junior System Admins'],
    ARRAY['Cloud Support Specialist (₹4 - 8 LPA)', 'Technical Sales Representative', 'Junior Cloud Analyst'],
    '{"duration_minutes": 90, "questions_count": 65, "passing_score": 700, "max_score": 1000, "format": "Multiple choice", "delivery_method": "Pearson VUE test center or online proctored"}'::jsonb,
    'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    '[
      {"phase": "1. Cloud Concepts", "description": "Understand cloud advantages, economics, and deployment models.", "duration_weeks": 1},
      {"phase": "2. Security & Compliance", "description": "Learn Shared Responsibility Model, AWS IAM, KMS, and Shield.", "duration_weeks": 1},
      {"phase": "3. Core Technology", "description": "Identify compute (EC2, Lambda), storage (S3, EBS), and networking (VPC).", "duration_weeks": 1},
      {"phase": "4. Billing & Pricing", "description": "Review Cost Explorer, Budgets, Organizations, and Pricing Calculator.", "duration_weeks": 1}
    ]'::jsonb,
    849900, -- ₹8,499
    999900, -- Retail ~₹10,000 ($100 USD + GST)
    180,
    'Authorized voucher redeemable via Pearson VUE for India test centers and OnVUE proctored exams.',
    'in_stock',
    true,
    true
  ),

  -- Microsoft AZ-104
  (
    'e1000000-0000-0000-0000-000000000003',
    'a1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000001',
    'microsoft-certified-azure-administrator-associate',
    'Microsoft Certified: Azure Administrator Associate',
    'AZ-104',
    'Associate',
    'Proves subject matter expertise in implementing, managing, and monitoring an organization’s Microsoft Azure environment.',
    'Candidates for the Azure Administrator Associate certification should have subject matter expertise in implementing, managing, and monitoring an organization’s Microsoft Azure environment, including virtual networks, storage, compute, identity, security, and governance.',
    'Demonstrate proficiency in managing Azure identities, storage, compute resources, virtual networks, and monitoring tools.',
    ARRAY['Understanding of on-premises virtualization technologies', 'Basic networking including TCP/IP, DNS, VPNs, and firewalls', 'Experience with Azure Portal, PowerShell, and Azure CLI'],
    ARRAY['Azure Administrators', 'System Administrators', 'Infrastructure Engineers', 'Enterprise Cloud Specialists'],
    ARRAY['Azure Cloud Administrator (₹8 - 18 LPA)', 'Cloud Infrastructure Engineer (₹10 - 24 LPA)', 'Enterprise Systems Engineer'],
    '{"duration_minutes": 100, "questions_count": 55, "passing_score": 700, "max_score": 1000, "format": "Multiple choice, drag and drop, case studies", "delivery_method": "Pearson VUE test center or online proctored"}'::jsonb,
    'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/',
    '[
      {"phase": "1. Manage Azure Identities & Governance", "description": "Configure Microsoft Entra ID, RBAC, Subscriptions, and Policies.", "duration_weeks": 2},
      {"phase": "2. Implement & Manage Storage", "description": "Configure Storage Accounts, Blob storage tiers, Azure Files, and Azure Backup.", "duration_weeks": 2},
      {"phase": "3. Deploy & Manage Azure Compute", "description": "Deploy VMs, Containers (ACI/AKS basics), and Azure App Service.", "duration_weeks": 2},
      {"phase": "4. Configure Virtual Networking", "description": "Configure VNets, Subnets, NSGs, Azure Bastion, VPN Gateway, and Peering.", "duration_weeks": 3},
      {"phase": "5. Monitor & Maintain Resources", "description": "Configure Azure Monitor, Log Analytics alerts, and Network Watcher.", "duration_weeks": 1}
    ]'::jsonb,
    499900, -- ₹4,999 (Special India Microsoft Associate Voucher pricing)
    599900,
    180,
    'Authorized Microsoft exam voucher valid for candidate scheduling on Pearson VUE India.',
    'in_stock',
    true,
    true
  ),

  -- Microsoft AZ-900
  (
    'e1000000-0000-0000-0000-000000000004',
    'a1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000001',
    'microsoft-certified-azure-fundamentals',
    'Microsoft Certified: Azure Fundamentals',
    'AZ-900',
    'Foundational',
    'Validates foundational knowledge of cloud concepts and Microsoft Azure services, architecture, and governance.',
    'This certification is an opportunity to prove knowledge of cloud concepts, Azure services, Azure workloads, security and privacy in Azure, as well as Azure pricing and support.',
    'Establish foundational competence in Microsoft Azure cloud ecosystem, pricing, SLAs, and security architectures.',
    ARRAY['No prior prerequisites. Suitable for beginners.'],
    ARRAY['Beginners to Cloud', 'IT sales & procurement', 'Students', 'Business Decision Makers'],
    ARRAY['Junior Cloud Associate (₹4 - 7 LPA)', 'IT Support Specialist', 'Technical Sales Executive'],
    '{"duration_minutes": 60, "questions_count": 45, "passing_score": 700, "max_score": 1000, "format": "Multiple choice", "delivery_method": "Pearson VUE"}'::jsonb,
    'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    '[
      {"phase": "1. Cloud Concepts", "description": "IaaS vs PaaS vs SaaS, High Availability, Fault Tolerance, Elasticity.", "duration_weeks": 1},
      {"phase": "2. Azure Architecture & Services", "description": "Regions, Availability Zones, Resource Groups, Compute, Storage, Networking.", "duration_weeks": 1},
      {"phase": "3. Azure Management & Governance", "description": "Cost Management, Azure Policy, RBAC, Microsoft Purview.", "duration_weeks": 1}
    ]'::jsonb,
    349900, -- ₹3,499
    429900,
    180,
    'Authorized Microsoft Fundamentals voucher for Pearson VUE.',
    'in_stock',
    true,
    true
  ),

  -- CompTIA Security+ SY0-701
  (
    'e1000000-0000-0000-0000-000000000005',
    'a1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000002',
    'comptia-security-plus',
    'CompTIA Security+',
    'SY0-701',
    'Associate',
    'The baseline cybersecurity credential proving core knowledge required of any cybersecurity role.',
    'CompTIA Security+ validates the baseline skills necessary to perform core security functions and pursue an IT cybersecurity career. It emphasizes hands-on practical skills to ensure the security professional is better prepared to solve a wider variety of today’s complex issues.',
    'Certify baseline technical abilities to secure network devices, manage identity & access, assess vulnerabilities, and respond to incidents.',
    ARRAY['CompTIA Network+ or equivalent knowledge', 'Minimum of 2 years in IT administration with a security focus recommended'],
    ARRAY['SOC Analysts', 'Cybersecurity Specialists', 'Systems Administrators', 'Network Engineers', 'Security Consultants'],
    ARRAY['Junior SOC Analyst (₹6 - 14 LPA)', 'Information Security Analyst (₹8 - 18 LPA)', 'Security Administrator'],
    '{"duration_minutes": 90, "questions_count": 90, "passing_score": 750, "max_score": 900, "format": "Multiple choice and performance-based questions (PBQs)", "delivery_method": "Pearson VUE test center or OnVUE"}'::jsonb,
    'https://www.comptia.org/certifications/security',
    '[
      {"phase": "1. General Security Concepts", "description": "Security controls, CIA triad, Zero Trust architecture, cryptographic primitives.", "duration_weeks": 2},
      {"phase": "2. Threats, Vulnerabilities & Mitigations", "description": "Malware, social engineering, vulnerability scanning, threat intelligence feeds.", "duration_weeks": 2},
      {"phase": "3. Security Architecture", "description": "Cloud security models, secure data center architecture, resilience & backup strategies.", "duration_weeks": 2},
      {"phase": "4. Security Operations", "description": "Baseline monitoring, SIEM / EDR, firewall rules, incident response playbook.", "duration_weeks": 2},
      {"phase": "5. Security Program Management & Oversight", "description": "Compliance, risk assessment, vendor risk, privacy regulations.", "duration_weeks": 1}
    ]'::jsonb,
    2199900, -- ₹21,999
    2499900, -- Retail ~$250+
    365,
    'Official CompTIA voucher with 12 months validity. Redeemable globally on Pearson VUE.',
    'in_stock',
    true,
    true
  ),

  -- Cisco CCNA 200-301
  (
    'e1000000-0000-0000-0000-000000000006',
    'a1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000005',
    'cisco-certified-network-associate',
    'Cisco Certified Network Associate (CCNA)',
    '200-301',
    'Associate',
    'Validates foundational network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation.',
    'The Cisco CCNA certification proves you have what it takes to navigate the ever-changing landscape of IT. The CCNA exam covers networking fundamentals, IP services, security fundamentals, automation and programmability.',
    'Establish foundational mastery over enterprise switching, OSPF routing, wireless LAN controllers, network security, and network automation with Python/REST APIs.',
    ARRAY['Basic computer literacy and IP addressing knowledge', 'One or more years of experience implementing and administering Cisco solutions recommended'],
    ARRAY['Network Administrators', 'NOC Engineers', 'Field Engineers', 'Infrastructure Specialists'],
    ARRAY['Network Support Engineer (₹5 - 12 LPA)', 'NOC Analyst (₹6 - 11 LPA)', 'Cisco Systems Administrator'],
    '{"duration_minutes": 120, "questions_count": 100, "passing_score": 825, "max_score": 1000, "format": "Multiple choice, drag-and-drop, interactive network simulation labs", "delivery_method": "Pearson VUE"}'::jsonb,
    'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html',
    '[
      {"phase": "1. Network Fundamentals", "description": "OSI model, TCP/UDP, IPv4 subnetting & IPv6 fundamentals, cabling.", "duration_weeks": 3},
      {"phase": "2. Network Access", "description": "VLANs, 802.1Q trunking, EtherChannel, Spanning Tree Protocol (STP), Wireless architectures.", "duration_weeks": 3},
      {"phase": "3. IP Connectivity", "description": "Routing tables, static routes, single-area OSPFv2, first hop redundancy.", "duration_weeks": 3},
      {"phase": "4. IP Services & Security", "description": "NAT, NTP, DHCP, DNS, SNMP, SSH, Access Control Lists (ACLs), Port Security.", "duration_weeks": 2},
      {"phase": "5. Automation & Programmability", "description": "REST APIs, JSON, Puppet, Chef, Ansible, DNA Center.", "duration_weeks": 2}
    ]'::jsonb,
    2249900, -- ₹22,499
    2599900,
    180,
    'Authorized Cisco exam voucher. Valid at Pearson VUE testing centers or online testing in India.',
    'in_stock',
    true,
    true
  ),

  -- Google Cloud Associate Cloud Engineer (ACE)
  (
    'e1000000-0000-0000-0000-000000000007',
    'a1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000001',
    'google-cloud-associate-cloud-engineer',
    'Google Cloud Associate Cloud Engineer',
    'ACE',
    'Associate',
    'Validates ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud.',
    'An Associate Cloud Engineer deploys applications, monitors operations, and manages enterprise solutions. They use Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.',
    'Demonstrate practical skills in Google Compute Engine, Google Kubernetes Engine (GKE), Cloud Storage, IAM roles, and Cloud Monitoring.',
    ARRAY['6+ months hands-on experience with Google Cloud recommended', 'Basic understanding of Linux command-line and networking'],
    ARRAY['Cloud Engineers', 'Solutions Architects', 'DevOps Practitioners', 'Systems Operators'],
    ARRAY['Google Cloud Engineer (₹8 - 20 LPA)', 'DevOps Specialist (₹10 - 24 LPA)', 'Site Reliability Engineer'],
    '{"duration_minutes": 120, "questions_count": 50, "passing_score": 70, "max_score": 100, "format": "Multiple choice and multiple select", "delivery_method": "Kryterion testing center or online proctored"}'::jsonb,
    'https://cloud.google.com/learn/certification/cloud-engineer',
    '[
      {"phase": "1. Setting up Cloud Solution Environment", "description": "Projects, IAM service accounts, Billing accounts, gcloud CLI configuration.", "duration_weeks": 2},
      {"phase": "2. Planning & Configuring Solutions", "description": "Compute Engine sizing, GKE cluster creation, Cloud Run, Cloud Storage lifecycle.", "duration_weeks": 3},
      {"phase": "3. Deploying & Implementing", "description": "Deploying containerized apps, VPC networks, firewall rules, Cloud SQL instances.", "duration_weeks": 3},
      {"phase": "4. Operations & Access Management", "description": "Cloud Logging, Cloud Monitoring metrics, Alerts, IAM role bindings.", "duration_weeks": 2}
    ]'::jsonb,
    1149900, -- ₹11,499
    1349900,
    180,
    'Authorized Google Cloud Kryterion voucher for India and global test delivery.',
    'in_stock',
    true,
    true
  ),

  -- Nutanix NCP-MCI
  (
    'e1000000-0000-0000-0000-000000000008',
    'a1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000008',
    'nutanix-certified-professional-multicloud-infrastructure',
    'Nutanix Certified Professional - Multicloud Infrastructure (NCP-MCI)',
    'NCP-MCI',
    'Professional',
    'Proves skills and knowledge in deploying, administering, and troubleshooting Nutanix AOS nodes, clusters, and Prism Central in the datacenter.',
    'The Nutanix Certified Professional - Multicloud Infrastructure (NCP-MCI) certification tests your ability to configure, manage, and monitor Nutanix AOS clusters, Prism Element, Prism Central, storage pools, containers, and AHV virtual machines.',
    'Verify hands-on expertise in enterprise hyperconverged infrastructure, distributed storage, VM lifecycle management, and disaster recovery.',
    ARRAY['Experience administering virtualized data centers', 'Familiarity with storage architectures (SAN/NAS) and networking concepts'],
    ARRAY['Datacenter Administrators', 'Virtualization Engineers', 'Storage Engineers', 'Nutanix Partners'],
    ARRAY['Virtualization Specialist (₹10 - 22 LPA)', 'HCI Infrastructure Architect (₹14 - 30 LPA)', 'Senior Datacenter Engineer'],
    '{"duration_minutes": 120, "questions_count": 75, "passing_score": 3000, "max_score": 6000, "format": "Multiple choice", "delivery_method": "Remote proctored via PSI / Webassessor"}'::jsonb,
    'https://www.nutanix.com/support-services/training-certification/certifications/ncp-mci',
    '[
      {"phase": "1. Nutanix Architecture Overview", "description": "AOS architecture, distributed storage fabric, metadata rings, cluster components.", "duration_weeks": 2},
      {"phase": "2. Cluster Configuration & Management", "description": "Prism Central setup, storage containers, deduplication, compression, erasure coding.", "duration_weeks": 3},
      {"phase": "3. AHV VM Administration", "description": "Deploying VMs, IP address management (IPAM), VM high availability, live migrations.", "duration_weeks": 2},
      {"phase": "4. Data Protection & Troubleshooting", "description": "Protection domains, async/sync replication, cluster health checks via NCC and CLI.", "duration_weeks": 2}
    ]'::jsonb,
    1499900, -- ₹14,999
    1799900,
    180,
    'Authorized Nutanix exam voucher valid for testing in India and online.',
    'in_stock',
    true,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  exam_code = EXCLUDED.exam_code,
  level = EXCLUDED.level,
  short_description = EXCLUDED.short_description,
  voucher_price_inr = EXCLUDED.voucher_price_inr,
  retail_price_inr = EXCLUDED.retail_price_inr;

-- 4. CAREER PATHS
INSERT INTO public.career_paths (id, slug, title, description, target_role, salary_range_inr, industry_demand, icon_name)
VALUES
  (
    'p1000000-0000-0000-0000-000000000001',
    'cloud-architect-path',
    'Enterprise Cloud Solutions Architect',
    'From cloud fundamentals to designing enterprise-scale, resilient, cost-effective multicloud architectures.',
    'Lead Cloud Architect / Principal Architect',
    '₹18 - 45 LPA',
    'Extremely High (Top 3 most sought-after tech competencies in India and globally)',
    'Cloud'
  ),
  (
    'p1000000-0000-0000-0000-000000000002',
    'cybersecurity-analyst-path',
    'Cybersecurity Defender & SOC Specialist',
    'Master defensive cybersecurity, vulnerability management, security compliance, and rapid incident response.',
    'Security Operations Center (SOC) Lead / InfoSec Engineer',
    '₹10 - 30 LPA',
    'Critical (Global cybersecurity talent shortage exceeding 4 million professionals)',
    'ShieldCheck'
  ),
  (
    'p1000000-0000-0000-0000-000000000003',
    'network-infrastructure-path',
    'Enterprise Network Infrastructure Engineer',
    'Master physical and software-defined networking, routing, switching, automated network management, and SD-WAN.',
    'Senior Network Engineer / Network Architect',
    '₹9 - 25 LPA',
    'Stable & High (Core requirement across telecom, ISP, BFSI, and cloud data centers)',
    'Network'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- 5. CAREER RECOMMENDATIONS (Certifications sequence in a career path)
INSERT INTO public.career_recommendations (career_path_id, certification_id, step_order, stage_name, reason)
VALUES
  ('p1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000002', 1, 'Stage 1: Cloud Literacy', 'Build a crystal-clear understanding of cloud computing economics, global infrastructure, and shared responsibility.'),
  ('p1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 2, 'Stage 2: Core Architecture', 'Design resilient, scalable, fault-tolerant production environments using compute, storage, and networking.'),
  ('p1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000003', 3, 'Stage 3: Multi-Cloud Administration', 'Master Microsoft Azure to manage hybrid multi-cloud enterprise deployments.'),

  ('p1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000005', 1, 'Stage 1: Core Security Defense', 'Establish baseline defense capabilities across identity, hardware security, encryption, and protocols.'),
  ('p1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000006', 2, 'Stage 2: Network Defense', 'Understand layer 2/3 traffic flows, ACLs, firewall architectures, and perimeter inspection.')
ON CONFLICT DO NOTHING;

-- 6. SAMPLE AUTHORIZED VOUCHER INVENTORY (For testing secure allocation & delivery)
INSERT INTO private.voucher_inventory (
  certification_id, voucher_code, expiry_date, region, redemption_instructions, supplier_reference, status
) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'AWS-SAA-2026-X982-A741', (CURRENT_DATE + INTERVAL '150 days')::DATE, 'India / South Asia', 'Log in to aws.training/certification. Select Schedule with Pearson VUE. On the checkout screen, enter this voucher code in the Promo Code field.', 'DIST-INGRAM-BATCH-01', 'available'),
  ('e1000000-0000-0000-0000-000000000001', 'AWS-SAA-2026-B419-M602', (CURRENT_DATE + INTERVAL '160 days')::DATE, 'India / South Asia', 'Log in to aws.training/certification. Select Schedule with Pearson VUE. On the checkout screen, enter this voucher code in the Promo Code field.', 'DIST-INGRAM-BATCH-01', 'available'),
  ('e1000000-0000-0000-0000-000000000002', 'AWS-CLF-2026-Q114-K889', (CURRENT_DATE + INTERVAL '170 days')::DATE, 'India / South Asia', 'Go to aws.training/certification, choose CLF-C02, apply voucher code at Pearson VUE checkout.', 'DIST-REDINGTON-BATCH-04', 'available'),
  ('e1000000-0000-0000-0000-000000000003', 'MSFT-AZ104-2026-T830-W441', (CURRENT_DATE + INTERVAL '180 days')::DATE, 'India', 'Visit learn.microsoft.com/credentials, find AZ-104, click Schedule Exam. On Pearson VUE payment page, enter voucher code.', 'MS-DIRECT-PARTNER-09', 'available'),
  ('e1000000-0000-0000-0000-000000000004', 'MSFT-AZ900-2026-C209-P110', (CURRENT_DATE + INTERVAL '180 days')::DATE, 'India', 'Visit learn.microsoft.com/credentials, find AZ-900, click Schedule Exam. Apply voucher code on Pearson VUE payment page.', 'MS-DIRECT-PARTNER-09', 'available'),
  ('e1000000-0000-0000-0000-000000000005', 'COMP-SEC-2026-V901-L772', (CURRENT_DATE + INTERVAL '240 days')::DATE, 'Global', 'Log in to pearsonvue.com/comptia, choose SY0-701, enter voucher code in payment details section.', 'COMPTIA-GLOBAL-AUTH-02', 'available'),
  ('e1000000-0000-0000-0000-000000000006', 'CSCO-CCNA-2026-R440-J318', (CURRENT_DATE + INTERVAL '180 days')::DATE, 'India', 'Go to pearsonvue.com/cisco, select 200-301 CCNA, apply voucher code under Vouchers/Promotion Codes.', 'CISCO-LEARNING-NET-11', 'available'),
  ('e1000000-0000-0000-0000-000000000007', 'GCP-ACE-2026-K732-F204', (CURRENT_DATE + INTERVAL '180 days')::DATE, 'Global', 'Log in to webassessor.com/googlecloud, select Associate Cloud Engineer, apply voucher code at checkout.', 'GCP-AUTH-PARTNER-05', 'available'),
  ('e1000000-0000-0000-0000-000000000008', 'NTNX-MCI-2026-P650-D199', (CURRENT_DATE + INTERVAL '180 days')::DATE, 'Global', 'Log in to Nutanix certification portal, schedule NCP-MCI with Webassessor, enter voucher code.', 'NUTANIX-PARTNER-01', 'available')
ON CONFLICT (voucher_code) DO NOTHING;
