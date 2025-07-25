// utils/crmApiHelpers.ts

const TOKENS = {
  PSI: "160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a",
  HUBSPOT: "400b0c41cea6ae771d9090684ccbcd3696aab50aa47d7dcdddd3018934a337bc8ac18f7581f6664e",
  HUBSPOT_ASSETS: "9f2eb4da2719c67820ce17c519e3ced3934a6283a58900876bdf48d5b2aac75331e626f6c4ab813b",
  DUBAI: "d301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0"
};

export async function insertPSILead(body: any) {
  return await fetch(`https://api.portal.psi-crm.com/leads?APIKEY=${TOKENS.PSI}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function insertHubspotLead(body: any, isAssets: boolean = false) {
  const token = isAssets ? TOKENS.HUBSPOT_ASSETS : TOKENS.HUBSPOT;
  const url = isAssets
    ? "https://portal.psiassets-crm.com/api/integrations/hubspot/createLead"
    : "https://api.portal.psi-crm.com/integrations/hubspot/createLead";

  return await fetch(`${url}?apiKey=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', APIKey: token },
    body: JSON.stringify(body),
  });
}

export async function insertDubaiLead(queryParams: Record<string, string>) {
  const searchParams = new URLSearchParams(queryParams).toString();

  return await fetch(`https://api.portal.dubai-crm.com/leads/query/create?${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKENS.DUBAI}`,
    },
  });
}

export async function insertAssetsLead(queryParams: Record<string, string>) {
  const searchParams = new URLSearchParams(queryParams).toString();

  return await fetch(`https://portal.psiassets-crm.com/api/leads/query/create?${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKENS.HUBSPOT_ASSETS}`,
    },
  });
}

export async function submitLeadToCorrectCRM(payload: any, options: { isHubspot: boolean; branch: string }) {
  const { isHubspot, branch } = options;

  if (isHubspot && branch === 'Assets') {
    return { simulated: true, source: 'hubspot-assets', payload };
  }

  if (isHubspot) {
    return { simulated: true, source: 'hubspot-auh', payload };
  }

  if (branch === 'Dubai') {
    return { simulated: true, source: 'dubai', payload };
  }

  if (branch === 'Assets') {
    return { simulated: true, source: 'assets', payload };
  }
  return { simulated: true, source: 'auh', payload };
}
