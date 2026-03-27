// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
"2026-03-27": [
  { "id": "6987", "name": "Shadi Basem Shrafedin Abofakher" },
  { "id": "7211", "name": "Petronella Awad" },
  { "id": "9952", "name": "Mahmoud H.K. Oudah" },
  { "id": "6575", "name": "Samer Sultan S. Ishtieh" },
  { "id": "9935", "name": "Bashar Akl Maryam" }
]
};
