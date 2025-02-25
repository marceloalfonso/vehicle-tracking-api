import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { RoutesService } from '../routes.service';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DriverRoutesGateway {
  constructor(private routesService: RoutesService) {}

  @SubscribeMessage('client:positions')
  async handleMessage(client: any, payload: any) {
    const { routeId } = payload;

    const route = await this.routesService.findOne(routeId);
    // @ts-expect-error
    const { steps } = route.directions.routes[0].legs[0];

    for (const step of steps) {
      const { lat: startLat, lng: startLng } = step.start_location;
      const { lat: endLat, lng: endLng } = step.end_location;

      client.emit(`server:positions/${routeId}`, {
        routeId,
        lat: startLat,
        lng: startLng,
      });
      client.broadcast.emit('server:positions', {
        routeId,
        lat: startLat,
        lng: startLng,
      });

      await sleep(2000);

      client.emit(`server:positions/${routeId}`, {
        routeId,
        lat: endLat,
        lng: endLng,
      });
      client.broadcast.emit('server:positions', {
        routeId,
        lat: endLat,
        lng: endLng,
      });

      await sleep(2000);
    }
  }
}
