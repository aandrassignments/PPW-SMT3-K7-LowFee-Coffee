import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//USER SECTION
const UsersController=()=>import('#controllers/users_controller')
router.group(()=>{
    router.get('/', [UsersController, 'show'])
    router.get('/edit', [UsersController, 'edit'])
    router.put('/', [UsersController, 'update'])
    router.delete('/', [UsersController, 'destroy'])
}).prefix('/users').use(middleware.auth())

//PRODUCT SECTION
const ProductsController=()=>import('#controllers/products_controller')
router.group(()=>{
    router.get('/', [ProductsController, 'index'])
    router.get('/search', [ProductsController, 'search'])
    router.get('/:id', [ProductsController, 'show'])
}).prefix('/products')
router.get('/seed', [ProductsController, 'seed'])// for seeding purposes

//WISHLIST SECTION
const WishlistController=()=>import('#controllers/wishlists_controller')
router.group(() => {
  router.get('/', [WishlistController, 'index'])
  router.post('/', [WishlistController, 'store'])
  router.delete('/:id', [WishlistController, 'destroy'])
}).prefix('/wishlist').use(middleware.auth())

//CART SECTION
const CartsController=()=>import('#controllers/carts_controller')
router.group(()=>{
    router.get('/', [CartsController, 'index'])
    router.post('/', [CartsController, 'store'])
    router.put('/:id', [CartsController, 'update'])
    router.delete('/:id', [CartsController, 'destroy'])
}).prefix('/cart').use(middleware.auth())

//TRANSACTION SECTION
const TransactionsController=()=>import('#controllers/transactions_controller')
router.group(()=>{
    router.get('/', [TransactionsController, 'index'])
    router.get('/:id', [TransactionsController, 'show'])
    router.post('/', [TransactionsController, 'store'])
}).prefix('/transactions').use(middleware.auth())

//AUTH SECTION
const AuthController=()=>import('#controllers/auth_controller')
router.group(()=>{
    router.get('/register', [AuthController, 'showRegister'])
    router.post('/register', [AuthController, 'register'])
    router.get('/login', [AuthController, 'showLogin'])
    router.post('/login', [AuthController, 'login'])
}).use(middleware.guest())
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

//ADMIN SECTION
const AdminDashboardController=()=>import('#controllers/admin/admin_dashboard_controller')
const AdminUserController=()=>import('#controllers/admin/admin_users_controller')
const AdminProductController=()=>import('#controllers/admin/admin_products_controller')
router.group(()=>{

    //ADMIN USER SECTION
    router.group(()=>{
        router.get('/', [AdminUserController, 'index'])
        router.get('/:id/edit', [AdminUserController, 'edit'])
        router.put('/:id', [AdminUserController, 'update'])
        router.delete('/:id', [AdminUserController, 'destroy'])
    }).prefix('/users')

    //ADMIN PRODUCT SECTION
    router.group(()=>{
        router.get('/', [AdminProductController, 'index'])
        router.get('/create', [AdminProductController, 'create'])
        router.post('/', [AdminProductController, 'store'])
        router.get('/:id/edit', [AdminProductController, 'edit'])
        router.put('/:id', [AdminProductController, 'update'])
        router.delete('/:id', [AdminProductController, 'destroy'])
    }).prefix('/products')

    //ADMIN DASHBOARD SECTION
    router.get('/',[AdminDashboardController, 'index'])

}).prefix('/admin').use([middleware.auth(),middleware.admin()])

//HOME SECTION
const HomeController=()=>import('#controllers/home_controller')
router.get('/', [HomeController, 'index'])

//STATIC SECTION
router.on('/about').render('pages/static/about')