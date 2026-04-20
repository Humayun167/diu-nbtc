import { seminarBanner } from '@/assets/assets';
// Re-export types from schemas for backward compatibility
export type { EventItem, PublicationItem, CommitteeItem } from './schemas';

export const STORAGE_KEYS = {
  events: 'nbtc-events',
  publications: 'nbtc-publications',
  facultyCommittee: 'nbtc-faculty-committee',
  studentCommittee: 'nbtc-student-committee',
  exCommittee: 'nbtc-ex-committee',
} as const;

export const defaultEvents: EventItem[] = [
  {
    id: 1,
    title: 'Integrating Nanobiotechnology and AI/ML for Sustainable Agriculture, Healthcare, Energy, and Environmental Management in Bangladesh',
    description: 'A seminar featuring Prof. Dr. M. R. Kabir (Vice Chancellor, DIU) as Chief Guest and Dr. Jamal Uddin (Professor & Founding Director, Center for Nanotechnology, Coppin State University, USA) as Keynote Speaker. Organized by NanoBio Technology Center, supported by Department of CSE.',
    date: '2026-01-21',
    time: '11:00 AM - 1:00 PM',
    location: 'ICH, Daffodil International University, Daffodil Smart City, Dhaka',
    category: 'Seminar',
    image: seminarBanner,
    registrationFee: '200 TK',
    deadline: '2026-01-16',
    includes: ['Certificate', 'Souvenir', 'Lunch'],
  },
  {
    id: 2,
    title: 'Research Collaboration Summit',
    description: 'A platform for researchers, industry partners, and academia to explore collaboration opportunities in bio-nanotechnology.',
    date: '2026-02-20',
    time: '9:00 AM - 6:00 PM',
    location: 'DIU Conference Center',
    attendees: 150,
    category: 'Summit',
  },
  {
    id: 3,
    title: 'Student Research Symposium',
    description: 'Annual symposium showcasing undergraduate and graduate research projects in nanotechnology.',
    date: '2026-03-10',
    time: '10:00 AM - 4:00 PM',
    location: 'DIU Science Building',
    category: 'Symposium',
  },
];

