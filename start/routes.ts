import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


router.group(() => {

router.post('/register', '#controllers/auth_controller.register')
router.post('/login', '#controllers/auth_controller.login')
}).prefix('/api/v1/auth')


router.group(() => {
  router.get('/', '#controllers/auth_controller.index')
  router.get('/auth/user', '#controllers/auth_controller.getUser')
}).prefix('/api/v1').use(middleware.auth())


router.group(() => {
  router.get('/', '#controllers/roles_controller.index')
  router.get('/:id', '#controllers/roles_controller.show')
  router.get('/role/:role', '#controllers/roles_controller.showByRole')
  router.delete('/:id', '#controllers/roles_controller.delete')
  router.post('/', '#controllers/roles_controller.create')
  router.put('/:id', '#controllers/roles_controller.update')
  router.get('/users/:role', '#controllers/roles_controller.getUsersByRoleName')
}).prefix('/api/v1/roles').use(middleware.auth())
