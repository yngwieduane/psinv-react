import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const loginPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
    db: process.env.ODOO_DB,
    login: process.env.ODOO_USER,
    password: process.env.ODOO_PASSWORD,
    },
  };

  try {
    // Step 1: Login and get session cookie
    const loginRes = await fetch("https://psi-hcm.com/web/session/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPayload),
    });

    const cookieHeader = loginRes.headers.get("set-cookie");
    const sessionCookie = cookieHeader?.split(";")[0];
    if (!sessionCookie) {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }
    const jobDetailPayload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "hr.job",
        method: "search_read",
        args: [[["id", "=", parseInt(id)]]],
        kwargs: {},
      },
    };

    const jobRes = await fetch("https://psi-hcm.com/web/dataset/call_kw/hr.job/search_read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: sessionCookie,
      },
      body: JSON.stringify(jobDetailPayload),
    });

    const jobData = await jobRes.json();
    return NextResponse.json(jobData);
  } catch (error) {
    console.error("Job fetch error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
