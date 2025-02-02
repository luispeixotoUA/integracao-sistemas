interface AccountInputProps {
  accountId: string
  setAccountId: (id: string) => void
}

export default function AccountInput({ accountId, setAccountId }: AccountInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="accountId" className="block text-sm font-medium text-gray-700">
        ID da Conta CrediBank
      </label>
      <input
        type="text"
        id="accountId"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value.replace(/\D/g, '').slice(0, 16))}
        className="block text-black w-full rounded-lg border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500
                 text-lg font-mono tracking-wider py-3 px-4"
        maxLength={16}
        placeholder="Digite os 16 dígitos"
      />
      <div className="h-6">
        {accountId.length > 0 && accountId.length < 16 && (
          <p className="text-sm text-red-500">
            Faltam {16 - accountId.length} dígitos
          </p>
        )}
      </div>
    </div>
  )
}