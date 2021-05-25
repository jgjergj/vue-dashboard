<template>
  <base-item-group
    :item="item"
    text
    sub-group
  />
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import MenuItemGroup from './MenuItemGroup.vue';
  
  @Component({
    components:{
      'base-item-group': MenuItemGroup
    },
    props: {
      item: {
        type: Object,
        default: () => ({
          avatar: undefined,
          group: undefined,
          title: undefined,
          children: [],
        }),
      },
    }
  })
  export default class MenuItemSubGroup extends Vue {
    name = 'MenuItemSubGroup';
  }
</script>
