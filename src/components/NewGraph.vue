<template>
  <div>
    <v-btn large loading></v-btn>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      isDataLoading: true
    }
  },
  mounted(){
    console.log('asdas')
    axios
      .get('http://127.0.0.1:8000/mains/first_create')
      .then(response => {
        console.log(response.data)
        this.$router.push(`/graph/${response.data.root.id}`)
      }).catch(error => {
        console.log(error)
    });
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

