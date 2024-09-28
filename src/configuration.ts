import { env } from '@/utils/env';

const environment = env.NEXT_PUBLIC_ENVIRONMENT;
const isProduction = environment === 'production';

export const SiteConfig = {
  site: {
    name: 'Starter',
    description: '...',
    url: env.NEXT_PUBLIC_SITE_URL,
    email: 'support@starter.com',
    twitterUrl: 'https://x.com/starter',
  },
  isProduction,
  environment,
  paths: {
    root: '/',
    app: {
      root: '/app',
    },
    auth: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      resetPassword: '/auth/reset-password',
      resetPasswordRequest: '/auth/reset-password-request',
      callback: '/auth/callback',
    },
    onboarding: `/onboarding`,
    marketing: {
      about: { title: 'About', href: '/about' },
    },
  },
};
