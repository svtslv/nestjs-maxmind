import { DynamicModule, Module } from '@nestjs/common';
import { MaxmindCoreModule } from './maxmind.core-module';
import { MaxmindModuleAsyncOptions, MaxmindModuleOptions } from './maxmind.interfaces';

@Module({})
export class MaxmindModule {
  public static forRoot(options: MaxmindModuleOptions, connection?: string): DynamicModule {
    return {
      module: MaxmindModule,
      imports: [MaxmindCoreModule.forRoot(options, connection)],
      exports: [MaxmindCoreModule],
    };
  }

  public static forRootAsync(options: MaxmindModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: MaxmindModule,
      imports: [MaxmindCoreModule.forRootAsync(options, connection)],
      exports: [MaxmindCoreModule],
    };
  }
}
