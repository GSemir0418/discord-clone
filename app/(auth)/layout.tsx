import React from 'react'

interface Props {
  children: React.ReactNode
}
const AuthLayout: React.FC<Props> = ({ children }) => {
  return <div className='h-full bg-fuchsia-400'>{children}</div>
}
export default AuthLayout