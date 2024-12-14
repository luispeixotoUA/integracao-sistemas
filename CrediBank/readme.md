# CrediBank API

## Descrição do Projeto
Este projeto é uma API que permite interagir com o sistema **CrediBank**, permitindo obter um cheque digital, quer através de um **mock** (simulação de dados) quer através do endpoint **real**.

## Funcionalidades
- **Obter de cheque digital (Mock):**
    - Endpoint: `/get-check`
    - Gera uma resposta simulada com um `checkID` e data/hora.

- **Obtenção de cheque digital (Real):**
    - Endpoint: `/api/get-check`
    - Faz um pedido ao endpoint real fornecido e devolve a resposta.

- **Validação de Inputs:**
    - Verifica se o ID da conta é composto por 16 dígitos numéricos.
    - Verifica se o valor a debitar é maior que 0.
  
## Requisitos
- **Java 17+**
- **Maven**
- **Dependências principais:**
    - Spring Boot
    - Spring Web

## Configuração e Execução

### Instalar Dependências
Na raiz do projeto:
```
mvn clean install
```

### Executar o Projeto
Para iniciar a aplicação Spring Boot:
```
mvn spring-boot:run
```

### Endpoints Disponíveis
- **Obter Cheque Digital (Mock):**
    - `GET /get-check`
    - Parâmetros:
        - `accountId`: ID da conta (16 dígitos)
        - `value`: Valor a debitar (inteiro positivo)

- **Obter Cheque Digital (Real):**
    - `GET /api/get-check`
    - Parâmetros:
        - `accountId`: ID da conta (16 dígitos)
        - `value`: Valor a debitar (inteiro positivo)

## Exemplo de Utilização

### Exemplo de Pedido Mock
**Endpoint:**
```
/get-check?accountId=1234567890123456&value=100
```

**Resposta JSON:**
```
{
"date": "2024-12-14T12:34:56",
"checkID": "1234567890123456"
}
```

### Exemplo de Pedido Real
**Endpoint:**
```
/api/get-check?accountId=1234567890123456&value=100
```

**Resposta JSON (se o endpoint real estiver disponível):**
```
{
"date": "2024-12-14T12:34:56",
"checkID": "1234567890123456"
}
```

## Estrutura do Projeto
```
src/
├── main/
│   ├── java/com/is/CrediBank/
│   │   ├── controller/               # Controllers REST
│   │   ├── service/                  # Serviços de Lógica
│   │   ├── model/                    # Modelos de Dados
│   │   └── config/                   # Configurações (RestTemplate)
│   ├── resources/
│       ├── application.properties    # Configurações Spring Boot
│       ├── openapi.yaml              # Documentação Open Api
```
