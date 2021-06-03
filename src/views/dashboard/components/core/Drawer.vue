<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-h4"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Vue, Component} from 'vue-property-decorator';
	import { State } from "vuex-class";
  import MenuItem from '../../../../components/base/MenuItem.vue';
  import MenuItemGroup from '../../../../components/base/MenuItemGroup.vue';

  interface Item {
    icon: string;
    title: string;
    to?: string;
    children?: Array<Item>
  }

  @Component({
    components:{
        'base-item': MenuItem,
        'base-item-group': MenuItemGroup
    },
    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },
  })
  export default class Drawer extends Vue {
    name = 'DashboardCoreDrawer';
    items: Array<Item>;

    @State
    barColor!: string;
    @State
    barImage!: string;

    constructor() {
      super();
      this.items = [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/',
        },   
        {
          icon: 'mdi-cog',
          title: 'Settings',
          children: [
            {
              title: 'Clients',
              icon: 'mdi-account',
              to: '/clients',
            },
            {
              title: 'Currencies',
              icon: 'mdi-account',
              to: '/currencies',
            },
            {
              title: 'Sports',
              icon: 'mdi-google-maps',
              to: '/sports',
            },
            {
              title: 'States',
              icon: 'mdi-google-maps',
              to: '/states',
            },
            {
              title: 'Statuses',
              icon: 'mdi-google-maps',
              to: '/statuses',
            }, 
            {
              title: 'Types',
              icon: 'mdi-clipboard-outline',
              to: '/types',
            }
          ]
        }     
        // {
        //   title: 'rtables',
        //   icon: 'mdi-clipboard-outline',
        //   to: '/tables/regular-tables',
        // },
        // {
        //   title: 'typography',
        //   icon: 'mdi-format-font',
        //   to: '/components/typography',
        // },
        // {
        //   title: 'icons',
        //   icon: 'mdi-chart-bubble',
        //   to: '/components/icons',
        // },
        // {
        //   title: 'google',
        //   icon: 'mdi-map-marker',
        //   to: '/maps/google-maps',
        // },
        // {
        //   title: 'notifications',
        //   icon: 'mdi-bell',
        //   to: '/components/notifications',
        // },
      ]
    }

		get drawer () {
      return this.$store.state.drawer
    } 

    set drawer (val) {
      this.$store.commit('SET_DRAWER', val)
    }

    get computedItems (){
      return this.items.map(this.mapItem)
    }

    get profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      }

    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      }
    }
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
