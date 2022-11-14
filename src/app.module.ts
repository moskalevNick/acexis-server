import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule } from './modules/client/client.module';
import { ExisModule } from './modules/exis/exis.module';
import { ImageModule } from './modules/image/image.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { VisitModule } from './modules/visit/visit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    ClientModule,
    ExisModule,
    ImageModule,
    UsersModule,
    AuthModule,
    VisitModule,
  ],
})
export class AppModule {}
