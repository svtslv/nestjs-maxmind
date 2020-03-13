import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { OpenOpts, CityResponse, CountryResponse, AsnResponse } from 'maxmind';

export interface Maxmind {
  asn: (ip: string) => AsnResponse,
  city: (ip: string) => CityResponse,
  country: (ip: string) => CountryResponse,
}

export interface MaxmindModuleOptions {
  config: {
    file: string,
    opts?: OpenOpts
  };
}

export interface MaxmindModuleOptionsFactory {
  createMaxmindModuleOptions(): Promise<MaxmindModuleOptions> | MaxmindModuleOptions;
}

export interface MaxmindModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MaxmindModuleOptionsFactory>;
  useExisting?: Type<MaxmindModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MaxmindModuleOptions> | MaxmindModuleOptions;
}
