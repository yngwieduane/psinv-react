import { NextResponse } from "next/server";

export async function GET() {

  console.log("ENV:", process.env.ODOO_DB);
  
  try {

    const loginRes = await fetch("https://psi-hcm.com/web/session/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    const loginData = await loginRes.json();

    if (!loginData?.result?.uid) {
      console.error("Login failed:", loginData);
      return NextResponse.json({ error: "Odoo login failed" }, { status: 401 });
    }

    const cookie = loginRes.headers.get("set-cookie");

    if (!cookie) {
      return NextResponse.json({ error: "Session cookie missing" }, { status: 401 });
    }

    const countriesRes = await fetch(
      "https://psi-hcm.com/web/dataset/call_kw/res.country/search_read",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        body: JSON.stringify({
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
        }),
      }
    );

    const countriesData = await countriesRes.json();

    return NextResponse.json(countriesData.result);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}