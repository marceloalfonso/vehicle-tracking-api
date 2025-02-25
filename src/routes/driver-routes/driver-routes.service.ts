import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DriverRoutesService {
  constructor(private prismaService: PrismaService) {}

  async processRoute(dto: { route_id: string; lat: number; lng: number }) {
    const driverRoute = await this.prismaService.driverRoutes.upsert({
      where: { route_id: dto.route_id },
      include: {
        route: true,
      },
      create: {
        route_id: dto.route_id,
        positions: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      update: {
        positions: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });

    return driverRoute;
  }
}
