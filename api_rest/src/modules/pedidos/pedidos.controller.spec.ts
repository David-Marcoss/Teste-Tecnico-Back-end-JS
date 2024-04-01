import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { PedidoDTO } from './dto/pedido.dto';

const newPedido = {
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
      {
          "id": "e2cab36c-0377-4451-b901-5e4c2e8d1a1c",
          "id_pedido": "1",
          "codigo_produto": "SD9",
          "numero_item": 2,
          "quantidade_produto": 10,
          "quantidade_atendida": 0,
          "valor_unitario_produto": 50,
          "pendente": true
      }
  ]
}

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
          {
              "id": "e2cab36c-0377-4451-b901-5e4c2e8d1a1c",
              "id_pedido": "1",
              "codigo_produto": "SD9",
              "numero_item": 2,
              "quantidade_produto": 10,
              "quantidade_atendida": 0,
              "valor_unitario_produto": 50,
              "pendente": true
          }
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
describe('PedidosController', () => {
  let controller: PedidosController;
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        {
          provide: PedidosService,
          useValue: {
            create:   {execute: jest.fn().mockResolvedValue(newPedido)},
            findAll:  {execute: jest.fn().mockResolvedValue(pedidosList)},
            findOne:  {execute: jest.fn().mockResolvedValue(pedidosList[0])},
          },
        },
      
      ],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pedidos', async () => {
      
      const result = await controller.findAll();
      expect(result).toEqual(pedidosList);
      expect(service.findAll.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findAll()).rejects.toThrowError(Error);
    });
  });

  describe('create', () => {
    it('should create a new pedido', async () => {
      const body: PedidoDTO = {
        id: "1",
        itens: [
            {numero_item: 1, codigo_produto: "A2B", quantidade_produto: 15, valor_unitario_produto: 150.00},
            {numero_item: 2, codigo_produto: "SD9", quantidade_produto: 10, valor_unitario_produto: 50.00}
        ]
      };

      const result = await controller.create(body);
      
      expect(result).toEqual(newPedido);
      expect(service.create.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      const body: PedidoDTO = {
        id: "1",
        itens: [
            {numero_item: 1, codigo_produto: "A2B", quantidade_produto: 15, valor_unitario_produto: 150.00},
            {numero_item: 2, codigo_produto: "SD9", quantidade_produto: 10, valor_unitario_produto: 50.00}
        ]
      };

      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.create(body)).rejects.toThrowError(Error);
    });
  });

  describe('findOne', () => {
    it('should return one pedido', async () => {
      const id = '1';
      const result = await controller.findOne(id);
      expect(result).toEqual(pedidosList[0]);
      expect(service.findOne.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      const id = '1';
      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findOne(id)).rejects.toThrowError(Error);
    });
  });



});
