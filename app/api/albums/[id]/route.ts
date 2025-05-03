// app/api/albums/[id]/route.ts
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const filePath = join(
    process.cwd(),
    'public/dummy_data',
    `${context.params.id}.json`
  );

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }

  const data = readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}
