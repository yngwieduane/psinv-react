// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
"2026-03-16": [
  //{ "id": "", "name": "Andrew Emad Fouad Fahmy" },
  { "id": "9985", "name": "Ola Nabil Hamdan" },
  //{ "id": "", "name": "Mohamed Tarek Ali Mohamed Hussien" },
  { "id": "7043", "name": "Omar Khaleel Subhi Basheer" },
  { "id": "9952", "name": "Mahmoud H.K. Oudah" },
  { "id": "7467", "name": "Maher Archid Hadife" }
]
};
