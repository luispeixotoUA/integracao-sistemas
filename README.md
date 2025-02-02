# Integração de Sistemas
Tarefa 5 - Atividade II: aplicações cliente REST | gRPC

## Descrição do Trabalho
Este repositório contém a implementação de dois clientes um API RESTs e outro gRPCs.
Cada cliente é responsável por comunicar com um sistema diferente, utilizando tecnologias específicas.

### Sistemas Implementados
1. **CrediBank (REST API)**
   - Um sistema de pagamento online que permite obter um cheque digital, utilizado depois para realizar apostas noutra plataforma.
   - Cliente implementado em **Java Spring Boot**.
   - Inclui validação de inputs, logs detalhados e documentação no ReadMe e OpenAPI (Swagger) na pasta resources.
    - Mais detalhes no ReadMe.

2. **EuroMilRegister (gRPC)**
   - Um sistema para registo de apostas online no jogo Euromilhões.
   - Cliente implementado em **Python** com gRPC.
   - Inclui um servidor de testes (mock) para validação local.
   - Mais detalhes no ReadMe.

3. **EuroMil (Next.js)**
   - Uma aplicação web para seleção de números e registo de apostas no Euromilhões.
   - Integração com os sistemas CrediBank e EuroMilRegister.
   - Mais detalhes no ReadMe.


---

## 👥 Autor
- **Luís Peixoto** - *2402741*