export const defaultPublications: PublicationItem[] = [
  {
    id: 1,
    title: 'Unraveling risk factors and transcriptomic signatures in liver cancer progression and mortality through machine learning and bioinformatics',
    authors: 'NBTC Research Team',
    journal: 'Briefings in Functional Genomics',
    year: 2026,
    type: 'Journal Article',
    doi: '10.1093/bfgp/elaf019',
    abstract: 'Liver cancer (LC) is a leading cause of cancer death, yet molecular mechanisms and risk factors remain poorly understood. This study developed an integrative multi-stage framework combining bioinformatics, machine learning-based feature selection, survival modeling, and network analysis to identify robust biomarkers and pathways involved in LC progression. Differential expression analysis using TCGA data identified prognostic genes and linked risk factor datasets with shared transcriptomic signatures. Network and pathway analyses revealed key oncogenic processes, and independent validation confirmed their significance. Overall, this work provides insights into LC progression and potential targets for clinical investigation.',
  },
  {
    id: 2,
    title: 'MXene-enhanced perovskite solar cells: Unveiling the superior performance of Mo2TiC2 as an advanced electron transport layer',
    authors: 'NBTC Research Team',
    journal: 'Materials Science and Engineering: B',
    year: 2026,
    type: 'Journal Article',
    doi: '10.1016/j.mseb.2025.119077',
    abstract: 'Perovskite solar cells (PSCs) are an emerging thin-film photovoltaic technology with high performance. This study explores the use of Mo2TiC2-MXene as an electron transport layer (ETL) in perovskite solar cell structures simulated via SCAPS-1D. The effects of variations in layer thickness, defect density, donor/acceptor densities, and material parameters were systematically assessed. A structure incorporating Mo2TiC2-MXene ETL exhibited excellent electrical characteristics, including open-circuit voltage (Voc), short-circuit current density (Jsc), fill factor (FF), and power conversion efficiency (PCE). The results underscore the potential of Mo2TiC2-MXene to significantly enhance PSC performance and carrier transport, offering insights toward high-efficiency device design.',
  },
  {
    id: 3,
    title: 'Identification of key candidate genes for ovarian cancer using integrated statistical and machine learning approaches',
    authors: 'NBTC Research Team',
    journal: 'Briefings in Bioinformatics',
    year: 2025,
    type: 'Journal Article',
    doi: '10.1093/bib/bbaf602',
    abstract: 'Ovarian cancer (OC) is a highly lethal malignancy worldwide, necessitating identification of key genes to improve diagnosis and treatment. Three microarray datasets were analyzed with normalization and differential gene expression analysis. Highly discriminative differentially expressed genes (HDDEGs) were identified using support vector machine-based methods, and enrichment analysis was conducted. Network and module analyses revealed 18 central hub genes, 11 hub module genes, and 54 meta-hub genes. Intersection analysis revealed eight shared key genes (FANCD2, BUB1B, BUB1, KIF4A, DTL, NCAPG, KIF20A, UBE2C). Weighted gene co-expression network analysis identified key modules linked to clinical traits, validating the predictive and prognostic significance of these key genes. This integrative approach identifies potential biomarkers and highlights clinical relevance for OC diagnosis and prognosis.',
  },
  {
    id: 4,
    title: 'An empirical study for the early detection of Mpox from skin lesion images using pretrained CNN models leveraging XAI technique',
    authors: 'NBTC Research Team',
    journal: 'Healthcare Technology Letters',
    year: 2025,
    type: 'Journal (Accepted)',
    doi: '',
    abstract: 'This study investigates the early detection of Mpox from skin lesion images using pretrained convolutional neural networks combined with explainable AI (XAI) techniques. The proposed approach enhances diagnostic accuracy while improving model interpretability to support clinical decision-making.',
  },
  {
    id: 5,
    title: 'A High-Performance End-to-End Pipeline for Multilingual License Plate Recognition and Vehicle Classification in Bangladesh',
    authors: 'NBTC Research Team',
    journal: 'International Conference on Intelligent Data-Driven Applications (IDDA)',
    year: 2025,
    type: 'Conference (Accepted)',
    doi: '',
    abstract: 'This paper presents an end-to-end deep learning pipeline for multilingual license plate recognition and vehicle classification tailored to the Bangladeshi context. The system integrates detection, character recognition across multiple scripts, and vehicle type classification to achieve high accuracy and real-time performance.',
  },
  {
    id: 6,
    title: 'PlantLeafNet: A Comparative Study of Deep Learning Models for Money Plant Disease Classification',
    authors: 'NBTC Research Team',
    journal: 'International Conference on Intelligent Data-Driven Applications (IDDA)',
    year: 2025,
    type: 'Conference (Accepted)',
    doi: '',
    abstract: 'This study introduces PlantLeafNet, a deep learning-based framework for money plant disease classification. Multiple convolutional neural network architectures are comparatively analyzed to evaluate classification performance, robustness, and suitability for plant disease diagnosis.',
  },
  {
    id: 7,
    title: 'High-Accuracy 3-Class Cerebral Stroke Detection Using ConvNeXt: An End-to-End Vision Pipeline',
    authors: 'NBTC Research Team',
    journal: 'International Conference on Intelligent Data-Driven Applications (IDDA)',
    year: 2025,
    type: 'Conference (Accepted)',
    doi: '',
    abstract: 'This paper proposes an end-to-end computer vision pipeline for three-class cerebral stroke detection using the ConvNeXt architecture. The model demonstrates high accuracy and robustness, highlighting the effectiveness of modern convolutional networks in medical image analysis.',
  },
];

