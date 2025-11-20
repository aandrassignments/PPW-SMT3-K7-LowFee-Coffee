**Ikutin ini dulu habis clone dari github**

1. npm install
2. cp .env.example .env
3. node ace generate:key
4. npm install sqlite3
5. mkdir tmp
6. node ace migration:run
7. node ace repl
8. const User = (await import('#models/user')).default
9. await User.create({full_name: 'Test User',email: 'test@example.com',password: 'password123'})
10. .exit
11. node ace serve --hmr
12. (ketik di browsernya) http://localhost:3333/seed (habis itu balik ke home page)

**note buat bikin admin**
1. const User = await import('#models/user')
2. await User.default.create({full_name: 'Admin',email: 'admin@example.com',password: 'password123',role: 'admin'})

**note buat otak-atik node ace repl**
import dulu yg dibutuhin misalkan model :
const Cart = (await import('#models/cart')).default **tinggal tuker aja variablenya, jgn lupa capital**
await Cart.query().where('quantity', null).update({quantity:1}) **<- buat update isi cart**