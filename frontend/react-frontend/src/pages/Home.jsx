import React, { useState } from 'react'
import Auth from '../components/Auth'
import Dashboard from '../components/Dashboard'

export default function Home(){
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('sa_user')
    return u ? JSON.parse(u) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('sa_token') || null)

  const onLogin = (tokenVal, userObj) => {
    localStorage.setItem('sa_token', tokenVal)
    localStorage.setItem('sa_user', JSON.stringify(userObj))
    setToken(tokenVal)
    setUser(userObj)
  }

  const onLogout = () => {
    localStorage.removeItem('sa_token')
    localStorage.removeItem('sa_user')
    setToken(null)
    setUser(null)
  }

  const onUserUpdate = (newUser) => {
    setUser(newUser)
    localStorage.setItem('sa_user', JSON.stringify(newUser))
  }

  return (
    <div>
      {!token ? (
        <Auth onLogin={onLogin} />
      ) : (
        <Dashboard token={token} user={user} onUserUpdate={onUserUpdate} onLogout={onLogout} />
      )}
    </div>
  )
}
