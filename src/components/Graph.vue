<template>
  <div class="main">
    <div class="about">
      <OrgTree
        :data="node"
        :props="props"
        @on-expand="onExpand(arguments[0])"
        @on-node-click="addNodeBtnClick(arguments[0], arguments[1])"
        :collapsable="true">
      </OrgTree>
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
import OrgTree from './org-tree/org-tree.vue'
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
    nodeCreator,
    OrgTree
  },
  mounted(){
    console.log(this.$route.params.id)
    axios
      .get('http://172.20.10.3:8000/mains/find/'+(this.$route.params.id ? this.$route.params.id : 15) )
      .then(response => {
        (console.log(response))
      })
  },
  methods:{
    onExpand(e){
      let node = this.findNode([this.node], e.id)
      node.expand = !node.expand
    },
    addNodeBtnClick(e, node){
      //if(this.isNodeCreatorShown === true) return
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
    min-width: 800px;
    min-height: 800px;
    max-width: 800px;
    max-height: 800px;
    overflow: scroll
  }
  .org-tree-node-label {
    cursor: pointer
  }

  .org-tree-container {
  display: inline-block;
  padding: 16px;
  background-color: #fff;
}

.org-tree {
  // display: inline-block;
  display: table;
  text-align: center;

  &:before, &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
}

.org-tree-node,
.org-tree-node-children {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &:before, &:after {
    transition: all .35s;
  }
}
.org-tree-node-label {
  position: relative;
  display: inline-block;

  .org-tree-node-label-inner {
    padding: 10px 15px;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
    max-width: 136px;
  }
}

.org-tree-node-label-inner-answer {
  background-color: rgb(50, 187, 241);
  padding: 8px 4px;
  margin: 8px 0px;
  max-width: 100px;
  overflow: hidden;
  word-wrap: break-word;
  color: #fff;
}

.org-tree-node-label-inner-details {
  background-color: #4CAF50; 
  border: none;
  color: white;
  width: 20px;
  margin-inline-end: 8px;
  padding: 4px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.org-tree-node-label-inner-inactive {
  background-color: rgb(206, 57, 57); 
  border: none;
  color: white;  
  width: 20px;
  padding: 4px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}


.org-tree-node-label-inner-question {
  padding: 8px 0px;
  margin: 8px 0px;
  max-width: 100px;
}

.org-tree-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
  cursor: pointer;
  transition: all .35s ease;

  &:hover {
    background-color: #e7e8e9;
    transform: scale(1.15);
  }

  &:before, &:after {
    content: '';
    position: absolute;
  }

  &:before {
    top: 50%;
    left: 4px;
    right: 4px;
    height: 0;
    border-top: 1px solid #ccc;
  }

  &:after {
    top: 4px;
    left: 50%;
    bottom: 4px;
    width: 0;
    border-left: 1px solid #ccc;
  }

  &.expanded:after {
    border: none;
  }
}
.org-tree-node {
  padding-top: 20px;
  display: table-cell;
  vertical-align: top;

  &.is-leaf, &.collapsed {
    padding-left: 10px;
    padding-right: 10px;
  }

  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
  }

  &:after {
    left: 50%;
    border-left: 1px solid #ddd;
  }

  &:not(:first-child):before,
  &:not(:last-child):after {
    border-top: 1px solid #ddd;
  }

}
.collapsable .org-tree-node.collapsed {
  padding-bottom: 30px;

  .org-tree-node-label:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 50%;
    height: 20px;
    border-right: 1px solid #ddd;
  }
}
.org-tree > .org-tree-node {
  padding-top: 0;

  &:after {
    border-left: 0;
  }
}
.org-tree-node-children {
  padding-top: 20px;
  display: table;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 20px;
    border-left: 1px solid #ddd;
  }

  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.horizontal {
  .org-tree-node {
    // display: flex;
    // flex-direction: row;
    // justify-content: flex-start;
    // align-items: center;
    display: table-cell;
    float: none;
    padding-top: 0;
    padding-left: 20px;

    &.is-leaf, &.collapsed {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    &:before, &:after {
      width: 19px;
      height: 50%;
    }

    &:after {
      top: 50%;
      left: 0;
      border-left: 0;
    }

    &:only-child:before {
      top: 1px;
      border-bottom: 1px solid #ddd;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      border-top: 0;
      border-left: 1px solid #ddd;
    }

    &:not(:only-child):after {
      border-top: 1px solid #ddd;
    }

    .org-tree-node-inner {
      display: table;
    }

  }

  .org-tree-node-label {
    display: table-cell;
    vertical-align: middle;
  }

  &.collapsable .org-tree-node.collapsed {
    padding-right: 30px;

    .org-tree-node-label:after {
      top: 0;
      left: 100%;
      width: 20px;
      height: 50%;
      border-right: 0;
      border-bottom: 1px solid #ddd;
    }
  }

  .org-tree-node-btn {
    top: 50%;
    left: 100%;
    margin-top: -11px;
    margin-left: 9px;
  }

  & > .org-tree-node:only-child:before {
    border-bottom: 0;
  }

  .org-tree-node-children {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;
    display: table-cell;
    padding-top: 0;
    padding-left: 20px;

    &:before {
      top: 50%;
      left: 0;
      width: 20px;
      height: 0;
      border-left: 0;
      border-top: 1px solid #ddd;
    }

    &:after {
      display: none;
    }

    & > .org-tree-node {
      display: block;
    }
  }
}

</style>

