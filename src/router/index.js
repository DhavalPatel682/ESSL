import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Sponsor from '../components/Sponsor.vue'
import VideoMedia from '../components/VideoMedia.vue'
import State from '../components/State.vue'
import District from '../components/District.vue'
import SchoolPage from '../components/SchoolPage.vue'
import Event from '../components/Event.vue'
import Game from '../components/Game.vue'
import Resource from '../components/rules-regularation.vue'
import StateStanding from '../components/StateStanding.vue'
import DistrictStanding from '../components/DistrictStanding.vue'
import AboutusPage from '../components/AboutusPage.vue'
import GamesRule from '../components/GamesRule.vue'
import Contact from '../components/Contact.vue'
import Registrationform from '../components/Registrationform.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Registrationform',
    name: 'Registrationform',
    component: Registrationform
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    component: Sponsor
  },
  {
    path: '/video-media',
    name: 'Video-Media',
    component: VideoMedia
  },
  {
    path: '/schools',
    name: 'schools',
    component: State
  },
  {
    path: '/standings',
    name: 'standings',
    component: StateStanding
  }, {
    path: '/districtlist',
    name: 'districtlist',
    component: District
  }, {
    path: '/standingdistrictlist',
    name: 'standingdistrictlist',
    component: DistrictStanding
  }, {
    path: '/school/:id',
    name: 'SchoolDetails',
    component: SchoolPage
  },
  {
    path: '/event',
    name: 'event',
    component: Event
  },

  {
    path: '/game',
    name: 'game',
    component: Game
  },

  {
    path: '/rules-regularation',
    name: 'rules-regulations',
    component: Resource
  },
  {
    path: '/AboutUs',
    name: 'AboutUs',
    component: AboutusPage
  }, {
    path: '/games_rule',
    name: 'Games Rule',
    component: GamesRule
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
