import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of EU country ISO codes (alpha-2)
const EU_COUNTRIES = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','CH' // incl. EEA/CH
]);

// US states with privacy laws requiring consent/opt-out emphasis
const REGULATED_US_STATES = new Set(['CA','VA','CO','UT','CT']);

export function middleware(request: NextRequest) {
  // Use Vercel Edge headers (or similar) when available
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const region = (request.headers.get('x-vercel-ip-country-region') || '').toUpperCase(); // US state code

  const regulated = (country === 'US' && REGULATED_US_STATES.has(region)) || EU_COUNTRIES.has(country);

  const response = NextResponse.next();

  // Set a short-lived cookie (12 hours) to avoid running geo logic client-side each navigation
  if (regulated && !request.cookies.get('hb_reg')) {
    response.cookies.set('hb_reg', '1', { path: '/', maxAge: 60 * 60 * 12 });
  }
  if (!regulated && request.cookies.get('hb_reg')) {
    // Clear if previously set
    response.cookies.set('hb_reg', '0', { path: '/', maxAge: 60 * 5 });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};