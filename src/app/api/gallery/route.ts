// src/app/api/gallery/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 1. Verificação de variáveis de ambiente
  const apiKey = process.env.GOOGLE_API_KEY;
  const folderId = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;

  // Logs para CloudWatch
  console.log('### GALERIA API - Variáveis de ambiente:');
  console.log('### GOOGLE_API_KEY:', apiKey ? 'definida' : 'FALTANDO');
  console.log('### GOOGLE_DRIVE_GALLERY_FOLDER_ID:', folderId ? 'definida' : 'FALTANDO');

  // Se qualquer variável estiver faltando, retorna um JSON informativo
  if (!apiKey || !folderId) {
    const missing = [];
    if (!apiKey) missing.push('GOOGLE_API_KEY');
    if (!folderId) missing.push('GOOGLE_DRIVE_GALLERY_FOLDER_ID');

    console.error('### GALERIA API - Erro de configuração:', missing.join(', '));

    return NextResponse.json(
      {
        error: 'Configuração incompleta no servidor.',
        debug: {
          missingVariables: missing,
          message: 'Verifique as variáveis de ambiente no AWS Amplify (sem aspas, sem secrets) e faça um novo deploy.',
        },
      },
      { status: 500 }
    );
  }

  // 2. Montagem da URL da API do Google Drive
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+(mimeType+contains+'image/'+or+mimeType+contains+'video/')+and+trashed=false&fields=files(id,name,mimeType)&key=${apiKey}`;

  try {
    console.log('### GALERIA API - Buscando arquivos...');
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error('### GALERIA API - Erro na API do Google:', data.error);
      return NextResponse.json(
        { error: data.error?.message || 'Erro na API do Google Drive' },
        { status: res.status }
      );
    }

    // 3. Mapeamento dos arquivos
    const items = (data.files || []).map((file: any) => {
      const isVideo = file.mimeType?.startsWith('video/') || false;
      return {
        id: file.id,
        title: file.name,
        src: `https://drive.google.com/uc?export=view&id=${file.id}`,
        thumb: `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`,
        type: isVideo ? 'video' : 'image',
        cat: 'GaleriaAero',
      };
    });

    console.log(`### GALERIA API - Sucesso: ${items.length} itens encontrados.`);
    return NextResponse.json(items);
  } catch (error) {
    console.error('### GALERIA API - Erro interno:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}