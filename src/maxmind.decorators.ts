import { Inject } from '@nestjs/common';
import { getMaxmindConnectionToken } from './maxmind.utils'

export const InjectMaxmind = (connection?: string) => {
  return Inject(getMaxmindConnectionToken(connection));
};
