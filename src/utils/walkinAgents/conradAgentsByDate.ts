// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
"2026-03-16": [
  { "id": "9936", "name": "Andrew Emad Fouad Fahmy" },
  { "id": "9985", "name": "Ola Nabil Hamdan" },
  { "id": "9905", "name": "Mohamed Tarek Ali Mohamed Hussien" },
  { "id": "7043", "name": "Omar Khaleel Subhi Basheer" },
  { "id": "9952", "name": "Mahmoud H.K. Oudah" },
  { "id": "7467", "name": "Maher Archid Hadife" }
],
  "2026-03-17": [
    { "id": "9862", "name": "Aleksandra Vojinovic" },
    { "id": "9919", "name": "Ahmad Hamza Hussein Harb" },
    { "id": "7225", "name": "Miguel Angel Aguilar Leon" },
    { "id": "6152", "name": "Bojana Popovic" },
    { "id": "9757", "name": "Mohammad Rizik Saleh Bani Hani" },
    { "id": "7427", "name": "Youmna Ashraf Mohamed Ali Metwally" }
  ],

  "2026-03-18": [
    { "id": "7232", "name": "Hamza Nedal Daoud Eleiwat" },
    { "id": "6614", "name": "Hanna Jiries Hanna Ibrahim" },
    { "id": "9977", "name": "Rima Ayman Derbas Hassan" },
    { "id": "9926", "name": "Lynne Abdul Hadi" },
    { "id": "9906", "name": "Nessren Ghassan Kassis" },
    { "id": "7331", "name": "Ghalia Chater" }
  ],

  "2026-03-19": [
    { "id": "7141", "name": "Yaser Nezar Badrah" },
    { "id": "7441", "name": "Randa Jamil Assi" },
    { "id": "6998", "name": "Doina Andreea Bita" },
    { "id": "7356", "name": "Malek Saleh Ali Salo" },
    { "id": "6762", "name": "Hanan Aied Sweis" },
    { "id": "7231", "name": "Abdulrazzaq Omar Mubarak Balain" }
  ],

  "2026-03-20": [
    { "id": "9896", "name": "Mariam Saleem Muhammad Saleem" },
    { "id": "6252", "name": "Nabila Assaad Hage Hassan" },
    { "id": "6267", "name": "Ali Hekmat Fawzi" },
    { "id": "5024", "name": "Rasha Bashar Awwad Aljamaeen" },
    { "id": "7349", "name": "Omeed Aref Mohammad Alzghoul" },
    { "id": "9949", "name": "Charles Sebastian Joseph Robson" }
  ]
};
