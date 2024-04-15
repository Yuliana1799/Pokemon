import Login from "../components/login.vue"
import Cartas from "../components/Cartas.vue"
import Juego from "../components/Juego.vue"

import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/", component:Login},
    {path:"/Cartas", component:Cartas},
    {path:"/Juego", component:Juego}, 
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})