import { MaxmindModuleOptions } from "./maxmind.interfaces";
import {
  MAXMIND_MODULE_CONNECTION,
  MAXMIND_MODULE_OPTIONS_TOKEN,
  MAXMIND_MODULE_CONNECTION_TOKEN
} from './maxmind.constants';
import * as fs from 'fs';
import { Reader } from 'maxmind';
import { Maxmind } from './maxmind.interfaces'

export function getMaxmindOptionsToken(connection: string): string {
  return `${ connection || MAXMIND_MODULE_CONNECTION }_${ MAXMIND_MODULE_OPTIONS_TOKEN }`;
}

export function getMaxmindConnectionToken(connection: string): string {
  return `${ connection || MAXMIND_MODULE_CONNECTION }_${ MAXMIND_MODULE_CONNECTION_TOKEN }`;
}

export function createMaxmindConnection(options: MaxmindModuleOptions): Maxmind {
  const { config } = options;
  const buffer = fs.readFileSync(config.file);
  const reader = new Reader(buffer, config.opts);
  const asn = (ip: string) => reader.get(ip);
  const city = (ip: string) => reader.get(ip);
  const country = (ip: string) => reader.get(ip);
  return { asn, city, country } as Maxmind
}
