// src/app/api/gallery/route.ts (versão API Key)
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('### KEY:', process.env.GOOGLE_API_KEY ? 'existe' : 'faltando');
  console.log('### FOLDER:', process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID ? 'existe' : 'faltando');

  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+(mimeType+contains+'image/'+or+mimeType+contains+'video/')+and+trashed=false&fields=files(id,name,mimeType)&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error('Erro na API do Google Drive:', data.error);
      return NextResponse.json(
        { error: data.error?.message || 'Erro na API do Google Drive' },
        { status: res.status }
      );
    }

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

    return NextResponse.json(items);
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}