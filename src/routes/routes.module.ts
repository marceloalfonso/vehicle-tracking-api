import { Module } from '@nestjs/common';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { DriverRoutesService } from './driver-routes/driver-routes.service';
import { DriverRoutesGateway } from './driver-routes/driver-routes.gateway';

@Module({
  imports: [MapsModule],
  controllers: [RoutesController],
  providers: [RoutesService, DriverRoutesService, DriverRoutesGateway],
})
export class RoutesModule {}
