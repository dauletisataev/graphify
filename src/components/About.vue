<template>
  <div class="about">
    <Vue2OrgTree
      :data="node"
      :props="props"
      :collapsable="true">
    </Vue2OrgTree>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      node:{
        value: 'asdasd',
        nodes:[
          {
            value: 'asdasd',
            answer: 'ffff',
            expand: true
          },
          {
            value: 'asdasd',
            answer: 'fff',
            expand: true
          },
          {
            value: 'asdasd',
            answer: 'fff',
            expand: true
          },
          {
            value: 'asdasd',
            answer: 'fff',
            expand: true,
            nodes:[
          {
            value: 'asdasd',
            answer: 'ffff',
            expand: true
          },
          {
            value: 'asdasd',
            answer: 'fff',
            expand: true
          },
          {
            value: 'asdasd',
            answer: 'fff',
            expand: true
          },
          {
            value: 'asdasd',
            answer: 'fff',
            expand: true
          }
        ]
          }
        ],
        expand: true
      },
      props: {
        label: 'value',
        children: 'nodes',
        expand: 'expand'
      }
    }
  }
}
</script>
