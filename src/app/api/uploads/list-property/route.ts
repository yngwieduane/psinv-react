import { NextResponse } from "next/server";

export const maxDuration = 60; // Increase timeout to 60 seconds

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];
        const field = formData.get('field') as string;

        if (!field) {
            return NextResponse.json({ error: 'Field is required' }, { status: 400 });
        }

        const folderMap = {
            propertyimages: 'propertyimages',
            spa: 'propertyspa',
            deed: 'propertydeed',
            passport: 'passport',
        };
        const folder = folderMap[field as keyof typeof folderMap] || 'other';

        const fileData: Array<{
            filename: string;
            filedata: string;
            contentType: string;
            fieldName: string;
        }> = [];

        for (const file of files) {
            if (!file || typeof file === 'string') continue;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const timestamp = Date.now();

            // Sanitize filename: remove spaces and special characters
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${timestamp}-${sanitizedName}`;

            // Convert to Base64
            const base64Data = buffer.toString('base64');

            fileData.push({
                filename: fileName,
                filedata: base64Data,
                contentType: file.type,
                fieldName: folder,
            });
        }

        return NextResponse.json({ success: true, fileData });

    } catch (err: any) {
        console.error("Upload failed", err);
        return NextResponse.json({
            success: false,
            error: 'Upload failed',
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }, { status: 500 });
    }
}