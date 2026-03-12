import { NextRequest } from "next/server";

function normalizeText(value: string = "") {
  return value
    .toLowerCase()
    .replace(/[-_/(),.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueByProject(results: any[]) {
  const seen = new Set<string>();
  return results.filter((item) => {
    const key = `${item.propertyName || ""}-${item.community || ""}-${item.subCommunity || ""}-${item.city || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchProjects(searchValue: string) {
  const raw = JSON.stringify({
    propertyName: searchValue,
  });

  const response = await fetch(
    "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=50",
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        apiKey: "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ",
      },
      body: raw,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("An error occurred while fetching projects");
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query")?.trim() || "";

    if (!query) {
      return new Response(
        JSON.stringify({ result: [], totalCount: "0" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const normalizedQuery = normalizeText(query);
    const firstResponse = await fetchProjects(query);
    let firstResults = Array.isArray(firstResponse?.result) ? firstResponse.result : [];

    let fallbackResults: any[] = [];

    if (firstResults.length === 0) {
      const words = query.split(" ").filter(Boolean);

      if (words.length > 1) {
        const shortenedQuery = words.slice(0, words.length - 1).join(" ");
        const secondResponse = await fetchProjects(shortenedQuery);
        fallbackResults = Array.isArray(secondResponse?.result) ? secondResponse.result : [];
      }
    }

    const combined = uniqueByProject([...firstResults, ...fallbackResults]);

    // Local smart filtering across multiple fields
    const filtered = combined.filter((project: any) => {
      const haystack = normalizeText(
        [
          project.propertyName,
          project.community,
          project.subCommunity,
          project.city,
        ]
          .filter(Boolean)
          .join(" ")
      );

      return haystack.includes(normalizedQuery);
    });

    const finalResults = filtered.length > 0 ? filtered : combined;

    return new Response(
      JSON.stringify({
        result: finalResults,
        totalCount: String(finalResults.length),
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Search API error:", error);

    return new Response(
      JSON.stringify({ result: [], totalCount: "0" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}