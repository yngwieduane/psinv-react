// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
    "2026-01-21": [
        { id: "7282", name: "Aya Kabbaj" },
        { id: "7205", name: "Michael Borsch" },
        { id: "6505", name: "Raheem Mohammad Kamel AlKarazoon" },
        { id: "7211", name: "Petronella Awad" },
    ],
};
