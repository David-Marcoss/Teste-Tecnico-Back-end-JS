import { Test, TestingModule } from '@nestjs/testing';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';
import { NotasDTO } from './dto/notas.dto';

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

const newNota = {
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
      }
  ]

}

describe('NotasController', () => {
  let controller: NotasController;
  let service: NotasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotasController],
      providers: [
        {
          provide: NotasService,
          useValue: {
            create:   {execute: jest.fn().mockResolvedValue(notasList[0])},
            findAll:  {execute: jest.fn().mockResolvedValue(notasList)},
            findOne:  {execute: jest.fn().mockResolvedValue(notasList[0])},
          },
        },
      
      ],
    }).compile();

    controller = module.get<NotasController>(NotasController);
    service = module.get<NotasService>(NotasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all notas', async () => {
      
      const result = await controller.findAll();
      expect(result).toEqual(notasList);
      expect(service.findAll.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findAll()).rejects.toThrowError(Error);
    });
  });

  describe('create', () => {
    it('should create a new nota', async () => {
      const body: NotasDTO = {
        id: "1",
        itens: [
            {id_pedido: "1", numero_item: 1,  quantidade_produto: 15},
            {id_pedido: "1", numero_item: 2,  quantidade_produto: 10}
        ]
      };

      const result = await controller.create(body);
      
      expect(result).toEqual(notasList[0]);
      expect(service.create.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a nota', async () => {
      const id = "1";
      const result = await controller.findOne(id);

      expect(result).toEqual(notasList[0]);
      expect(service.findOne.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findOne("1")).rejects.toThrowError(Error);
    });
  });


});
