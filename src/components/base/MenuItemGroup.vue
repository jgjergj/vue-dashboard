<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    append-icon="mdi-menu-down"
    :color="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)' ? 'white' : 'grey darken-1'"
  >
    <template v-slot:activator>
      <v-list-item-icon
        v-if="text"
        class="v-list-item__icon--text"
        v-text="computedText"
      />

      <!-- <v-list-item-avatar
        v-else-if="item.avatar"
        class="align-self-center"
        color="white"
        contain
      >
        <v-img src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico" />
      </v-list-item-avatar> -->

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children">
      <base-item-sub-group
        v-if="child.children"
        :key="`sub-group-${i}`"
        :item="child"
      />

      <base-item
        v-else
        :key="`item-${i}`"
        :item="child"
        text
      />
    </template>
  </v-list-group>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { State } from 'vuex-class';
  import MenuItem from './MenuItem.vue';

  @Component({
    components:{
      'base-item': MenuItem
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
      subGroup: {
        type: Boolean,
        default: false,
      },
      text: {
        type: Boolean,
        default: false,
      },
    }
  })
  export default class MenuItemGroup extends Vue {
    name = 'MenuItemGroup';
    inheritAttrs = false;

    @State
    barColor;

    
    get children () {
      return this.$props.item.children.map(item => ({
        ...item,
        to: !item.to ? '' : item.to,
      }))
    }

    get computedText () {
      if (!this.$props.item || !this.$props.item.title) return ''

      let text = ''

      this.$props.item.title.split(' ').forEach(val => {
        text += val.substring(0, 1)
      })

      return text
    }

    get group () {
      return this.genGroup(this.$props.item.children)
    }

    genGroup (children) {
      return children
        .filter(item => item.to)
        .map(item => {
          const parent = item.group || this.$props.item.group
          let group = `${parent}/${kebabCase(item.to)}`

          if (item.children) {
            group = `${group}|${this.genGroup(item.children)}`
          }

          return group
        }).join('|')
    }
  }
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>
