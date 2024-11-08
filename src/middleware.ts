import {
  CsrfError,
  type NextConfigOptions,
  createCsrfProtect,
} from '@edge-csrf/nextjs';
import { type NextRequest, NextResponse, URLPattern } from 'next/server';

import { SiteConfig } from '@/configuration';
import { getSupabaseMiddlewareClient } from '@/lib/supabase/config/middleware';

const CSRF_SECRET_COOKIE = 'csrfSecret';
const NEXT_ACTION_HEADER = 'next-action';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const headers = setRequestHeaders(request);

  const csrfResponse = await withCsrfMiddleware(request, response);

  const handlePattern = matchUrlPattern(request.url);

  // If a pattern handler exists, call it.
  if (handlePattern) {
    const patternHandlerResponse = await handlePattern(request, csrfResponse);

    // If a pattern handler returns a response, return it.
    if (patternHandlerResponse) {
      return patternHandlerResponse;
    }
  }

  // Append the action path to the request headers, which is useful for knowing the action path in server actions.
  if (isServerAction(request)) {
    csrfResponse.headers.set('x-action-path', request.nextUrl.pathname);
  }

  // Merge the new headers with the CSRF response headers
  for (const [key, value] of headers.entries()) {
    csrfResponse.headers.set(key, value);
  }

  // If no pattern handler returned a response, return the session response.
  return csrfResponse;
}

function setRequestHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-correlation-id', crypto.randomUUID());
  headers.set('x-pathname', request.nextUrl.pathname);
  return headers;
}

const getNextConfigOptions = (
  request: NextRequest
): Partial<NextConfigOptions> => {
  return {
    cookie: {
      secure: SiteConfig.isProduction,
      name: CSRF_SECRET_COOKIE,
    },
    // ignore CSRF errors for server actions since protection is built-in
    ignoreMethods: isServerAction(request)
      ? ['POST']
      : // always ignore GET, HEAD, and OPTIONS requests
        ['GET', 'HEAD', 'OPTIONS'],
  };
};

async function withCsrfMiddleware(
  request: NextRequest,
  response = new NextResponse()
) {
  const options = getNextConfigOptions(request);
  const csrfProtect = createCsrfProtect(options);

  try {
    await csrfProtect(request, response);
    return response;
  } catch (error) {
    if (error instanceof CsrfError) {
      return NextResponse.json('Invalid CSRF token', {
        status: 401,
      });
    }

    throw error;
  }
}

const getUrlPatterns = () => {
  return [
    {
      pattern: new URLPattern({ pathname: '/app*' }),
      handler: async (request: NextRequest, response: NextResponse) => {
        const supabase = getSupabaseMiddlewareClient(request, response);
        const { data } = await supabase.auth.getUser();

        const user = data.user;
        const { origin, pathname } = request.nextUrl;

        if (!user) {
          const signIn = SiteConfig.paths.auth.signIn;
          const redirectPath = `${signIn}?next=${pathname}`;

          return NextResponse.redirect(new URL(redirectPath, origin).href);
        }
      },
    },
    {
      pattern: new URLPattern({ pathname: '/onboarding*' }),
      handler: async (request: NextRequest, response: NextResponse) => {
        const supabase = getSupabaseMiddlewareClient(request, response);
        const { data } = await supabase.auth.getUser();

        const user = data.user;
        const { origin, pathname } = request.nextUrl;

        if (!user) {
          const signIn = SiteConfig.paths.auth.signIn;
          const redirectPath = `${signIn}?next=${pathname}`;

          return NextResponse.redirect(new URL(redirectPath, origin).href);
        }
      },
    },
  ];
};

function matchUrlPattern(url: string) {
  const urlPatterns = getUrlPatterns();
  const input = url.split('?')[0];

  for (const urlPattern of urlPatterns) {
    const patternResult = urlPattern.pattern.exec(input);

    if (patternResult !== null && 'pathname' in patternResult) {
      return urlPattern.handler;
    }
  }
}

function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);
  return headers.has(NEXT_ACTION_HEADER);
}

// const getRootUrl = (req: NextRequest) => {
//   return new URL(SiteConfig.paths.root, req.nextUrl.origin).href;
// };

// const getOnboardingUrl = (req: NextRequest) => {
//   return new URL(SiteConfig.paths.onboarding, req.nextUrl.origin).href;
// };
