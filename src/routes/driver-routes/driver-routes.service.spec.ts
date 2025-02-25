import { Test, TestingModule } from '@nestjs/testing';
import { DriverRoutesService } from './driver-routes.service';

describe('DriverRoutesService', () => {
  let service: DriverRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverRoutesService],
    }).compile();

    service = module.get<DriverRoutesService>(DriverRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
