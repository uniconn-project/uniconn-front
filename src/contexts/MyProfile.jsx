import React, { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { AuthContext } from './Auth'
import { fetcher } from '../hooks/useFetch'

export const MyProfileContext = createContext()

export default function MyProfileProvider({ children }) {
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const [myProfile, setMyProfile] = useState(null)

  const fetchMyProfile = useCallback(async () => {
    const data = await fetcher('profiles/get-my-profile', {
      Authorization: 'JWT ' + (await getToken())
    })
    setMyProfile(data)
  }, [getToken])

  useEffect(() => {
    if (!isAuthenticated) return

    fetchMyProfile()
  }, [isAuthenticated, fetchMyProfile])

  return (
    <MyProfileContext.Provider
      value={{ myProfile, setMyProfile, refetchMyProfile: fetchMyProfile }}
    >
      {children}
    </MyProfileContext.Provider>
  )
}
