export default defineNuxtRouteMiddleware((to, _from) => {
  const { isLoggedIn } = useAuthentication()

  const notAuthenticatedRoutes = ['/login', '/register']

  if(notAuthenticatedRoutes.includes(to.path) && isLoggedIn.value) {
    return navigateTo('/')
  }
})
