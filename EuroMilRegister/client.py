import grpc
from generated import euromil_pb2, euromil_pb2_grpc

def register_euromil(key, checkid):
    # Conectar ao servidor gRPC
    with grpc.insecure_channel('localhost:50051') as channel:  # Conectar ao servidor na porta 50051 (servidor local de teste)
        stub = euromil_pb2_grpc.EuromilStub(channel)
        # Criar a mensagem de requisição
        request = euromil_pb2.RegisterRequest(key=key, checkid=checkid)
        # Enviar a requisição e receber a resposta
        response = stub.RegisterEuroMil(request)
    return response.message

if __name__ == "__main__":
    key = "1,2,3,4,5+6,7"
    checkid = "1234567890123456"
    result = register_euromil(key, checkid)
    print(f"Resultado do registo: {result}")