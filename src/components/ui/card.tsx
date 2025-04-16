import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'

interface CardProps {
  title: string
  value: string
  change: string
}

export function Card({ title, value, change }: CardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      <div className={`mt-2 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <ArrowDownIcon className="h-4 w-4" />
        )}
        <span className="ml-1 text-sm font-medium">{change}</span>
      </div>
    </div>
  )
}