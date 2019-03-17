import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/Main.vue'
import Graph from './components/Graph.vue'
import NewGraph from './components/NewGraph.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'skills',
      component: Main
    },
    {
      path: '/graph/:id',
      name: 'graphId',
      component: Graph
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph
    },
    {
      path: '/new-graph',
      name: 'new-graph',
      component: NewGraph
    }
    
  ]
})