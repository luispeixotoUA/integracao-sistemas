# Cliente gRPC EuroMilRegister

## Descrição do Projeto
Este projeto implementa um cliente **gRPC** para o sistema **EuroMilRegister**, que permite registar apostas online no jogo Euromilhões. O cliente comunica com o servidor através do método `RegisterEuroMil`, enviando uma chave (**key**) e um ID de cheque digital (**checkid**) e recebe uma mensagem de confirmação.

Inclui também um **servidor de testes** (mock) para validar o funcionamento do cliente localmente.

---

## Funcionalidades
- **Cliente gRPC:**
  - Envia uma mensagem de registo para o servidor.
  - Recebe uma mensagem de sucesso ou erro como resposta.

- **Servidor de Testes (Mock):**
  - Simula o servidor oficial EuroMilRegister.
  - Responde ao cliente com mensagens simuladas de sucesso.

---

## Requisitos
- **Python 3.8+**
- **Bibliotecas Necessárias:**
  - grpcio
  - grpcio-tools

Para instalar as dependências:
```
pip install -r requirements.txt
```

---

## Configuração e Execução

### Passos:
1. **Instalar Dependências:**
   Certificar que possui um ambiente virtual ativado e as dependências instaladas:
   ```
   pip install -r requirements.txt
   ```

2. **Iniciar o Servidor de Testes:**
   Executar o servidor gRPC:
   ```
   python server.py
   ```
   O servidor estará disponível na porta `50051`.

3. **Executar o Cliente:**
   Em outro terminal, executar o cliente:
   ```
   python client.py
   ```

### Exemplos:
- **Entrada do Cliente:**
  - **Key:** Chave de aposta no formato `n1,n2,n3,n4,n5+e1,e2`, onde:
    - `n1, n2, n3, n4, n5` são os 5 números principais.
    - `e1, e2` são as 2 estrelas.
  - **Exemplo:** `1,2,3,4,5+6,7`
  - **CheckID:** `1234567890123456`
- **Resposta Esperada:**
  ```
  Resultado do registo: Aposta registada com sucesso!
  ```

---

## Estrutura do Projeto
```
EuroMilRegister/
├── client.py              # Implementação do cliente gRPC
├── server.py              # Implementação do servidor gRPC mock
├── euromil.proto          # Definição do serviço gRPC
├── generated/             # Pasta com as classes geradas pelo protoc
│   ├── euromil_pb2.py     # Classes geradas para as mensagens e serviços gRPC
│   └── euromil_pb2_grpc.py # Classes geradas para a lógica do serviço gRPC
├── readme.md              # Documentação do projeto
├── requirements.txt       # Lista de dependências do projeto
```

---

## Comando para Gerar Ficheiros a partir do `.proto`
Se for necessário gerar novamente os ficheiros gRPC:
```
python -m grpc_tools.protoc -I. --python_out=generated --grpc_python_out=generated euromil.proto
```

---

## Testes
Para testar o cliente:
1. O servidor (`server.py`) tem de estar em execução.
2. Ao executar o cliente (`client.py`) establece comunicação e informa se a aposta foi registada com sucesso.
3. Para testar o cliente com o servidor real, é necessário alterar o endereço do servidor no cliente (`client.py`).

### Logs do Cliente
```
Resultado do registo: Aposta registada com sucesso!
```

### Logs do Servidor
```
🚀 Servidor gRPC em execução na porta 50051...
Pedido recebido: key=1,2,3,4,5+6,7, checkid=1234567890123456
```


---

## Trabalho Realizado por:
- **Luís Peixoto 2402741**