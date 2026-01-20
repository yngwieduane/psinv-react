import { NextRequest, NextResponse } from "next/server";

type ServiceKey =
  | "buy"
  | "lease"
  | "propertyManagement"
  | "investmentDeals"
  | "visaResidency";

const SERVICE_PORTAL_MAP: Record<
  ServiceKey,
  { ContactType: string; RequirementType: string }
> = {
  buy: { ContactType: "3", RequirementType: "91212" },
  lease: { ContactType: "4", RequirementType: "91213" },
  propertyManagement: { ContactType: "4", RequirementType: "537" },
  investmentDeals: { ContactType: "3", RequirementType: "91212" },
  visaResidency: { ContactType: "3", RequirementType: "91212" },
};

const isServiceKey = (v: any): v is ServiceKey =>
  ["buy", "lease", "propertyManagement", "investmentDeals", "visaResidency"].includes(
    v
  );

const clean = (v: any) => String(v ?? "").trim();
const htmlToText = (s: string) => s.replace(/<br\s*\/?>/gi, "\n");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const CRM_ENDPOINT = "https://api.portal.psi-crm.com/leads";
    const API_KEY =
      "160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a";
    const service: ServiceKey = isServiceKey(body.service) ? body.service : "buy";
    const integration = SERVICE_PORTAL_MAP[service];
    const shortRemark = clean(body.remarks);                 // short
    const activityRemarks = htmlToText(clean(body.activityRemarks)); // full details
    const payload = {
  TitleID: body.salutation === "Mrs" ? "129933" : "129932",
  FirstName: clean(body.firstName),
  FamilyName: clean(body.lastName),

  MobileCountryCode: "971",
  MobileAreaCode: "",
  MobilePhone: clean(body.primaryPhone),
  TelephoneCountryCode: "",
  TelephoneAreaCode: "",
  Telephone: "",
  Email: clean(body.email),
  NationalityID: "65946",
  LanguageID: "115915",
  RequirementType: integration.RequirementType,
  ContactType: integration.ContactType,
  Budget: body.Budget != null ? String(body.Budget) : null,
  Budget2: body.Budget2 != null ? String(body.Budget2) : null,
  CountryID: "65946",
  StateID: "91823",
  CityID: "91823",
  UnitType: "19",
  Bedroom: "21935",
  Bathroom: "21935",
  AreaFrom: null,
  AreaTo: null,
  RequirementCountryID: "65946",
  ExistingClient: null,
  CompaignSource: null,
  CompaignMedium: null,
  Company: null,
  NumberOfEmployee: null,
  LeadStageId: null,
  LeadRatingId: '',
  UnitId: null,
  MethodOfContact: "115747",
  MediaType: "131012",
  MediaName: "61852",
  ReferredByID: clean(body.referredbyid || "3458"),
  ReferredToID: clean(body.referredbyid || "3458"),
  ActivityAssignedTo: clean(body.referredbyid || "3458"),
  ActivityTypeId: "167234",
  ActivitySubject: "Walk-in Registration",
  ActivityRemarks: activityRemarks,
  Remarks: shortRemark,
  IsForAutoRotation: "true",
};


    const crmResponse = await fetch(`${CRM_ENDPOINT}?APIKEY=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const crmText = await crmResponse.text();
    let crmJson: any = null;
    try {
      crmJson = JSON.parse(crmText);
    } catch {
      crmJson = { raw: crmText };
    }

    if (!crmResponse.ok) {
      return NextResponse.json(
        { ok: false, status: crmResponse.status, detail: crmJson },
        { status: crmResponse.status }
      );
    }

    return NextResponse.json({ ok: true, result: crmJson }, { status: 200 });
  } catch (err: any) {
    console.error("[walkin-registration-conrad] error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
