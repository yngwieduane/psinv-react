import { NextResponse } from "next/server";

export async function GET() {
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

    // Fetch countries from res.country
    const countriesPayload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "res.country",
        method: "search_read",
        args: [[]],
        kwargs: {
          fields: ["id", "name", "code"],
        },
      },
    };

    const countriesRes = await fetch("https://psi-hcm.com/web/dataset/call_kw/res.country/search_read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: sessionCookie,
      },
      body: JSON.stringify(countriesPayload),
    });

    const countries = await countriesRes.json();

    return NextResponse.json(countries);

  } catch (err) {
    console.error("Error fetching countries:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
