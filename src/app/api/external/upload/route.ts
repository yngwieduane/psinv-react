import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // ✅ sanitize + make unique
    const original = file.name || 'upload';
    const safeName = original.replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = path.extname(safeName);
    const base = path.basename(safeName, ext);
    const unique = `${base}-${Date.now()}-${Math.random().toString(16).slice(2)}${ext || ''}`;

    const fullPath = path.join(uploadDir, unique);
    fs.writeFileSync(fullPath, buffer);

    return NextResponse.json({ success: true, filePath: `/uploads/${unique}` });
  } catch (err: any) {
    console.error('Upload API error:', err);
    return NextResponse.json(
      { error: 'Upload failed', detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
