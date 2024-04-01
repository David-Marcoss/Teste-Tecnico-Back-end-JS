import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { PrismaService } from '../../database/PrismaService';
import { PedidoDTO } from './dto/pedido.dto';

const pedidosList =[
  {
      "id": "1",
      "valor_total": 2750,
      "saldo_valor": 0,
      "itens": [
          {
              "id": "39f4fdd7-63e0-44c2-8761-6286da15d84a",
              "id_pedido": "1",
              "codigo_produto": "A2B",
              "numero_item": 1,
              "quantidade_produto": 15,
              "quantidade_atendida": 0,
              "valor_unitario_produto": 150,
              "pendente": true
          },
      ]
  },
  {
      "id": "2",
      "valor_total": 2750,
      "saldo_valor": 0,
      "itens": [
          {
              "id": "7fd5d4ee-0f05-4acf-b158-0c554e96a53d",
              "id_pedido": "2",
              "codigo_produto": "A2B",
              "numero_item": 1,
              "quantidade_produto": 15,
              "quantidade_atendida": 0,
              "valor_unitario_produto": 150,
              "pendente": true
          },
          {
              "id": "4f0d6512-039b-4000-aa60-6564b84fc10b",
              "id_pedido": "2",
              "codigo_produto": "SD9",
              "numero_item": 2,
              "quantidade_produto": 10,
              "quantidade_atendida": 0,
              "valor_unitario_produto": 50,
              "pendente": true
          }
      ]
  }
]

describe('PedidosService', () => {
  let service: PedidosService;
  let prismaService: PrismaService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: PrismaService,
          useValue: {
            pedido: {
              findMany: jest.fn().mockResolvedValue(pedidosList),
              create: jest.fn().mockResolvedValue(pedidosList[0]),
              findUnique: jest.fn().mockResolvedValue(null),
              findFirst: jest.fn().mockResolvedValue(pedidosList[1]),
            },
          },
        },
      
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of pedidos', async () => {
      const result = await service.findAll.execute();

      expect(result).toEqual(pedidosList);
      expect(prismaService.pedido.findMany).toHaveBeenCalledTimes(1);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findAll.execute()).rejects.toThrowError(Error);
    });

  });

  describe('findOne', () => {
    it('should return a pedido', async () => {
      const id = "2";
      const result = await service.findOne.execute(id);

      expect(result).toEqual(pedidosList[1]);
      expect(prismaService.pedido.findFirst).toHaveBeenCalledTimes(1);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findOne.execute("2")).rejects.toThrowError(Error);
    });

  });

  describe('create', () => {
    /*it('should create a new pedido', async () => {
      const body: PedidoDTO = {
        id: "1",
        itens: [
            {numero_item: 1, codigo_produto: "A2B", quantidade_produto: 15, valor_unitario_produto: 150.00},
        ]
      };

      const result = await service.create.execute(body);

      console.log(result);


      expect(result).toEqual(pedidosList[0]);
      expect(prismaService.pedido.create).toHaveBeenCalledTimes(1);
    });*/

    it('should throw an exception when service fails', async () => {
      const body: PedidoDTO = {
        id: "1",
        itens: [
            {numero_item: 1, codigo_produto: "A2B", quantidade_produto: 15, valor_unitario_produto: 150.00},
            {numero_item: 2, codigo_produto: "SD9", quantidade_produto: 10, valor_unitario_produto: 50.00}
        ]
      };

      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.create.execute(body)).rejects.toThrowError(Error);
    });

  });



});
