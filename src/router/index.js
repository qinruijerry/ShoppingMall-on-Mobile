import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const Home = () => import( "../views/Home/Home.vue")
const Item = () => import( "../views/Item/Item.vue")
const Shopping = () => import( "../views/Cart/Shopping_Cart.vue")
const Profile = () => import( "../views/Profile/Profile.vue")
const Detail = () => import( "../views/Detail/Detail.vue")


const routes =  [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/item",
    component: Item,
  },
  {
    path: "/shopping_cart",
    component: Shopping,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    component: Detail,
  }
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // }
  ];
const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
