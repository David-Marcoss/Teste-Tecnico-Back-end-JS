import { Test, TestingModule } from '@nestjs/testing';
import { NotasService } from './notas.service';
import { PrismaService } from '../../database/PrismaService';

const notasList =[
  {
      "id": "1",
      "itens": [
          {
              "id": "94f6c99f-9f62-4b1c-8c61-8a2953d95b8f",
              "id_nota": "1",
              "id_pedido": "1",
              "numero_item": 1,
              "quantidade_produto": 15
          },
          {
              "id": "c1f5bb8d-c7d2-4643-adb7-315e38067bc2",
              "id_nota": "1",
              "id_pedido": "1",
              "numero_item": 2,
              "quantidade_produto": 10
          },
          {
              "id": "3f03bf07-dcd5-419-a694-9a2b96493c11",
              "id_nota": "1",
              "id_pedido": "18",
              "numero_item": 1,
              "quantidade_produto": 5
          },
          {
              "id": "b3c9f5c5-0daf-444c-9270-b393f5ea8d6f",
              "id_nota": "1",
              "id_pedido": "18",
              "numero_item": 2,
              "quantidade_produto": 8
          },
          {
              "id": "90f2fb47-2c44-4bed-b6ae-12d2fb9e5ba5",
              "id_nota": "1",
              "id_pedido": "19",
              "numero_item": 1,
              "quantidade_produto": 3
          },
          {
              "id": "7206c91e-ab5e-4e10-87cc-f7e61301f344",
              "id_nota": "1",
              "id_pedido": "19",
              "numero_item": 2,
              "quantidade_produto": 1
          }
      ]
  }
]


describe('NotasService', () => {
  let service: NotasService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotasService,
        {
          provide: PrismaService,
          useValue: {
            notas: {
              findMany:   jest.fn().mockResolvedValue(notasList),
              create:     jest.fn().mockResolvedValue(notasList[0]),
              findUnique: jest.fn().mockResolvedValue(notasList[0]),
              findFirst:  jest.fn().mockResolvedValue(notasList[0]),
            },
          },
        },
      
      ],
    }).compile();

    service = module.get<NotasService>(NotasService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of notas', async () => {
      const result = await service.findAll.execute();

      expect(result).toEqual(notasList);
      expect(prismaService.notas.findMany).toHaveBeenCalledTimes(1);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findAll.execute()).rejects.toThrowError(Error);
    });

  });

  describe('findOne', () => {
    it('should return a notas', async () => {
      const id = "2";
      const result = await service.findOne.execute(id);

      expect(result).toEqual(notasList[0]);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findOne.execute("2")).rejects.toThrowError(Error);
    });

  });
});
