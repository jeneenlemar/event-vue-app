import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import EventsIndex from "../views/EventsIndex.vue";
import EventsNew from "../views/EventsNew.vue";
import EventsShow from "../views/EventsShow.vue";
import EventsEdit from "../views/EventsEdit.vue";
import CategoriesShow from "../views/CategoriesShow.vue";
import UserEventsIndex from "../views/UserEventsIndex.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  { 
    path: "/signup", 
    name: "signup", 
    component: Signup 
  },
  { 
    path: "/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/logout", 
    name: "logout", 
    component: Logout 
  },
  { 
    path: "/events", 
    name: "events-index", 
    component: EventsIndex
  },
  { 
    path: "/events/new", 
    name: "events-new", 
    component: EventsNew
  },
  { 
    path: "/events/:id", 
    name: "events-show", 
    component: EventsShow
  },
  { 
    path: "/events/:id/edit", 
    name: "events-edit", 
    component: EventsEdit
  },
  { 
    path: "/categories/:id", 
    name: "categories-show", 
    component: CategoriesShow
  },
  { 
    path: "/user_events", 
    name: "user_events-index", 
    component: UserEventsIndex
  },
  { 
    path: "/users/:id", 
    name: "users-show", 
    component: UsersShow
  },
  { 
    path: "/users/:id/edit", 
    name: "users-edit", 
    component: UsersEdit
  }


];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
