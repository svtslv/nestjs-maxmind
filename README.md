# NestJS Maxmind

<a href="https://www.npmjs.com/package/nestjs-maxmind"><img src="https://img.shields.io/npm/v/nestjs-maxmind.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-maxmind"><img src="https://img.shields.io/npm/l/nestjs-maxmind.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates Maxmind with Nest

## Installation

```sh
npm install nestjs-maxmind maxmind
```

You can also use the interactive CLI

```sh
npx nestjs-modules
```

## Examples

```sh
npx geoip2-cli --download --licenseKey=MAXMIND_LICENSE_KEY
```

### MaxmindModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MaxmindModule } from 'nestjs-maxmind';
import { AppController } from './app.controller';
import { join } from 'path';

@Module({
  imports: [
    MaxmindModule.forRoot({
      config: {
        file: join(process.cwd(), 'geoip2-cli', 'GeoLite2-City.mmdb'),
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### MaxmindModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MaxmindModule } from 'nestjs-maxmind';
import { AppController } from './app.controller';
import { join } from 'path';

@Module({
  imports: [
    MaxmindModule.forRootAsync({
      useFactory: () => ({
        config: {
          file: join(process.cwd(), 'geoip2-cli', 'GeoLite2-City.mmdb'),
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectMaxmind(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectMaxmind, Maxmind } from 'nestjs-maxmind';

@Controller()
export class AppController {
  constructor(
    @InjectMaxmind() private readonly maxmind: Maxmind,
  ) {}

  @Get()
  getHello() {
    return this.maxmind.city('8.8.8.8');
  }
}
```

## License

MIT
