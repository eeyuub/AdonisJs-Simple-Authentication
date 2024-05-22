import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


router.group(() => {

router.post('/register', '#controllers/auth_controller.register')
router.post('/login', '#controllers/auth_controller.login')
}).prefix('/api/v1/auth')


router.group(() => {
  router.get('/', '#controllers/auth_controller.index')
}).prefix('/api/v1').use(middleware.auth())
