export default defineNuxtRouteMiddleware((to, _from) => {
  const { isLoggedIn, isAdmin } = useAuthentication()

  if(!isLoggedIn.value) {
    return navigateTo('/login')
  }

  if(to.path.startsWith('/dashboard')  && !isAdmin.value) {
    return navigateTo('/')
  }
})
