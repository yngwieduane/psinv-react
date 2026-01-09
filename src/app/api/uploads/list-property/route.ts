import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { promises as fs } from "fs";
import path from "path";

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
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'list-your-property', folder);

        try {
            await fs.access(uploadDir);
        } catch (error) {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const fileUrls: string[] = [];

        for (const file of files) {
            if (!file || typeof file === 'string') continue;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const timestamp = Date.now();

            // Sanitize filename: remove spaces and special characters
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${timestamp}-${sanitizedName}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);
            fileUrls.push(`/uploads/list-your-property/${folder}/${fileName}`);

        }
        return NextResponse.json({ success: true, fileUrls });

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