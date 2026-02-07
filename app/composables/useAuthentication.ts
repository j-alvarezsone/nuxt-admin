
export function useAuthentication() {
  const { loggedIn, session, user, clear, fetch: refreshSession } = useUserSession()

  const login = async (email: string, password: string) => {
    return await tryPromise({
      onSuccess: async () => {
        await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email,
            password
          }
        })

        await refreshSession()
        navigateTo('/?message=Login successful')

        return {
          success: true,
          message: 'Login successful'
        }
      },
      onError: ({ error, status }) => {
        console.error(error)
        return {
          success: false,
          message: 'Invalid email or password',
          status
        }
      },
      failureMessage: 'Login failed'
    })
  }

  const register = async (fullName: string, email: string, password: string) => {
    await tryPromise({
      onSuccess: async () => {
        await $fetch('/api/auth/register', {
          method: 'POST',
          body: {
            fullName,
            email,
            password
          }
        })

        navigateTo('/?message=Registration successful, please log in')

        return true
      },
      onError: (e) => {
        console.error(e)
        return false
      },
      failureMessage: 'Registration failed'
    })
  }

  const logout = async () => {
    await clear()
    navigateTo('/login')
  }

  return {
    isLoggedIn: loggedIn,
    session,
    user,
    refreshSession,
    login,
    register,
    logout,
  }
}

export default useAuthentication
