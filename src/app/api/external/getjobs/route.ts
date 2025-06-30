// /src/app/api/external/getjobs/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const loginPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
    db: "Xeleration",
    login: "psi_website",
    password: "2wVtzjqYF4b3",
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

    // Step 2: Get job list
    const jobsPayload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "hr.job",
        method: "search_read",
        args: [[["website_published", "=", true]]],
        kwargs: {},
      },
    };

    const jobsRes = await fetch("https://psi-hcm.com/web/dataset/call_kw/hr.job/search_read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: sessionCookie,
      },
      body: JSON.stringify(jobsPayload),
    });

    const jobs = await jobsRes.json();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
