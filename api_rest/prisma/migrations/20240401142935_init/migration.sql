-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_pedido" TEXT NOT NULL,
    "codigo_produto" TEXT NOT NULL,
    "numero_item" INTEGER NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "quantidade_atendida" INTEGER NOT NULL DEFAULT 0,
    "valor_unitario_produto" REAL NOT NULL,
    "pendente" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "ItemPedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "valor_total" REAL NOT NULL DEFAULT 0,
    "saldo_valor" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ItemNota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_nota" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "numero_item" INTEGER NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    CONSTRAINT "ItemNota_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemNota_id_nota_fkey" FOREIGN KEY ("id_nota") REFERENCES "notas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notas" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemPedido_id_pedido_numero_item_key" ON "ItemPedido"("id_pedido", "numero_item");

-- CreateIndex
CREATE UNIQUE INDEX "ItemNota_id_nota_id_pedido_numero_item_key" ON "ItemNota"("id_nota", "id_pedido", "numero_item");
