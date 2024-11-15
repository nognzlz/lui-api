import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
