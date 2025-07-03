import { NextResponse } from "next/server";
import { writeFile} from "fs/promises";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];
        const field = formData.get('field') as string;

        if(!field) {
            return NextResponse.json({error: 'Field is required'}, { status: 400 });
        }
        const folderMap = {
            propertyimages:'propertyimages',
            spa:'propertyspa',
            deed:'propertydeed',
            passport:'passport',
        };
        const folder = folderMap[field as keyof typeof folderMap] || 'other';
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);

        try{
            await fs.access(uploadDir);
        } catch(error) {
            await fs.mkdir(uploadDir, {recursive:true});
        }

        const fileUrls : string[] = [];

        for(const file of files) {
            if(!file || typeof file === 'string') continue;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const timestamp = Date.now();
            const fileName = `${timestamp}-${file.name}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);
            fileUrls.push(`/uploads/${folder}/${fileName}`);

        }
        return NextResponse.json({ success: true, fileUrls });

    } catch(err) {
        console.error("Upload failed", err);
        return NextResponse.json({ success:false, error: 'Upload failed' }, { status: 500 });
    }
}