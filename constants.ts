
import { ServiceCategory, Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Custom SaaS Architectures',
    description: 'Scalable, multi-tenant systems designed for rapid growth and enterprise-grade reliability.',
    category: ServiceCategory.SAAS,
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    id: '2',
    title: 'AI Integration & Scoring',
    description: 'Harness LLMs to automate business logic, lead scoring, and complex data processing.',
    category: ServiceCategory.AI,
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: '3',
    title: 'Cloud Optimization',
    description: 'High-availability infrastructure design using AWS/Azure/GCP with a focus on performance.',
    category: ServiceCategory.CLOUD,
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
  }
];

export const PROBLEM_SOLUTION = [
  {
    problem: "Legacy systems slowing down your growth.",
    solution: "Modern, microservices-based architectures built for speed."
  },
  {
    problem: "Manual lead processing wasting sales time.",
    solution: "AI-driven automated qualification and scoring engines."
  },
  {
    problem: "High infrastructure costs with low reliability.",
    solution: "Optimized cloud deployments with 99.99% uptime guarantees."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Enterprise Grade",
    description: "We apply top-tier security standards (OWASP) to every line of code.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    title: "Scalable Logic",
    description: "Architecture that evolves with your business, from MVP to Enterprise.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  },
  {
    title: "AI Native",
    description: "Direct integration with Gemini and other LLMs for modern intelligence.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  }
];

export const ENGINEERING_PROCESS = [
  {
    step: "01",
    title: "Discovery & Audit",
    description: "We deep-dive into your existing infrastructure and business goals to identify critical bottlenecks.",
    details: ["Infrastructure Analysis", "Security Audit", "Tech Stack Strategy"]
  },
  {
    step: "02",
    title: "Architectural Design",
    description: "Creating a blueprint for a scalable, secure, and high-performance system customized for your needs.",
    details: ["Schema Definition", "System Architecture", "Security Protocols"]
  },
  {
    step: "03",
    title: "Agile Engineering",
    description: "Rapid, iterative development cycles with constant feedback and integration testing.",
    details: ["Sprint Management", "CI/CD Pipelines", "Automated Testing"]
  },
  {
    step: "04",
    title: "Launch & Scale",
    description: "Seamless deployment to cloud environments with automated scaling and 24/7 monitoring.",
    details: ["Cloud Deployment", "Load Balancing", "Optimization"]
  }
];

export const NAV_LINKS = [
  { label: 'Services', href: '#/services' },
  { label: 'Process', href: '#/process' },
  { label: 'Why Us', href: '#/why-us' },
  { label: 'Contact', href: '#/contact' }
];
