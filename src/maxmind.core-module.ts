import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { MaxmindModuleAsyncOptions, MaxmindModuleOptions, MaxmindModuleOptionsFactory } from './maxmind.interfaces';
import { createMaxmindConnection, getMaxmindOptionsToken, getMaxmindConnectionToken } from './maxmind.utils'

@Global()
@Module({})
export class MaxmindCoreModule {

  /* forRoot */
  static forRoot(options: MaxmindModuleOptions, connection?: string): DynamicModule {

    const maxmindOptionsProvider: Provider = {
      provide: getMaxmindOptionsToken(connection),
      useValue: options,
    };

    const maxmindConnectionProvider: Provider = {
      provide: getMaxmindConnectionToken(connection),
      useValue: createMaxmindConnection(options),
    };

    return {
      module: MaxmindCoreModule,
      providers: [
        maxmindOptionsProvider,
        maxmindConnectionProvider,
      ],
      exports: [
        maxmindOptionsProvider,
        maxmindConnectionProvider,
      ],
    };
  }

  /* forRootAsync */
  public static forRootAsync(options: MaxmindModuleAsyncOptions, connection: string): DynamicModule {

    const maxmindConnectionProvider: Provider = {
      provide: getMaxmindConnectionToken(connection),
      useFactory(options: MaxmindModuleOptions) {
        return createMaxmindConnection(options)
      },
      inject: [getMaxmindOptionsToken(connection)],
    };

    return {
      module: MaxmindCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), maxmindConnectionProvider],
      exports: [maxmindConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: MaxmindModuleAsyncOptions, connection?: string): Provider[] {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection)
      ];
    }

    return [ 
      this.createAsyncOptionsProvider(options, connection), 
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: MaxmindModuleAsyncOptions, connection?: string): Provider {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getMaxmindOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getMaxmindOptionsToken(connection),
      async useFactory(optionsFactory: MaxmindModuleOptionsFactory): Promise<MaxmindModuleOptions> {
        return await optionsFactory.createMaxmindModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}