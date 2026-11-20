// // import {
// //   useCallback,
// //   useEffect,
// //   useState,
// // } from 'react'

// // import AuthContext from './AuthContext'

// // import api from '../services/api'


// // const TOKEN_KEY = 'plant_disease_token'
// // const USER_KEY = 'plant_disease_user'

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(() => {
// //     try {
// //       const storedUser = localStorage.getItem(USER_KEY)
// //       return storedUser ? JSON.parse(storedUser) : null
// //     } catch {
// //       localStorage.removeItem(USER_KEY)
// //       return null
// //     }
// //   })

// //   const [loading, setLoading] = useState(true)

// //   const saveAuthentication = useCallback((data) => {
// //     const { access_token, user: userData } = data

// //     if (!access_token || !userData) {
// //       throw new Error('Invalid authentication response from server.')
// //     }

// //     localStorage.setItem(TOKEN_KEY, access_token)
// //     localStorage.setItem(USER_KEY, JSON.stringify(userData))

// //     setUser(userData)
// //   }, [])

// //   // Verify the saved JWT token when the application starts.
// //   useEffect(() => {
// //     let active = true

// //     const verifyAuthentication = async () => {
// //       const token = localStorage.getItem(TOKEN_KEY)

// //       if (!token) {
// //         if (active) {
// //           setUser(null)
// //           setLoading(false)
// //         }
// //         return
// //       }

// //       try {
// //         const response = await api.get('/api/auth/me')

// //         if (active) {
// //           const userData = response.data.data

// //           setUser(userData)
// //           localStorage.setItem(USER_KEY, JSON.stringify(userData))
// //         }
// //       } catch {
// //         localStorage.removeItem(TOKEN_KEY)
// //         localStorage.removeItem(USER_KEY)

// //         if (active) {
// //           setUser(null)
// //         }
// //       } finally {
// //         if (active) {
// //           setLoading(false)
// //         }
// //       }
// //     }

// //     verifyAuthentication()

// //     return () => {
// //       active = false
// //     }
// //   }, [])

// //   const register = async (name, email, password) => {
// //     const response = await api.post('/api/auth/register', {
// //       name,
// //       email,
// //       password,
// //     })

// //     return response.data
// //   }

// //   const login = async (email, password) => {
// //     const response = await api.post('/api/auth/login', {
// //       email,
// //       password,
// //     })

// //     saveAuthentication(response.data.data)

// //     return response.data
// //   }

// //   const logout = () => {
// //     localStorage.removeItem(TOKEN_KEY)
// //     localStorage.removeItem(USER_KEY)
// //     setUser(null)
// //   }

// //   const value = {
// //     user,
// //     loading,
// //     isAuthenticated: Boolean(user && localStorage.getItem(TOKEN_KEY)),
// //     register,
// //     login,
// //     logout,
// //   }

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }




// import {
//   createContext,
//   useCallback,
//   useEffect,
//   useState,
// } from 'react'

// import api from '../services/api'


// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext(null)

// const TOKEN_KEY = 'plant_disease_token'
// const USER_KEY = 'plant_disease_user'

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem(USER_KEY)
//       return storedUser ? JSON.parse(storedUser) : null
//     } catch {
//       localStorage.removeItem(USER_KEY)
//       return null
//     }
//   })

//   const [loading, setLoading] = useState(true)

//   const saveAuthentication = useCallback((data) => {
//     const { access_token, user: userData } = data

//     if (!access_token || !userData) {
//       throw new Error('Invalid authentication response from server.')
//     }

//     localStorage.setItem(TOKEN_KEY, access_token)
//     localStorage.setItem(USER_KEY, JSON.stringify(userData))

//     setUser(userData)
//   }, [])

//   // Verify the saved JWT token when the application starts.
//   useEffect(() => {
//     let active = true

//     const verifyAuthentication = async () => {
//       const token = localStorage.getItem(TOKEN_KEY)

//       if (!token) {
//         if (active) {
//           setUser(null)
//           setLoading(false)
//         }
//         return
//       }

//       try {
//         const response = await api.get('/api/auth/me')

//         if (active) {
//           const userData = response.data.data

//           setUser(userData)
//           localStorage.setItem(USER_KEY, JSON.stringify(userData))
//         }
//       } catch {
//         localStorage.removeItem(TOKEN_KEY)
//         localStorage.removeItem(USER_KEY)

//         if (active) {
//           setUser(null)
//         }
//       } finally {
//         if (active) {
//           setLoading(false)
//         }
//       }
//     }

//     verifyAuthentication()

//     return () => {
//       active = false
//     }
//   }, [])

//   const register = async (name, email, password) => {
//     const response = await api.post('/api/auth/register', {
//       name,
//       email,
//       password,
//     })

//     return response.data
//   }

//   const login = async (email, password) => {
//     const response = await api.post('/api/auth/login', {
//       email,
//       password,
//     })

//     saveAuthentication(response.data.data)

//     return response.data
//   }

//   const logout = () => {
//     localStorage.removeItem(TOKEN_KEY)
//     localStorage.removeItem(USER_KEY)
//     setUser(null)
//   }

//   const value = {
//     user,
//     loading,
//     isAuthenticated: Boolean(user && localStorage.getItem(TOKEN_KEY)),
//     register,
//     login,
//     logout,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContext



import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import api from '../services/api'


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

const TOKEN_KEY = 'plant_disease_token'
const USER_KEY = 'plant_disease_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY)
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      localStorage.removeItem(USER_KEY)
      return null
    }
  })

  const [loading, setLoading] = useState(true)

  const saveAuthentication = useCallback((data) => {
    const { access_token, user: userData } = data

    if (!access_token || !userData) {
      throw new Error('Invalid authentication response from server.')
    }

    localStorage.setItem(TOKEN_KEY, access_token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))

    setUser(userData)
  }, [])

  // Verify the saved JWT token when the application starts.
  useEffect(() => {
    let active = true

    const verifyAuthentication = async () => {
      const token = localStorage.getItem(TOKEN_KEY)

      if (!token) {
        if (active) {
          setUser(null)
          setLoading(false)
        }
        return
      }

      try {
        const response = await api.get('/api/auth/me')

        if (active) {
          const userData = response.data.data

          setUser(userData)
          localStorage.setItem(USER_KEY, JSON.stringify(userData))
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)

        if (active) {
          setUser(null)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    verifyAuthentication()

    return () => {
      active = false
    }
  }, [])

  const register = async (name, email, password) => {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
    })

    return response.data
  }

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    })

    saveAuthentication(response.data.data)

    return response.data
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user && localStorage.getItem(TOKEN_KEY)),
    register,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook lives in the same file as the context, so it can never read a different copy
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }

  return context
}

export default AuthContext