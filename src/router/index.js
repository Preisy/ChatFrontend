import { createRouter, createWebHistory } from 'vue-router'
import TheChat from '../components/TheChat.vue'
import HomeComponent from '@/components/HomeComponent.vue'
import LoginComponent from "@/components/LoginComponent.vue";
// import ChatView from "@/components/views/ChatView.vue";
import ChatView from "../views/ChatView.vue";
import NewRoom from "../components/NewRoom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
      children: [
        {
          path: '/:id',
          name: 'chat',
          component: ChatView,
        }
      ]
    },
    {
      path: '/login',
      name: 'my',
      component: LoginComponent
    },
    {
      path: '/new',
      name: 'newRoom',
      component: NewRoom
    }
  ]
})
export default router
