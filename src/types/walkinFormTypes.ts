export type Agent = {
  id: string;
  name: string;
};

export type WalkinFormConfig = {
  title: string;
  logo?: string;
  developerLogoUrl?: string;
  referredbyid?:number;
  branch:string;
  sendto: string | string[];
  showClientProfession?: boolean;
  showContactInformation?: boolean;
  showHostedBy?: boolean;
  agentsByDate?: Record<string, Agent[]>;
};
