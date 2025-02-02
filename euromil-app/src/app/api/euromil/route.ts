import { NextResponse } from 'next/server'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'

// Carregar o arquivo proto
const PROTO_PATH = path.resolve('./src/proto/euromil.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const euromil = protoDescriptor.euromil

export async function POST(request: Request) {
  try {
    const { key, checkID } = await request.json()
    
    console.log("Recebido pedido para registrar:", { key, checkID })

    // Criar cliente gRPC
    const client = new euromil.Euromil(
      'localhost:50051',
      grpc.credentials.createInsecure()
    )

    // Fazer a chamada gRPC em uma Promise
    const response = await new Promise((resolve, reject) => {
      client.RegisterEuroMil({ key, checkid: checkID }, (err: any, response: any) => {
        if (err) reject(err)
        else resolve(response)
      })
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao processar aposta' },
      { status: 500 }
    )
  }
}