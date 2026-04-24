// src/app/api/gallery/route.ts
import { NextResponse } from 'next/server';

// Lista estática de fotos do imgBB
const IMGBB_PHOTOS = [
  { url: "https://i.ibb.co/NXbj639/20260415-112918.jpg", name: "20260415-112918.jpg" },
  { url: "https://i.ibb.co/394FxMrB/20260407-140411.jpg", name: "20260407-140411.jpg" },
  { url: "https://i.ibb.co/1JvcvfX6/20260407-133730.jpg", name: "20260407-133730.jpg" },
  { url: "https://i.ibb.co/hRj31KH9/20260407-131048.jpg", name: "20260407-131048.jpg" },
  { url: "https://i.ibb.co/Df3fd1Y3/20260407-131036.jpg", name: "20260407-131036.jpg" },
  { url: "https://i.ibb.co/bM2VFTx6/20260401-195748.jpg", name: "20260401-195748.jpg" },
  { url: "https://i.ibb.co/Y7MRjG4s/20260330-143012.jpg", name: "20260330-143012.jpg" },
  { url: "https://i.ibb.co/zT1B5ZVk/20260321-162936.jpg", name: "20260321-162936.jpg" },
  { url: "https://i.ibb.co/twzYnXKf/20260321-162720.jpg", name: "20260321-162720.jpg" },
  { url: "https://i.ibb.co/KxLrkS0v/20260309-115322.jpg", name: "20260309-115322.jpg" },
  { url: "https://i.ibb.co/r2GjPfbG/20260309-115113.jpg", name: "20260309-115113.jpg" },
  { url: "https://i.ibb.co/8yKxdKY/20260309-091044.jpg", name: "20260309-091044.jpg" },
  { url: "https://i.ibb.co/k2gkmH9F/20260309-091031.jpg", name: "20260309-091031.jpg" },
  { url: "https://i.ibb.co/yc5Hs90y/20260223-225425.jpg", name: "20260223-225425.jpg" },
  { url: "https://i.ibb.co/7tL4F6jB/20260223-225017.jpg", name: "20260223-225017.jpg" },
  { url: "https://i.ibb.co/DynX49p/20260223-222949.jpg", name: "20260223-222949.jpg" },
  { url: "https://i.ibb.co/VY7XQMWd/20260223-222739.jpg", name: "20260223-222739.jpg" },
  { url: "https://i.ibb.co/DgDBKfCz/20260221-234210.jpg", name: "20260221-234210.jpg" },
  { url: "https://i.ibb.co/Jj7CP5BS/20260221-225738.jpg", name: "20260221-225738.jpg" },
  { url: "https://i.ibb.co/8gwbg9Fp/20260221-225722.jpg", name: "20260221-225722.jpg" },
  { url: "https://i.ibb.co/zTp373N8/20260220-225245.jpg", name: "20260220-225245.jpg" },
  { url: "https://i.ibb.co/gFD0DmS2/20260220-225204.jpg", name: "20260220-225204.jpg" },
  { url: "https://i.ibb.co/677f0rmS/20260220-224621.jpg", name: "20260220-224621.jpg" },
  { url: "https://i.ibb.co/pBDCH2f0/20260218-194908.jpg", name: "20260218-194908.jpg" },
  { url: "https://i.ibb.co/tpgjHwMK/20260218-194829.jpg", name: "20260218-194829.jpg" },
  { url: "https://i.ibb.co/Wvmsqr7N/20260218-173428.jpg", name: "20260218-173428.jpg" },
  { url: "https://i.ibb.co/N2PWq4fp/20260218-172934.jpg", name: "20260218-172934.jpg" },
  { url: "https://i.ibb.co/YTZDPG4K/20260218-171938.jpg", name: "20260218-171938.jpg" },
  { url: "https://i.ibb.co/XkCxghjr/20251219-120017.jpg", name: "20251219-120017.jpg" },
  { url: "https://i.ibb.co/DnsfhN8/20251216-211518.jpg", name: "20251216-211518.jpg" },
  { url: "https://i.ibb.co/v6H6WBfn/20251216-210746.jpg", name: "20251216-210746.jpg" },
  { url: "https://i.ibb.co/spLMsCS5/20251216-210718.jpg", name: "20251216-210718.jpg" },
];

export async function GET() {
  try {
    // Mapeia as fotos para o formato esperado pelo frontend
    const items = IMGBB_PHOTOS.map((photo) => {
      // Extrai o nome do arquivo e transforma em um título mais amigável
      const title = photo.name
        .replace(".jpg", "")
        .replace(/(\d{8})[-_](\d{6})/, "$1 às $2")
        .replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1");

      return {
        id: photo.url.split("/").pop()?.split(".")[0] || photo.url,
        title: title,
        src: photo.url,
        thumb: photo.url, // imgBB permite usar a mesma URL como thumbnail
        type: "image" as const,
        cat: "GaleriaAero",
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Erro ao gerar galeria:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar a galeria." },
      { status: 500 }
    );
  }
}