import localforage from 'localforage';

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  validity: string;
}

export interface Tool {
  category: string;
  items: string[];
}

export interface Award {
  name: string;
  year: string;
}

export interface Event {
  name: string;
  year: string;
}

export interface PortfolioContent {
  home: {
    summary: string;
  };
  career: {
    workExperience: WorkExperience[];
    technicalSkills: Skill[];
    certifications: Certification[];
    toolsUsed: Tool[];
    awards: Award[];
  };
  passionWorks: {
    ongoingLearning: string[];
    technicalEvents: Event[];
    softSkills: string[];
    sideProjects: string[]; // Added for explicit side projects
  };
}

// Initial default content based on the resume
export const defaultPortfolioContent: PortfolioContent = {
  home: {
    summary: `Senior System Engineer with 2.11 years of experience in Incident Management, Release Management, Monitoring Tool Administration, and Technical Application Support. Skilled in managing end-to-end production deployments, monitoring and resolving application-level issues to ensure system stability and performance. Currently advancing cloud skills through a Cloud Architect certification program. Recognized for excellence with industry awards and certifications. Highly adaptable and passionate about learning emerging technologies and taking on new technical challenges.`,
  },
  career: {
    workExperience: [
      {
        title: 'Senior System Engineer (EQ Sr. Software Dev)',
        company: 'Infosys Equinox',
        duration: 'Dec 2024 - Present',
        description: [
          'Serving as a senior resource in the application support team for eCommerce web applications hosted in AWS, working in rotational shifts aligned with US business hours.',
          'Supporting multi-regional client with incident management, resolving P3/P4 issues based on SOPs, monitoring AWS resources and escalation procedures.',
          'Performing manual site functionality checks, RDS & MongoDB Query execution for various report and analysis, API monitoring & testing, and automated incident creation based on alerts from different monitoring tools reducing the manual effort.',
          'Ensuring consistent application performance, timely monitoring and issue resolution across critical business operations within the SLA.',
        ],
      },
      {
        title: 'System Engineer',
        company: 'Infosys Equinox',
        duration: 'Dec 2022 - Dec 2024',
        description: [
          'Handled 200+ deployments for monolithic and microservice-based E commerce applications across multiple clients.',
          'Managed end-to-end release processes ensuring smooth and timely production roll outs.',
          'Administered Manage Engine\'s Application Manager, from server setup to configuring performance monitors, working on incidents based on alert for various client.',
        ],
      },
      {
        title: 'System Engineer Trainee',
        company: 'Infosys',
        duration: 'June 2022 - Dec 2022',
        description: [
          'Completed foundational training in various technologies such as Linux, SQL, MongoDB, Python.',
        ],
      },
      {
        title: 'Graduate Engineer Trainee',
        company: 'Voltech Engineers',
        duration: 'Oct 2021 - May 2022',
        description: [
          'Conducted testing and commissioning of numerical relays and control panels.',
        ],
      },
    ],
    technicalSkills: [
      { category: 'Cloud Platforms', items: ['AWS', 'GCP', 'Azure (learning Phase)'] },
      { category: 'Operating Systems', items: ['Linux'] },
      { category: 'Configuration Management', items: ['YAML', 'Json'] },
      { category: 'Familiar with', items: ['RDS', 'MongoDB', 'Python (Infosys Certification)'] },
    ],
    certifications: [
      { name: 'AWS Cloud Practitioner', validity: '2024 - 2027' },
      { name: 'GCP Associate', validity: '2024 - 2027' },
    ],
    toolsUsed: [
      { category: 'Monitoring & Performance', items: ['Instana', 'Application Manager', 'Pingdom', 'Splunk', 'Postman', 'Power Automate'] },
      { category: 'Incident & Issue Tracking', items: ['ServiceNow', 'Jira'] },
      { category: 'Version Control', items: ['GitHub', 'Bitbucket'] },
      { category: 'CI/CD', items: ['Jenkins'] },
    ],
    awards: [
      { name: 'Spotlight Award', year: '2024, Infosys Equinox' },
      { name: 'Spotlight Award', year: '2025, Infosys Equinox' },
    ],
  },
  passionWorks: {
    ongoingLearning: [
      'Intellipaat Cloud Architect Program (Online Training, Expected 2025)',
      'AWS Partner Equip Bangalore 2025 (19 Hours Training Program NDGE, March 6-8, 2025)',
      'AWS Summit Bangalore 2025 (Technical Edition, May 7, 2025)',
    ],
    technicalEvents: [
      'AppViewX SaaS Security Conference 2024',
      'Infosys Responsible AI Summit 2025',
      'AWS Summit Bangalore Innovators Edition 2025',
    ],
    softSkills: [
      'Highly adaptive and eager to explore new technical domains.',
      'Strong problem-solving skills with a passion for R&D and understanding complex issues.',
      'Collaborative team player with the ability to work independently when required.',
      'Flexible with work timings and experienced in handling rotational shifts.',
      'Quick thinker with a proactive mindset towards continuous improvement and technical excellence.',
    ],
    sideProjects: [
      'Currently exploring serverless architectures on AWS.',
      'Learning advanced TypeScript concepts for scalable applications.',
      'Building a small utility tool using Python for personal automation.',
    ],
  },
};

const CONTENT_STORAGE_KEY = 'portfolioContent';

export const getPortfolioContent = async (): Promise<PortfolioContent> => {
  try {
    const storedContent = await localforage.getItem<PortfolioContent>(CONTENT_STORAGE_KEY);
    return storedContent || defaultPortfolioContent;
  } catch (error) {
    console.error('Error fetching portfolio content from local storage:', error);
    return defaultPortfolioContent;
  }
};

export const setPortfolioContent = async (content: PortfolioContent): Promise<void> => {
  try {
    await localforage.setItem(CONTENT_STORAGE_KEY, content);
  } catch (error) {
    console.error('Error saving portfolio content to local storage:', error);
  }
};