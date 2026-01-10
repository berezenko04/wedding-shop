import { SetMetadata } from '@nestjs/common';

export const DEV_ONLY_KEY = 'dev_only';
export const DevOnly = () => SetMetadata(DEV_ONLY_KEY, true);
