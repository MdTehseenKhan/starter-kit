'use server';

import { NextRequest, NextResponse } from 'next/server';

import { getLogger } from '@/utils/logger';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const logger = getLogger();
  try {
    logger.info(`Test API Route`);

    return NextResponse.json({
      success: true,
      message: 'Test API Route',
    });
  } catch (error) {
    logger.error({ error }, `Error getting username availability`);
    // throwInternalServerErrorException();
  }
};
