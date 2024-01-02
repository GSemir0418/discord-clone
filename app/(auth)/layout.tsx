import React from 'react'

interface Props {
  children: React.ReactNode
}
const AuthLayout: React.FC<Props> = ({ children }) => {
  return <div className="h-full flex justify-center items-center">{children}</div>
}
export default AuthLayout
