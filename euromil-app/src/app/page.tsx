'use client'

import { Fragment, useState } from 'react'
import confetti from 'canvas-confetti'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import NumberGrid from '@/components/NumberGrid'
import StarGrid from '@/components/StarGrid'
import AccountInput from '@/components/AccountInput'

type Message = {
  type: 'success' | 'error'
  text: string
}

type Receipt = {
  accountId: string
  checkID: string
  numbers: {
    main: string
    stars: string
  }
  date: string
} | null

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [accountId, setAccountId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)
  const [receipt, setReceipt] = useState<Receipt>(null)

  const triggerConfetti = () => {
    // Centro
    confetti({
      scalar:1.5,
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    })

    // Esquerda
    setTimeout(() => {
      confetti({
        scalar:1.5,
        particleCount: 250,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.8 }
      })
    }, 200)

    // Direita
    setTimeout(() => {
      confetti({
        scalar:1.5,
        particleCount: 250,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.8 }
      })
    }, 200)

    // Chuva de confetis
    setTimeout(() => {
      confetti({
        scalar:1.5,
        particleCount: 500,
        spread: 160,
        origin: { y: 0.2 }
      })
    }, 500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  const handleSubmit = async () => {
    if (selectedNumbers.length !== 5 || selectedStars.length !== 2 || accountId.length !== 16) {
      return
    }

    setLoading(true)
    try {
      const credibankResponse = await fetch(
        `/api/credibank?accountId=${accountId}&value=10`
      )

      if (!credibankResponse.ok) {
        throw new Error('Erro ao obter cheque digital')
      }

      const data = await credibankResponse.json()
      console.log("Resposta do CrediBank:", data)

      const euromilResponse = await fetch('/api/euromil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: `${selectedNumbers.sort((a,b) => a-b).join(',')},+${selectedStars.sort((a,b) => a-b).join(',')}`,
          checkID: data.checkID
        })
      })

      if (!euromilResponse.ok) {
        throw new Error('Erro ao registar aposta')
      }

      setReceipt({
        accountId,
        checkID: data.checkID,
        numbers: {
          main: selectedNumbers.sort((a,b) => a-b).join(', '),
          stars: selectedStars.sort((a,b) => a-b).join(', ')
        },
        date: formatDate(data.date)
      })

      triggerConfetti()
      setMessage({ type: 'success', text: 'Aposta registada com sucesso!' })

      // Reset form
      setSelectedNumbers([])
      setSelectedStars([])
      setAccountId('')
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Erro ao processar aposta' })
    } finally {
      setLoading(false)
    }
    
  }


  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600">EuroMil</h1>
            <p className="text-gray-600 mt-2">Escolha seus números da sorte</p>
          </div>

          {/* Números principais */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 flex justify-between items-center">
              <span>Escolha 5 números</span>
              <span className="text-blue-500">{selectedNumbers.length}/5</span>
            </h2>
            <NumberGrid 
              selectedNumbers={selectedNumbers}
              setSelectedNumbers={setSelectedNumbers}
            />
          </div>

          {/* Estrelas */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 flex justify-between items-center">
              <span>Escolha 2 estrelas</span>
              <span className="text-yellow-500">{selectedStars.length}/2</span>
            </h2>
            <StarGrid 
              selectedStars={selectedStars}
              setSelectedStars={setSelectedStars}
            />
          </div>

          {/* Account Input */}
          <AccountInput 
            accountId={accountId}
            setAccountId={setAccountId}
          />

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || selectedNumbers.length !== 5 || selectedStars.length !== 2 || accountId.length !== 16}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all
              ${loading || selectedNumbers.length !== 5 || selectedStars.length !== 2 || accountId.length !== 16
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl'
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processando...
              </div>
            ) : (
              'Fazer Aposta'
            )}
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      <Transition.Root show={receipt !== null} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => setReceipt(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900">
                        Aposta Registada com Sucesso!
                      </Dialog.Title>

                      <div className="mt-8 bg-gray-50 rounded-lg p-6 space-y-4 text-left">
                        <div className="border-b border-gray-200 pb-4">
                          <p className="text-sm text-gray-500">Número da Conta</p>
                          <p className="text-lg text-black font-mono">{receipt?.accountId}</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                          <p className="text-sm text-gray-500">Número do Cheque</p>
                          <p className="text-lg text-black font-mono">{receipt?.checkID}</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-4">
                          <p className="text-sm text-gray-500">Números da Aposta</p>
                          <div>
                            <p className="text-lg text-black font-bold">Números: {receipt?.numbers.main}</p>
                            <p className="text-lg text-black font-bold">Estrelas: {receipt?.numbers.stars}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Data</p>
                          <p className="text-lg text-black">{receipt?.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      onClick={() => setReceipt(null)}
                    >
                      Fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </main>
  )
}