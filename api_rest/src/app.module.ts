import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { NotasModule } from './modules/notas/notas.module';

@Module({
  imports: [PedidosModule, NotasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
