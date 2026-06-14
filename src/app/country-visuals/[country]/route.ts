import { getCountryBySlug, getCountryFlagImage, getCountryVisualLabel } from "@/lib/visa-data";

function escapeSvg(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function hash(value: string) {
  return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string }> },
) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return new Response("Not found", { status: 404 });
  }

  const seed = hash(country.slug);
  const hue = seed % 360;
  const secondaryHue = (hue + 54) % 360;
  const accentHue = (hue + 138) % 360;
  const visualLabel = titleCase(getCountryVisualLabel(country.countryName));
  const flagImage = getCountryFlagImage(country.slug);
  const dots = Array.from({ length: 28 }, (_, index) => {
    const x = 80 + ((seed * (index + 3)) % 1450);
    const y = 120 + ((seed + index * 83) % 720);
    const radius = 3 + (index % 5);
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="white" opacity="0.16" />`;
  }).join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${escapeSvg(country.countryName)} destination visual</title>
  <desc id="desc">${escapeSvg(visualLabel)} visual for ${escapeSvg(country.countryName)} digital nomad visa content.</desc>
  <defs>
    <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 64% 30%)" />
      <stop offset="46%" stop-color="hsl(${secondaryHue} 62% 42%)" />
      <stop offset="100%" stop-color="hsl(${accentHue} 74% 58%)" />
    </linearGradient>
    <radialGradient id="sun" cx="76%" cy="20%" r="34%">
      <stop offset="0%" stop-color="white" stop-opacity="0.78" />
      <stop offset="100%" stop-color="white" stop-opacity="0" />
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="black" flood-opacity="0.24" />
    </filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#sky)" />
  <rect width="1600" height="1000" fill="url(#sun)" />
  ${dots}
  <path d="M0 680 C240 590 380 640 560 570 C770 490 920 590 1100 520 C1290 450 1420 480 1600 390 V1000 H0 Z" fill="white" opacity="0.18" />
  <path d="M0 760 C250 700 430 760 640 690 C860 618 1020 710 1220 650 C1380 600 1480 610 1600 560 V1000 H0 Z" fill="black" opacity="0.16" />
  <g filter="url(#softShadow)">
    <rect x="980" y="222" width="448" height="326" rx="48" fill="white" opacity="0.2" />
    <rect x="1018" y="258" width="372" height="252" rx="36" fill="white" opacity="0.86" />
    ${
      flagImage
        ? `<image href="${escapeSvg(flagImage)}" x="1018" y="258" width="372" height="252" preserveAspectRatio="xMidYMid slice" />`
        : `<text x="1204" y="424" text-anchor="middle" dominant-baseline="middle" fill="hsl(${hue} 64% 30%)" font-family="Inter, Arial, sans-serif" font-size="128" font-weight="800">${escapeSvg(country.slug.slice(0, 2).toUpperCase())}</text>`
    }
  </g>
  ${
    flagImage
      ? `<image href="${escapeSvg(flagImage)}" x="850" y="520" width="720" height="470" preserveAspectRatio="xMidYMid slice" opacity="0.16" />`
      : ""
  }
  <rect x="72" y="104" width="460" height="64" rx="32" fill="white" opacity="0.16" />
  <text x="104" y="146" fill="white" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="0">Nomad Visa Radar</text>
  <text x="88" y="470" fill="white" font-family="Inter, Arial, sans-serif" font-size="112" font-weight="800" letter-spacing="0">${escapeSvg(country.countryName)}</text>
  <text x="96" y="548" fill="white" opacity="0.88" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="600" letter-spacing="0">${escapeSvg(visualLabel)}</text>
  <rect x="96" y="632" width="560" height="96" rx="28" fill="black" opacity="0.2" />
  <text x="132" y="690" fill="white" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="0">${escapeSvg(country.visaProgramName)}</text>
  <text x="96" y="884" fill="white" opacity="0.82" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="600" letter-spacing="0">Official-source digital nomad visa guide</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
