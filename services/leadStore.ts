
import { LeadFormData, LeadScoreResult } from "../types";

export interface PersistedLead extends LeadFormData {
  id: string;
  score: number;
  priority: string;
  summary: string;
  createdAt: string;
}

const STORAGE_KEY = 'orioex_leads';

export const leadStore = {
  getLeads: (): PersistedLead[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveLead: (data: LeadFormData, analysis: LeadScoreResult): PersistedLead => {
    const leads = leadStore.getLeads();
    const newLead: PersistedLead = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      score: analysis.score,
      priority: analysis.priority,
      summary: analysis.summary,
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return newLead;
  },

  deleteLead: (id: string) => {
    const leads = leadStore.getLeads().filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  },

  clearLeads: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
