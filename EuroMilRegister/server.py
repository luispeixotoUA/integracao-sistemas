from concurrent import futures
import grpc
from generated import euromil_pb2, euromil_pb2_grpc

# Implementação do serviço EuroMil
class EuromilService(euromil_pb2_grpc.EuromilServicer):
    def RegisterEuroMil(self, request, context):
        print(f"Pedido recebido: key={request.key}, checkid={request.checkid}")
        # Simular uma resposta
        return euromil_pb2.RegisterReply(message="Aposta registada com sucesso!")

# Função para iniciar o servidor gRPC
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))  # Configurar um pool de threads
    euromil_pb2_grpc.add_EuromilServicer_to_server(EuromilService(), server)  # Adicionar o serviço
    server.add_insecure_port('[::]:50051')  # Configurar a porta do servidor
    print("🚀 Servidor gRPC em execução na porta 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()