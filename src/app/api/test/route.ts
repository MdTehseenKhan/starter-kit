'use server';

import { type NextRequest, NextResponse } from 'next/server';

import { throwInternalServerErrorException } from '@/utils/http-exceptions';
import { logger } from '@/utils/logger';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    logger.info('Test API Route');

    return NextResponse.json({
      success: true,
      message: 'Test API Route',
    });
  } catch (error) {
    logger.error({ error }, 'Error getting username availability');
    throwInternalServerErrorException();
  }
};