export const defaultFacultyCommittee: CommitteeItem[] = [
  {
    id: 1,
    name: 'Dr. Mohammad Rahman',
    title: 'Lab Director & Professor',
    role: 'Committee Chair',
    department: 'Department of Biomedical Engineering',
    research: 'Nanomedicine, Drug Delivery, Biosensors',
    email: 'm.rahman@diu.edu.bd',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Dr. Fatima Ahmed',
    title: 'Associate Professor',
    role: 'Vice Chair',
    department: 'Department of Pharmacy',
    research: 'Nanopharmaceuticals, Polymer Nanoparticles',
    email: 'f.ahmed@diu.edu.bd',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Dr. Kamal Hossain',
    title: 'Associate Professor',
    role: 'Research Coordinator',
    department: 'Department of Chemistry',
    research: 'Nanomaterial Synthesis, Green Chemistry',
    email: 'k.hossain@diu.edu.bd',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Dr. Nusrat Jahan',
    title: 'Assistant Professor',
    role: 'Secretary',
    department: 'Department of Biochemistry',
    research: 'Biosensors, Point-of-Care Diagnostics',
    email: 'n.jahan@diu.edu.bd',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
];

export const defaultStudentCommittee: CommitteeItem[] = [
  {
    id: 1,
    name: 'Tanvir Alam',
    title: 'PhD Researcher',
    role: 'President',
    research: 'Gold nanoparticles for cancer therapy',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Sadia Islam',
    title: 'PhD Researcher',
    role: 'Vice President',
    research: 'Electrochemical biosensors',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Rafiq Uddin',
    title: 'Research Assistant',
    role: 'General Secretary',
    research: 'Lipid nanoparticles for drug delivery',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Mithila Akter',
    title: 'MSc Researcher',
    role: 'Treasurer',
    research: 'Antimicrobial nanomaterials',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Arif Hasan',
    title: 'MSc Researcher',
    role: 'Event Coordinator',
    research: 'Quantum dots for imaging',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Nafisa Rahman',
    title: 'BSc Researcher',
    role: 'Communication Lead',
    research: 'Nanoparticle characterization',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
  },
];

export const defaultExCommitteeMembers: CommitteeItem[] = [
  {
    id: 1,
    name: 'Dr. Shahid Malik',
    title: 'Former Lab Director',
    tenure: '2018 - 2022',
    currentPosition: 'Professor, University of Dhaka',
    achievement: 'Established the NBTC foundation',
    image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Dr. Hasina Begum',
    title: 'Former Research Head',
    tenure: '2019 - 2023',
    currentPosition: 'Senior Scientist, BCSIR',
    achievement: 'Led 15+ funded research projects',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Imran Ahmed',
    title: 'Former Student President',
    tenure: '2021 - 2023',
    currentPosition: 'PhD Candidate, MIT',
    achievement: 'Founded student research symposium',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Farzana Khatun',
    title: 'Former Vice President',
    tenure: '2020 - 2022',
    currentPosition: 'Research Fellow, NUS Singapore',
    achievement: 'Initiated international collaborations',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
  },
];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getEvents() {
  return readStorage<EventItem[]>(STORAGE_KEYS.events, defaultEvents);
}

export function saveEvents(events: EventItem[]) {
  writeStorage(STORAGE_KEYS.events, events);
}

export function getPublications() {
  return readStorage<PublicationItem[]>(STORAGE_KEYS.publications, defaultPublications);
}

export function savePublications(publications: PublicationItem[]) {
  writeStorage(STORAGE_KEYS.publications, publications);
}

export function getFacultyCommittee() {
  return readStorage<CommitteeItem[]>(STORAGE_KEYS.facultyCommittee, defaultFacultyCommittee);
}

export function saveFacultyCommittee(members: CommitteeItem[]) {
  writeStorage(STORAGE_KEYS.facultyCommittee, members);
}

export function getStudentCommittee() {
  return readStorage<CommitteeItem[]>(STORAGE_KEYS.studentCommittee, defaultStudentCommittee);
}

export function saveStudentCommittee(members: CommitteeItem[]) {
  writeStorage(STORAGE_KEYS.studentCommittee, members);
}

export function getExCommittee() {
  return readStorage<CommitteeItem[]>(STORAGE_KEYS.exCommittee, defaultExCommitteeMembers);
}

export function saveExCommittee(members: CommitteeItem[]) {
  writeStorage(STORAGE_KEYS.exCommittee, members);
}
