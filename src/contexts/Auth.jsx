import React, { useState, useEffect, createContext } from 'react'
import Router from 'next/router'

const API_BASE = process.env.NEXT_PUBLIC_API_URL
const isDev = process.env.NODE_ENV === 'development'

const fetchToken = (username, password) => {
  const url = API_BASE + '/token/'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}

const fetchNewToken = () => {
  const url = API_BASE + '/token/refresh/'
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(0)

  const accessTokenIsValid = () => {
    if (accessToken === '') {
      return false
    }
    const expiry = new Date(accessTokenExpiry)
    isDev && console.log('Checking token expiry:', expiry)

    // subtracting 5000ms from the expiry to prevent the token from being valid in the client side but not in the server - due to the lattency
    return expiry.getTime() - 5000 > Date.now()
  }

  const initAuth = async () => {
    setLoading(true)
    if (!accessTokenIsValid()) {
      isDev && console.log('Invalid access token so refetching')
      await refreshToken()
    } else {
      setIsAuthenticated(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    initAuth()
  }, []) // eslint-disable-line

  const refreshToken = async () => {
    setLoading(true)
    const resp = await fetchNewToken()
    if (!resp.ok) {
      setIsAuthenticated(false)
      setLoading(false)
      return
    }
    const tokenData = await resp.json()
    handleNewToken(tokenData)
    return tokenData.access
  }

  const handleNewToken = data => {
    setAccessToken(data.access)
    const expiryInt = data.access_expires * 1000
    setAccessTokenExpiry(expiryInt)
    setIsAuthenticated(true)
    setLoading(false)
  }

  const login = async (username, password) => {
    const resp = await fetchToken(username, password)
    if (resp.ok) {
      const tokenData = await resp.json()
      handleNewToken(tokenData)
    } else {
      setIsAuthenticated(false)
    }
    return resp
  }

  const getToken = async () => {
    // Returns an access token if there's one or refetches a new one
    isDev && console.log('Getting access token..')
    if (accessTokenIsValid()) {
      isDev && console.log('Getting access token.. existing token still valid')
      return Promise.resolve(accessToken)
    } else if (loading) {
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (!loading) {
            clearInterval(interval)
            resolve(accessToken)
          }
        }, 100)
      })
    } else {
      isDev && console.log('Getting access token.. getting a new token')
      const token = await refreshToken()
      return token
    }
  }

  const logout = () => {
    setAccessToken('')
    setAccessTokenExpiry(null)
    setIsAuthenticated(false)
    setLoading(true)
    const url = API_BASE + '/token/logout/'
    fetch(url, {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(() => {
        setLoading(false)
        Router.push('/')
      })
  }

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
    getToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
