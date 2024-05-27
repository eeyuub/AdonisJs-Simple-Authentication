import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


// Grouping authentication related routes under '/api/v1/auth'
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')// Route for user registration
  router.post('/login', '#controllers/auth_controller.login')// Route for user login
}).prefix('/api/v1/auth')


// Grouping logout route under '/api/v1/auth' with API guard middleware
router.group(() => {
  router.post('/logout', '#controllers/auth_controller.logout')// Route for user logout, requires authentication
}).prefix('/api/v1/auth').use(middleware.auth({guards: ['api']}))


// Grouping password reset related routes under '/api/v1/password-reset'
router.group(() => {
  router.post('/request-token', '#controllers/password_reset_tokens_controller.sendPasswordResetEmail')// Route to request a password reset token
  router.post('/:token', '#controllers/password_reset_tokens_controller.resetPassword')// Route to reset password using the token
}).prefix('/api/v1/password-reset')


// Grouping user-related routes under '/api/v1' with API guard middleware
router.group(() => {
  router.get('/users', '#controllers/users_controller.index')// Fetch all users
  router.get('/users/:id', '#controllers/users_controller.show') // Fetch a specific user by their ID
  router.post('/users', '#controllers/users_controller.create') // Create a new user
  router.put('/users/:id', '#controllers/users_controller.update') // Update an existing user by their ID
  router.put('/users/:id/password', '#controllers/users_controller.updatePassword') // Update the password of an existing user by their ID
}).prefix('/api/v1').use(middleware.auth({guards: ['api']}))


// Grouping routes related to roles under '/api/v1/roles' with API guard middleware
router.group(() => {
  router.get('/', '#controllers/roles_controller.index') // Fetch all roles
  router.get('/:id', '#controllers/roles_controller.show') // Fetch a specific role by its ID
  router.get('/role/:role', '#controllers/roles_controller.showByRole') // Fetch a specific role by role name
  router.delete('/:id', '#controllers/roles_controller.delete') // Delete a specific role by its ID
  router.post('/', '#controllers/roles_controller.create') // Create a new rol
  router.put('/:id', '#controllers/roles_controller.update') // Update an existing role by its ID
  router.get('/users/:role', '#controllers/roles_controller.getUsersByRoleName') // Fetch users by their role name
}).prefix('/api/v1/roles').use(middleware.auth({guards: ['api']}))


//router.resource('test', '#controllers/tests_controller').apiOnly()

