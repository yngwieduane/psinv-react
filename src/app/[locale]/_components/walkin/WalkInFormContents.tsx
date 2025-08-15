'use client';

import { useWalkinForm } from '@/context/WalkinFormContext';
import { PersonalInformation } from './PersonalInformation';
import { ClientProfession } from './ClientProfession';
import { ContactInformation } from './ContactInformation';
import { Services } from './Services';
import { HostedBy } from './HostedBy';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { fetchLocationLookupIds } from '@/utils/fetchLocationLookupIds';
import { fetchDescriptionByLookupId } from '@/utils/fetchDescriptionByLookupId';
import { walkinFormConfig } from '@/utils/walkinConfig';
import { bedroomOptions } from '@/utils/constants';
import { ValidationModal } from '../ValidationModal';
import { ValidationAlert } from '../ValidationAlert';
import ServicesAssets from './ServicesAssets';

export function WalkInFormContents({ slug, locale }: { slug: string; locale: string }) {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { data, updateForm } = useWalkinForm();

  const branch = useMemo(() => walkinFormConfig[slug]?.branch || '', [slug]);
  const isAssetsSlug = (s: string) => ['psi-assets-yas', 'psi-assets-reem'].includes(s);

  useEffect(() => {
    if (data.branch !== branch && branch) {
      console.log('Setting branch from config:', branch);
      updateForm({ branch });
    }
  }, [branch, data.branch, updateForm]);
  // Capture UTM parameters (fallback to localStorage)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
      const value = params.get(key);
      if (value && !localStorage.getItem(key)) {
        localStorage.setItem(key, value);
      }
    });
  }, []);

  const allowFallbackToLocalStorage = false;

  const utm_source = searchParams.get('utm_source') || (allowFallbackToLocalStorage ? localStorage.getItem('utm_source') : '');
  const utm_medium = searchParams.get('utm_medium') || (allowFallbackToLocalStorage ? localStorage.getItem('utm_medium') : '');
  const utm_campaign = searchParams.get('utm_campaign') || (allowFallbackToLocalStorage ? localStorage.getItem('utm_campaign') : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let validationResult;
    const validationErrors: string[] = [];
    let firstErrorFieldId: string | null = null;
    const isAssets = walkinFormConfig[slug]?.branch === 'assets';
    // validation
    if (!data.firstName?.trim()) {
      validationErrors.push('Please enter your First Name');
      firstErrorFieldId ??= 'firstName';
    }
    if (!data.lastName?.trim()) {
      validationErrors.push('Please enter your Last Name');
      firstErrorFieldId ??= 'lastName';
    }
    if (!data.email?.trim()) {
      validationErrors.push('Email is required');
      firstErrorFieldId ??= 'email';
    }
    if (!data.primaryPhone?.trim()) {
      validationErrors.push('Primary Phone is required');
      firstErrorFieldId ??= 'primaryPhone';
    } else {
      const phoneDigits = data.primaryPhone.replace(/\D/g, '');
      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        validationErrors.push('Enter a valid phone number (7–15 digits)');
        firstErrorFieldId ??= 'primaryPhone';
      }
    }
    if (isAssetsSlug(slug)) {
      // Asset-specific validation
      const reqChosen = String(data.clientTypeLabel ?? data.requirementType ?? '').trim();
      if (!reqChosen) {
        validationErrors.push('Please select a client type');
        firstErrorFieldId ??= 'reqType';
      }
      if (!data.unitType) {
        validationErrors.push('Please select preferred unit');
        firstErrorFieldId ??= 'unitType';
      }

      const residentialUnits = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];
      if (residentialUnits.includes(String(data.unitType)) && !data.bedroom) {
        validationErrors.push('Please select number of bedrooms');
        firstErrorFieldId ??= 'bedroom';
      }

      if (!data.property?.id?.trim()) {
        validationErrors.push('Please select a property');
        firstErrorFieldId ??= 'property';
      }

      if (!data.minBudget) {
        validationErrors.push('Please select minimum budget');
        firstErrorFieldId ??= 'minBudget';
      }
      if (!data.maxBudget) {
        validationErrors.push('Please select maximum budget');
        firstErrorFieldId ??= 'maxBudget';
      }
    }

    if (!isAssetsSlug(slug)) {
      // Non-asset validations
      if (!data.selectedService?.trim()) {
        validationErrors.push('Please select a service');
        firstErrorFieldId ??= 'selectedService';
      }
      if (data.selectedService) {
        if (!data.requirementType) {
          if (data.selectedService === 'Sales') {
            validationErrors.push('Please select if you are a Buyer or Landlord');
          } else if (data.selectedService === 'Lease') {
            validationErrors.push('Please select if you are a Tenant or Landlord');
          } else {
            validationErrors.push('Please select your requirement type');
          }
          firstErrorFieldId ??= 'reqType';
        }

      }
      if (!data.unitCategory) {
        validationErrors.push('Please select unit category');
        firstErrorFieldId ??= 'unitCategory';
      }

      if (!data.unitType) {
        validationErrors.push('Please select unit type');
        firstErrorFieldId ??= 'unitType';
      }

      if (data.unitCategory === 'Residential' && !data.bedroom) {
        validationErrors.push('Please select number of bedrooms');
        firstErrorFieldId ??= 'bedroom';
      }

      if (!data.minBudget) {
        validationErrors.push('Please select minimum budget');
        firstErrorFieldId ??= 'minBudget';
      }

      if (!data.maxBudget) {
        validationErrors.push('Please select maximum budget');
        firstErrorFieldId ??= 'maxBudget';
      }
      if (
        data.requirementType === 'Landlord' &&
        !data.property?.id?.trim()
      ) {
        validationErrors.push('Property selection is required for Landlord');
        firstErrorFieldId ??= 'property';
      }

      if (
        data.requirementType === 'Landlord' &&
        !data.property?.id?.trim()
      ) {
        validationErrors.push('Property selection is required for Landlord');
        firstErrorFieldId ??= 'property';
      }
    }
    // Agent
    if (!data.hostedBy?.agentId?.trim()) {
      validationErrors.push('Agent Name is required');
      firstErrorFieldId ??= 'selectagent';
    }
    // Final validation check
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShowValidationModal(true);
      setIsSubmitting(false);

      if (firstErrorFieldId) {
        const el = document.getElementById(firstErrorFieldId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (el as HTMLElement).focus?.();
        }
      }
      return;
    } else {
      setErrors([]);
    }
    const eventTitle = walkinFormConfig[slug]?.title || 'N/A';
    const sendto = walkinFormConfig[slug]?.sendto || 'N/A';
    const referredbyid = walkinFormConfig[slug]?.referredbyid || 'N/A';
    const bedroomId = data.bedroom;
    const bedroomName = bedroomId ? bedroomOptions[bedroomId] || 'N/A' : 'N/A';

    const shortRemark = `
Event Title: ${eventTitle}\n,
Agent Name: ${data.hostedBy?.agentName || 'N/A'}\n
`.trim();
    const fullRemarks = `
Walk-in Registration Details\n
Client Info :\n
Name: ${data.title || ''} ${data.firstName || ''} ${data.lastName || ''},\n
Email: ${data.email || 'N/A'},\n
Primary Phone: ${data.primaryPhone || 'N/A'},\n
Alternate Phone: ${data.alternatePhone || 'N/A'},\n
Nationality: ${data.nationality || 'N/A'},\n
DOB: ${data.dob || 'N/A'},\n
Address: ${data.address || 'N/A'},\n
Residence Type: ${data.residenceType || 'N/A'},\n
Reason of Visit: ${data.reasonOfVisit || 'N/A'},\n

Profession Info :\n
Profession Type: ${data.professionType || 'N/A'},\n
Company Name: ${data.companyName || 'N/A'},\n
Position: ${data.position || 'N/A'},\n
City: ${data.professionCity || 'N/A'},\n
Country: ${data.professionCountry || 'N/A'},\n

Service Info:\n
Service: ${data.selectedService || 'N/A'},\n
Requirement Type: ${data.requirementType || 'N/A'},\n
Unit Category: ${data.unitCategory || 'N/A'},\n
Unit Type: ${data.unitType || 'N/A'},\n
Bedrooms: ${data.bedroom || 'N/A'},\n
Budget: ${data.minBudget?.toLocaleString() || 'N/A'} - ${data.maxBudget?.toLocaleString() || 'N/A'} AED,\n

Property Info:\n
Property: ${data.property?.name || 'N/A'},\n
Location: ${[
        data.property?.district,
        data.property?.city,
        data.property?.country,
      ]
        .filter(Boolean)
        .join(', ') || 'N/A'},\n

On-spot Viewing :\n
Wants Viewing: ${data.onSpotViewing ? 'Yes' : 'No'},\n
${data.onSpotViewing && data.onSpotDetails ? `
Community: ${data.onSpotDetails.communityName || 'N/A'},\n
Date: ${data.onSpotDetails.date || 'N/A'},\n
Time: ${data.onSpotDetails.time || 'N/A'},\n
` : ''}

Finance Info :\n
Looking for Finance: ${data.lookingForFinance ? 'Yes' : 'No'},\n
${data.lookingForFinance && data.financeDetails ? `
Preferred Bank: ${data.financeDetails.preferredBank || 'N/A'},\n
Downpayment: ${data.financeDetails.downpayment?.toLocaleString() || 'N/A'} AED,\n
Loan Amount: ${data.financeDetails.loanAmount?.toLocaleString() || 'N/A'} AED,\n
` : ''}
Hosted By: ${data.hostedBy?.agentName || 'N/A'},\n
Agent ID: ${data.hostedBy?.agentId || 'N/A'},\n
Rating: ${data.experienceRating ?? 'N/A'},\n
Remarks: ${data.remarks || 'N/A'},\n
Misc: \n
Best Time to Contact: ${data.bestTime || 'N/A'},\n
Uploaded Selfie: ${data.selfieFileName || 'N/A'},\n
Form URL: ${typeof window !== 'undefined' ? window.location.href : 'N/A'},\n
`.trim();
    const emailBody = `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <td colspan="2" style="background-color: rgb(2, 52, 74) !important; color: #ffffff; font-size: 20px; font-weight: bold;text-align:center;">
            Walk-in Registration - ${eventTitle}
          </td>
        </tr>

        <!-- Client Info -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Client Info</td></tr>
        <tr><td>Name</td><td>${data.title || ''} ${data.firstName || ''} ${data.lastName || ''}</td></tr>
        <tr><td>Email</td><td>${data.email || 'N/A'}</td></tr>
        <tr><td>Primary Phone</td><td>${data.primaryPhone || 'N/A'}</td></tr>
        <tr><td>Alternate Phone</td><td>${data.alternatePhone || 'N/A'}</td></tr>
        <tr><td>Nationality</td><td>${data.nationality || 'N/A'}</td></tr>
        <tr><td>DOB</td><td>${data.dob || 'N/A'}</td></tr>
        <tr><td>Address</td><td>${data.address || 'N/A'}</td></tr>
        <tr><td>Residence Type</td><td>${data.residenceType || 'N/A'}</td></tr>
        <tr><td>Reason of Visit</td><td>${data.reasonOfVisit || 'N/A'}</td></tr>

        <!-- Profession Info -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Profession Info</td></tr>
        <tr><td>Profession Type</td><td>${data.professionType || 'N/A'}</td></tr>
        <tr><td>Company Name</td><td>${data.companyName || 'N/A'}</td></tr>
        <tr><td>Position</td><td>${data.position || 'N/A'}</td></tr>
        <tr><td>City</td><td>${data.professionCity || 'N/A'}</td></tr>
        <tr><td>Country</td><td>${data.professionCountry || 'N/A'}</td></tr>

        <!-- Service Info -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Service Info</td></tr>
        <tr><td>Service</td><td>${data.selectedService || 'N/A'}</td></tr>
        <tr><td>Requirement Type</td><td>${data.requirementType || 'N/A'}</td></tr>
        <tr><td>Unit Category</td><td>${data.unitCategory || 'N/A'}</td></tr>
        <tr><td>Unit Type</td><td>${data.unitType || 'N/A'}</td></tr>
        <tr><td>Bedrooms</td><td>${data.bedroom || 'N/A'}</td></tr>
        <tr><td>Budget</td><td>${data.minBudget?.toLocaleString() || 'N/A'} - ${data.maxBudget?.toLocaleString() || 'N/A'} AED</td></tr>

        <!-- Property Info -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Property Info</td></tr>
        <tr><td>Property</td><td>${data.property?.name || 'N/A'}</td></tr>
        <tr><td>Location</td><td>${[data.property?.district, data.property?.city, data.property?.country].filter(Boolean).join(', ') || 'N/A'}</td></tr>

        <!-- On-spot Viewing -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">On-spot Viewing</td></tr>
        <tr><td>Wants Viewing</td><td>${data.onSpotViewing ? 'Yes' : 'No'}</td></tr>
        ${data.onSpotViewing && data.onSpotDetails ? `
          <tr><td>Community</td><td>${data.onSpotDetails.communityName || 'N/A'}</td></tr>
          <tr><td>Date</td><td>${data.onSpotDetails.date || 'N/A'}</td></tr>
          <tr><td>Time</td><td>${data.onSpotDetails.time || 'N/A'}</td></tr>
        ` : ''}

        <!-- Finance Info -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Finance Info</td></tr>
        <tr><td>Looking for Finance</td><td>${data.lookingForFinance ? 'Yes' : 'No'}</td></tr>
        ${data.lookingForFinance && data.financeDetails ? `
          <tr><td>Preferred Bank</td><td>${data.financeDetails.preferredBank || 'N/A'}</td></tr>
          <tr><td>Downpayment</td><td>${data.financeDetails.downpayment?.toLocaleString() || 'N/A'} AED</td></tr>
          <tr><td>Loan Amount</td><td>${data.financeDetails.loanAmount?.toLocaleString() || 'N/A'} AED</td></tr>
        ` : ''}

        <!-- Hosted By -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Hosted By</td></tr>
        <tr><td>Agent Name</td><td>${data.hostedBy?.agentName || 'N/A'}</td></tr>
        <tr><td>Agent ID</td><td>${data.hostedBy?.agentId || 'N/A'}</td></tr>
        <tr><td>Rating</td><td>${data.experienceRating ?? 'N/A'}</td></tr>
        <tr><td>Remarks</td><td>${data.remarks || 'N/A'}</td></tr>

        <!-- Misc -->
        <tr><td colspan="2" style="background-color: #f97316; color: #fff; font-weight: bold;">Miscellaneous</td></tr>
        <tr><td>Best Time to Contact</td><td>${data.bestTime || 'N/A'}</td></tr>
        <tr><td>Uploaded Selfie</td><td>${data.selfieFileName || 'N/A'}</td></tr>
        <tr><td>Form URL</td><td>${typeof window !== 'undefined' ? window.location.href : 'N/A'}</td></tr>
        <tr>
  <td colspan="2" style="background-color: rgb(2, 52, 74) !important; color: #ffffff !important; text-align: center; font-size: 12px; padding: 15px;">
    Copyright © 2025 | All Rights Reserved | Property Shop Investment
  </td>
</tr>
      </table>
    </body>
  </html>
`.trim();
    let uploadedSelfieURL = '';

    if (data.selfieFileData && data.selfieFileName) {
      const formData = new FormData();

      // Convert Base64 DataURL to Blob
      const byteString = atob(data.selfieFileData.split(',')[1]);
      const mimeString = data.selfieFileData.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      formData.append('file', blob, data.selfieFileName);

      const uploadRes = await fetch('/api/external/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadResult = await uploadRes.json();
      console.log('Uploaded File URL:', uploadResult.filePath);

      // Assign URL to variable
      uploadedSelfieURL = uploadResult.filePath;
    }
    let enrichedProperty: {
      countryId?: number;
      cityId?: number;
      districtId?: number;
      communityId?: number;
      subcommunityId?: number;
      [key: string]: any;
    } = {};
    let countryDescription = '';
    let cityDescription = '';
    let districtDescription = '';
    let communityDescription = '';
    let subCommunityDescription = '';

    if (data.property?.name) {
      console.log("Selected Property from Form Context:", data.property);

      enrichedProperty = await fetchLocationLookupIds({
        country: data.property?.country ?? '',
        city: data.property?.city ?? '',
        district: data.property?.district ?? '',
        community: data.property?.community ?? '',
        subCommunity: data.property?.subCommunity ?? '',
      });
      const [
        countryDescription,
        cityDescription,
        districtDescription,
        communityDescription,
        subCommunityDescription
      ] = await Promise.all([
        fetchDescriptionByLookupId(enrichedProperty.countryId ?? null, 'Country'),
        fetchDescriptionByLookupId(enrichedProperty.cityId ?? null, 'City'),
        fetchDescriptionByLookupId(enrichedProperty.districtId ?? null, 'District'),
        fetchDescriptionByLookupId(enrichedProperty.communityId ?? null, 'Community'),
        fetchDescriptionByLookupId(enrichedProperty.subcommunityId ?? null, 'SubCommunity'),
      ]);
      enrichedProperty = {
        ...enrichedProperty,
        countryDescription,
        cityDescription,
        districtDescription,
        communityDescription,
        subCommunityDescription,
      };
    } else {
      console.warn('No property selected');
    }
    const agentIdRaw = data.hostedBy?.agentId;
    const isValidAgentId = typeof agentIdRaw === 'string' && /^\d+$/.test(agentIdRaw);

    const isAssetsBranch = branch?.toLowerCase() === 'assets';
    const isDubaiBranch = branch?.toLowerCase() === 'dubai';

    let resolvedReferredById;
    if (isAssetsBranch) {
      if (slug === 'psi-assets-yas') {
        resolvedReferredById = '7221';
      } else if (slug === 'psi-assets-reem') {
        resolvedReferredById = '7222';
      } else {
        resolvedReferredById = '7222'; // default for assets
      }
    } else if (isDubaiBranch) {
      resolvedReferredById = isValidAgentId ? agentIdRaw : '3458';
    } else {
      resolvedReferredById = referredbyid || '3458';
    }

    const ReferredToID = isValidAgentId ? agentIdRaw : '3458';
    const ReferredByID = resolvedReferredById;
    const ActivityAssignedTo = isAssetsBranch
      ? '4794'
      : isDubaiBranch
        ? (isValidAgentId ? agentIdRaw : '3458')
        : (referredbyid || '3458');
    console.log('Resolved agentId:', agentIdRaw, '→ Used:', ReferredToID);
    console.log('hostedBy', data.hostedBy);
    const CTM = {
      Buyer: { req: '91212', contact: '3', service: 'Sales' },
      Seller: { req: '91212', contact: '1', service: 'Sales' },
      Tenant: { req: '91213', contact: '4', service: 'Lease' },
      Landlord: { req: '91213', contact: '2', service: 'Lease' },
    } as const;

    const clientLabel = String(data.clientTypeLabel ?? data.requirementType ?? '').trim() as keyof typeof CTM | '';
    if (isAssetsSlug(slug) && clientLabel && CTM[clientLabel]) {
      data.reqType = data.reqType ?? CTM[clientLabel].req;
      data.contactType = data.contactType ?? CTM[clientLabel].contact;
      data.selectedService = data.selectedService ?? CTM[clientLabel].service;
    }
    const payload = {
      ...data,
      ...enrichedProperty,
      remarks: fullRemarks,
      shortRemarks: shortRemark,
      ReferredToID,
      reqType: data.reqType,
      contactType: data.contactType,
      ReferredByID,
      ActivityAssignedTo,
      CountryID: countryDescription,
      StateID: cityDescription,
      CityID: cityDescription,
      DistrictID: districtDescription || '',
      CommunityID: communityDescription || '',
      PropertyID: data.property?.id || '',
      BedroomID: bedroomId,
      emailBody: emailBody,
      utm_source,
      utm_medium,
      utm_campaign,
      uploadedSelfieURL,
      referredbyid,
      sendto,
      branch,
    };
    console.log("Submitted Walk-in Form Payload:", payload);
    try {
      const response = await fetch('/api/external/walkin-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        window.location.href = `/en/thankyou?email=${encodeURIComponent(data.email ?? '')}`;
      } else {
        alert('There was an error submitting the form.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto p-6 space-y-6">
      {showValidationModal && (
        <ValidationModal errors={errors} onClose={() => setShowValidationModal(false)} />
      )}
      <PersonalInformation />
      {walkinFormConfig[slug]?.showClientProfession && <ClientProfession />}
      {walkinFormConfig[slug]?.showContactInformation && <ContactInformation />}
      {isAssetsSlug(slug) ? <ServicesAssets /> : <Services />}
      <HostedBy />
      <div className="text-left">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
