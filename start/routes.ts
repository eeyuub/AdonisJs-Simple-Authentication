import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
}).prefix('/api/v1/auth')

router.group(() => {
  router.post('/logout', '#controllers/auth_controller.logout')
}).prefix('/api/v1/auth').use(middleware.auth({guards: ['api']}))

router.group(() => {
  router.post('/request-token', '#controllers/password_reset_tokens_controller.sendPasswordResetEmail')
  router.post('/:token', '#controllers/password_reset_tokens_controller.resetPassword')
}).prefix('/api/v1/password-reset')

router.group(() => {
  router.get('/users', '#controllers/users_controller.index')
  router.get('/users/:id', '#controllers/users_controller.show')
  router.post('/users', '#controllers/users_controller.create')
  router.put('/users/:id', '#controllers/users_controller.update')
  router.put('/users/:id/password', '#controllers/users_controller.updatePassword')
}).prefix('/api/v1').use(middleware.auth({guards: ['api']}))


router.group(() => {
  router.get('/', '#controllers/roles_controller.index')
  router.get('/:id', '#controllers/roles_controller.show')
  router.get('/role/:role', '#controllers/roles_controller.showByRole')
  router.delete('/:id', '#controllers/roles_controller.delete')
  router.post('/', '#controllers/roles_controller.create')
  router.put('/:id', '#controllers/roles_controller.update')
  router.get('/users/:role', '#controllers/roles_controller.getUsersByRoleName')
}).prefix('/api/v1/roles').use(middleware.auth({guards: ['api']}))
