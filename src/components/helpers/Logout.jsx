import React, { useContext } from 'react'
import Router from 'next/router'
import { AuthContext } from '../../contexts/Auth'
import { MyProfileContext } from '../../contexts/MyProfile'

export default function Logout({ children, className }) {
  const { logout } = useContext(AuthContext)
  const { setMyProfile } = useContext(MyProfileContext)

  const handleLogout = () => {
    if (
      window.confirm(
        'Tem certeza que deseja sair? \n Você poderá voltar quando quiser.'
      )
    ) {
      logout()
      setMyProfile({ id: null })
      Router.push('/')
    }
  }

  return (
    <div className={className} onClick={handleLogout}>
      {children !== undefined ? children : 'Sair'}
    </div>
  )
}
