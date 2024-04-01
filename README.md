# Teste-Tecnico-Back-end-JS
 Teste Técnico Back end, objetivo: Criar um programa que cruza pedidos e notas gerando uma listagem de itens pendentes dos pedidos

## Solução

Para solucionar o problemas segui duas abordagens distintas a primeira utilizo apenas o javascript padrão para solucionar o problema por meio de funções e classes e a sengunda soluciono o problema utilizando uma API Rest.

-  A solução 1 está na pasta Teste
-  A solução 2 está na pasta api_rest

## Aspectos Técnicos

### Caso e Dados de Entrada

As notas são registros dos itens dos pedidos que foram comprados. As pastas de Pedidos e Notas estão inclusas no arquivo zipado fornecido. Cada pasta contém arquivos de texto no formato UTF-8. Cada arquivo representa um pedido ou uma nota, dependendo da pasta em que se encontra. O ID de cada pedido é o nome do arquivo.

Cada linha dos arquivos é um objeto JSON que contém:

- **Pedidos**: 
  - `número_item`: identificador de um item dentro de um pedido (valor numérico, inteiro e positivo)
  - `código_produto`: código alfanumérico do produto
  - `quantidade_produto`: quantidade total do item (valor numérico, inteiro e positivo)
  - `valor_unitário_produto`: valor unitário do produto (valor numérico e positivo, com até 2 casas decimais)

- **Notas**: 
  - `id_pedido`: número presente no nome de um dos arquivos de pedidos (valor alfanumérico)
  - `número_item`: número do item (valor numérico, inteiro e positivo)
  - `quantidade_produto`: quantidade do item registrado na nota (valor numérico, inteiro e positivo)

### Cruzamento de Pedidos e Notas

#### Validações de Pedidos
- Verificar se os valores correspondem aos tipos descritos.
- Identificar repetições de `número_item` dentro do mesmo pedido.
- Garantir que não falte nenhum `número_item` (deve haver todos os números consecutivos de 1 ao maior número de item do pedido).

#### Validações de Notas
- Verificar se os valores correspondem aos tipos descritos.
- Garantir que sejam informados pares de `id_pedido` e `número_item` que realmente existam.
- Verificar se a soma das quantidades informadas para um item não ultrapassa a quantidade do item registrado no pedido.

### Geração da Listagem de Itens Pendentes

- Percorrer as notas e identificar os itens pendentes para cada pedido. Um item está pendente se não teve toda a sua quantidade atendida pela soma das quantidades informadas nas notas.
- Gravar um arquivo de texto com a listagem dos pedidos pendentes. Para cada pedido pendente, informar:
  - O valor total do pedido (soma dos valores totais dos seus itens)
  - O saldo do valor (soma dos valores correspondentes ao saldo de quantidade de cada item pendente)
  - Uma lista dos itens pendentes, na qual cada item pendente exibe o número do item e o saldo da quantidade (quanto falta de quantidade do produto para que o item não fique pendente).
