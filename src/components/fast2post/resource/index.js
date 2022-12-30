import { VueTreeList, Tree } from 'vue-tree-list'
  export default {
    components: {
      VueTreeList
    },
    data () {
      return {
        newTree: {},
        data: new Tree([
          {
            name: 'Authentication API',
            id: 1,
            pid: 0,
            dragDisabled: true,
            addTreeNodeDisabled: true,
            addLeafNodeDisabled: true,
            editNodeDisabled: true,
            delNodeDisabled: true,
            children: [
              {
                name: '  Login',
                id: 2,
                isLeaf: true,
                pid: 1,
                dragDisabled: true,
                addTreeNodeDisabled: true,
                addLeafNodeDisabled: true,
                editNodeDisabled: true,
                delNodeDisabled: true,
              }
            ]
          },
          {
            name: 'Orders',
            id: 2,
            pid: 0,
            dragDisabled: true,
            addTreeNodeDisabled: true,
            addLeafNodeDisabled: true,
            editNodeDisabled: true,
            delNodeDisabled: true,
            children: [
              {
                name: '<a href="">Create or Update Order</a>',
                id: 1,
                isLeaf: true,
                pid: 2,
                dragDisabled: true,
                addTreeNodeDisabled: true,
                addLeafNodeDisabled: true,
                editNodeDisabled: true,
                delNodeDisabled: true,
              },
              {
                name: 'Get All Orders',
                id: 2,
                isLeaf: true,
                pid: 1,
                dragDisabled: true,
                addTreeNodeDisabled: true,
                addLeafNodeDisabled: true,
                editNodeDisabled: true,
                delNodeDisabled: true,
              }
            ]
          },
        ])
      }
    },
    methods: { 
      onClick (params) {
        console.log(params)
      },      
    }
  }