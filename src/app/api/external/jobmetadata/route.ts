import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { model, ids } = body;

  if (!model || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const loginRes = await fetch("https://psi-hcm.com/web/session/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
db: process.env.ODOO_DB,
    login: process.env.ODOO_USER,
    password: process.env.ODOO_PASSWORD,
      },
    }),
  });

  const cookieHeader = loginRes.headers.get("set-cookie");
  const sessionCookie = cookieHeader?.split(";")[0];
  if (!sessionCookie) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
  const dataRes = await fetch("https://psi-hcm.com/web/dataset/call_kw/" + model + "/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model,
        method: "read",
        args: [ids],
        kwargs: { fields: ["name"] },
      },
    }),
  });

  if (!dataRes.ok) {
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }

  const data = await dataRes.json();
  return NextResponse.json(data);
}
