import Main from "@/pages/Main.vue";
import About from "@/pages/AboutCountry.vue"
import {createRouter,createWebHistory} from "vue-router"
import FavoritesPage from "@/pages/FavoritesPage.vue";

const routes = [
    {
        path: '/',
        component:Main
    },
    {
        path: '/country/:id',
        component: About
    },
    {
        path: '/favorites',
        component: FavoritesPage
    },
]

const router = createRouter( {
    routes,
    history: createWebHistory(process.env.BASE_URL)
} )

export default router;