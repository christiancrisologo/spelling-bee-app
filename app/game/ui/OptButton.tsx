import { ReactNode } from 'react'

export type OptButtonType = {
  onClick: () => void
  children: ReactNode
}

const OptButton = (props: OptButtonType) => {
  const { onClick, children } = props

  return (
    <button
      className="flex grow bg-white p-4 m-1 border-gray-500 hover:border-blue-500 hover:text-blue-500 border-gray-40 border-4 rounded-xl text-lg font-bold text-center"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default OptButton
