import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      countryDescription,
      cityDescription,
      districtDescription,
      communityDescription,
      subCommunityDescription,
      shortRemarks,
      remarks,
      property,
      unitType,
      bedroom,
      minBudget,
      maxBudget,
      propertyCampaignId,
      google_gclid,
      selectedService,
      ReferredByID,
      ActivityAssignedTo,
      emailBody,
      uploadedSelfieURL,
      referredbyid,
      sendto,
      branch,
      requirementType: userReqType,
    } = body;
    console.log('Form Data:', {
      countryDescription,
      cityDescription,
      districtDescription,
      communityDescription,
      subCommunityDescription,
      shortRemarks,
      remarks,
      property,
      unitType,
      bedroom,
      minBudget,
      maxBudget,
      propertyCampaignId,
      google_gclid,
      selectedService,
      userReqType,
    });

    // ---------- helpers ----------
    const unitTypeIdMap: Record<string, number> = {
      Apartment: 19,
      Villa: 20,
      Townhouse: 131090,
      Penthouse: 166263,
      'Lands/Plot': 26,
      'Commercial Plot': 47388,
      Office: 24,
      Retail: 23,
      Warehouse: 21,
    };

    // CRM Bedroom lookup IDs
    const bedroomOptions: Record<string, string> = {
      '21934': 'Studio',
      '21935': '1',
      '21936': '2',
      '21937': '3',
      '21938': '4',
      '21939': '5',
      '21940': '6',
    };

    // Client label → {RequirementType, ContactType, Service}
    const clientTypeMap: Record<
      'Buyer' | 'Seller' | 'Tenant' | 'Landlord',
      { req: '91212' | '91213'; contact: '1' | '2' | '3' | '4'; service: 'Sales' | 'Lease' }
    > = {
      Buyer: { req: '91212', contact: '3', service: 'Sales' },
      Seller: { req: '91212', contact: '1', service: 'Sales' },
      Tenant: { req: '91213', contact: '4', service: 'Lease' },
      Landlord: { req: '91213', contact: '2', service: 'Lease' },
    };

    const unitTypeId = unitTypeIdMap[body.unitType] ?? 19;
    const isAssets =
      String(body.branch ?? '').toLowerCase() === 'assets';

    const assetsClientLabel = String(
      body.clientTypeLabel ?? body.requirementType ?? ''
    ).trim();

    let requirementType: '91212' | '91213' = '91212';
    let contactType: '1' | '2' | '3' | '4' = '3';

    if (isAssets) {
      // Map label -> CRM IDs for Assets
      const key = assetsClientLabel as keyof typeof clientTypeMap;
      if (key && clientTypeMap[key]) {
        requirementType = clientTypeMap[key].req;       // '91212' | '91213'
        contactType = clientTypeMap[key].contact;   // '1' | '2' | '3' | '4'
        body.selectedService = clientTypeMap[key].service; // 'Sales' | 'Lease'
      }
    } else {
      const reqLabel = String(body.requirementType ?? '').trim();

      if (body.selectedService === 'Sales') {
        requirementType = '91212'; // Sales
        if (reqLabel === 'Buyer') {
          contactType = '3';       // Buyer
        } else if (reqLabel === 'Landlord' || reqLabel === 'Seller') {
          contactType = '1';
        } else {
          contactType = '3';
        }
      } else if (body.selectedService === 'Lease') {
        requirementType = '91213'; // Lease
        if (reqLabel === 'Tenant') {
          contactType = '4';       // Tenant
        } else if (reqLabel === 'Landlord') {
          contactType = '2';       // Landlord
        } else {
          contactType = '4';
        }
      }
    }


    let CRM_ENDPOINT = 'https://api.portal.psi-crm.com/leads';
    let API_KEY = '160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a';

    if (branch?.toLowerCase() === 'dubai') {
      CRM_ENDPOINT = 'https://api.portal.dubai-crm.com/leads';
      API_KEY = 'd301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0';
    } else if (branch?.toLowerCase() === 'assets') {
      CRM_ENDPOINT = 'https://portal.psiassets-crm.com/api/leads/';
      API_KEY = '511af8807e7ff9cc0441c901aa724d5f9f66dfd21c388f385572bda768d4529b65b7c57ed3853ab0';
    }



    const payload = {
      TitleID: '129932',
      FirstName: body.firstName,
      FamilyName: body.lastName,
      MobileCountryCode: '971',
      MobileAreaCode: '',
      MobilePhone: body.primaryPhone || '',
      TelephoneCountryCode: '',
      TelephoneAreaCode: '',
      Telephone: '',
      Email: body.email,
      NationalityID: '65946',
      LanguageID: '115915',
      CompanyID: '',
      Remarks: body.shortRemarks || '',
      RequirementType: requirementType,
      ContactType: contactType,
      CountryID: countryDescription || '65946',
      StateID: cityDescription || '91823',
      CityID: cityDescription || '91823',
      DistrictID: districtDescription || '102625',
      CommunityID: communityDescription || '',
      SubCommunityID: subCommunityDescription || '',
      PropertyID: body.property?.id || '',
      UnitType: unitTypeId,
      MethodOfContact: '115747',
      MediaType: '131012',
      MediaName: '61852',
      DeactivateNotification: '',
      Bedroom: body.BedroomID || '21935',
      Bathroom: '21935',
      Budget: body.minBudget?.toString() || '100000',
      Budget2: body.maxBudget?.toString() || '1000000',
      AreaFrom: '',
      AreaTo: '',
      RequirementCountryID: '65946',
      ExistingClient: '',
      CompaignSource: '',
      CompaignMedium: '',
      Company: '',
      NumberOfEmployee: '',
      LeadStageId: '',
      LeadRatingId: '',
      UnitId: '',
      ReferredToID: body.ReferredToID || '3458',
      ReferredByID: body.ReferredByID || '3458',
      IsBulkUpload: '',
      ActivityAssignedTo: body.ActivityAssignedTo || '3458',
      ActivityDate: '',
      ActivityTypeId: '167234',
      ActivitySubject: 'Walk-in Registration',
      ActivityRemarks: body.remarks || '',
      IsForAutoRotation: 'true',
      PropertyCampaignId: body.propertyCampaignId || '',
      contactClassId: '',
      google_gclid: body.google_gclid || '',
    };

    const crmResponse = await fetch(`${CRM_ENDPOINT}?APIKEY=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await crmResponse.json();
    const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: emailBody,
        receiver: Array.isArray(body.sendto) ? body.sendto.join(',') : body.sendto,
        subject: `Walk-in Registration - ${body.firstName} ${body.lastName}`,
        filename: "",
        filedata: ""
      })
    });

    if (!mailRes.ok) {
      const text = await mailRes.text();
      throw new Error(`Email API failed: ${text}`);
    }
    if (!crmResponse.ok) {
      return NextResponse.json({ error: 'CRM submission failed', details: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
