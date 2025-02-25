import { Injectable } from '@nestjs/common';
import { DirectionsService } from 'src/maps/directions/directions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionsService.getDirections(
        createRouteDto.originId,
        createRouteDto.destinationId,
      );

    const legs = routes[0].legs[0];

    const route = this.prismaService.routes.create({
      data: {
        name: createRouteDto.name,
        origin: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          },
        },
        destination: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          },
        },
        distance: 0,
        duration: 0,
        directions: JSON.parse(
          JSON.stringify({
            available_travel_modes,
            geocoded_waypoints,
            routes,
            request,
          }),
        ),
      },
    });

    return route;
  }

  findAll() {
    const routes = this.prismaService.routes.findMany();

    if (!routes) {
      throw new Error('Routes not found.');
    }

    return routes;
  }

  findOne(id: string) {
    const route = this.prismaService.routes.findUnique({
      where: { id },
    });

    if (!route) {
      throw new Error('Route not found.');
    }

    return route;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
