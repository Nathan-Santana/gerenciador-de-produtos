import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Produto } from '@/types/produto';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'produtos.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const produtos: Produto[] = JSON.parse(fileContents);
    return NextResponse.json(produtos);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

