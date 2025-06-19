// /app/api/external/sendJobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobid = formData.get('jobid') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const nationality = formData.get('nationality') as string;
    const hearAbout = formData.get('hearAbout') as string;
    const resume = formData.get('resume') as File | null;

    const fullName = `${firstName} ${lastName}`.trim();
    let resumePayload;
    if (resume) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      resumePayload = {
        filename: resume.name,
        filedata: buffer.toString('base64'),
      };
    }

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        job_id: jobid,
        name: fullName,
        partner_name: fullName,
        partner_phone: phone,
        email: email,
        applied_date: new Date().toLocaleDateString('en-US', {
          timeZone: 'Asia/Dubai',
        }),
        nationality: nationality,
        source_of_application: hearAbout,
        Resume: resumePayload,
        all_details_data: {
          academic_information: [],
          certificate_details: [],
          professional_details: [],
          family_member: [],
          salary_details: [],
          awards_achievements: [],
          refer_friends: [],
        },
      },
    };

    const response = await fetch(
      `https://psi-hcm.com/api/jobs/apply?job_id=${jobid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        body: JSON.stringify(payload),
      }
    );

const result = await response.json();
return NextResponse.json(result);

  } catch (error) {
    console.error('Error submitting job application:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
