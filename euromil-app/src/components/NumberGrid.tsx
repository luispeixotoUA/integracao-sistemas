interface NumberGridProps {
  selectedNumbers: number[]
  setSelectedNumbers: (numbers: number[]) => void
}

export default function NumberGrid({ selectedNumbers, setSelectedNumbers }: NumberGridProps) {
  const handleNumberClick = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num))
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers([...selectedNumbers, num])
    }
  }

  return (
    <div className="grid grid-cols-10 gap-2">
      {Array.from({ length: 50 }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => handleNumberClick(num)}
          disabled={selectedNumbers.length >= 5 && !selectedNumbers.includes(num)}
          className={`
            h-12 w-12 rounded-full font-medium text-lg
            transition-all duration-200 transform
            ${selectedNumbers.includes(num)
              ? 'bg-blue-500 text-white scale-110 rotate-3 shadow-lg'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105'
            }
            ${selectedNumbers.length >= 5 && !selectedNumbers.includes(num)
              ? 'opacity-50 cursor-not-allowed'
              : ''
            }
          `}
        >
          {num}
        </button>
      ))}
    </div>
  )
}