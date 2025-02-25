import { Test, TestingModule } from '@nestjs/testing';
import { DriverRoutesGateway } from './driver-routes.gateway';

describe('DriverRoutesGateway', () => {
  let gateway: DriverRoutesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverRoutesGateway],
    }).compile();

    gateway = module.get<DriverRoutesGateway>(DriverRoutesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
