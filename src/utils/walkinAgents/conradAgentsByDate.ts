// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
"2026-03-02": [
  { "id": "7043", "name": "Omar Khaleel Subhi Basheer" },
  { "id": "9904", "name": "Fadi Akram Nasr" },
  { "id": "7438", "name": "Bidur Giri" },
  { "id": "7193", "name": "Feliphe de Freitas Santos" },
  { "id": "7097", "name": "Aya Sayed Abdelsalam Ahmed" },
  { "id": "7356", "name": "Malek Saleh Ali Salo" }
],
};
