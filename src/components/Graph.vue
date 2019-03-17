<template>
  <div class="main">
    <div class="about">
      <Vue2OrgTree
        :data="node"
        :props="props"
        @on-expand="onExpand(arguments[0])"
        @on-node-click="addNodeBtnClick(arguments[0], arguments[1])"
        :collapsable="true">
      </Vue2OrgTree>
    </div>
    
    <nodeCreator
      class="changing-card" 
      ref="nodeCreator"
      :show="isNodeCreatorShown"
      @close="isNodeCreatorShown = false">
    </nodeCreator>
  </div> 
</template>

<script>
import nodeCreator from './NodeCreator.vue'
import axios from 'axios'
export default {
  name: 'Skills',
  data() {
    return {
      isNodeCreatorShown: false,
      node:{
        id: 1,
        value: 'asdasd',
        answer_type: '',
        answer: '',
        tag: '',
        tag_id: '',
        type: 'm',
        children:[
          {
            id: 2,
            value: 'asdasd',
            type: 'e',
            answer_type: 'user',
            tag: '',
            tag_id: '',
            answer: 'ffff',
            children:[],
            expand: true
          },
          {
            id: 3,
            value: 'asdasd',
            type: 'e',
            answer_type: 'user',
            tag: '',
            tag_id: '',
            answer: 'fff',
            children:[],
            expand: true
          },
          {
            id: 4,
            value: 'asdasd',
            type: 'e',
            answer_type: 'user',
            tag: '',
            tag_id: '',
            answer: 'fff',
            children:[],
            expand: true
          },
          {
            id: 5,
            value: 'asdasd',
            type: 'm',
            tag_id: '',
            answer_type: 'user',
            tag: '',
            answer: 'fff',
            expand: true,
            children:[]
          }
        ],
        expand: true
      },
      props: {
        label: 'value',
        children: 'children',
        expand: 'expand'
      },
      isDataLoading: false
    }
  },
  components:{
    nodeCreator
  },
  mounted(){
    // console.log('asdas')
    // axios
    //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //   .then(response => {
    //     (console.log(response))
    //   })
  },
  methods:{
    onExpand(e){
      let node = this.findNode([this.node], e.id)
      node.expand = !node.expand
    },
    addNodeBtnClick(e, node){
      if(this.isNodeCreatorShown === true) return
      this.isNodeCreatorShown = true 
      this.$refs.nodeCreator.initialize(node)
    },
    findNode(nodes, id){
      for(var i = 0; i < nodes.length; i++) {
        console.log('checking with ', nodes[i], id)
        if (nodes[i].id === id) {
          return nodes[i]
        } else if (nodes[i].children && nodes[i].children.length && typeof nodes[i].children === "object") {
          return this.findNode(nodes[i].children, id);
        }
      }
    }
  },

}
</script>

<style lang="less" scoped>
  .main{
    display: flex;
    flex-direction: row;
  } 
  .changing-card{
    position: absolute;
    right: 20px;
  }
  .about{
    max-width: 800px;
    max-height: 800px;
    overflow: scroll
  }
  .org-tree-node-label {
    cursor: pointer
  }
</style>

