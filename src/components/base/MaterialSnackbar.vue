<template>
  <v-snackbar
    v-model="internalValue"
    class="v-snackbar--material"
    v-bind="{
      ...$attrs,
      'color': 'transparent'
    }"
  >
    <base-material-alert
      v-model="internalValue"
      :color="$attrs.color"
      :dismissible="dismissible"
      :type="type"
      class="ma-0"
      dark
    >
      <slot />
    </base-material-alert>
  </v-snackbar>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import MaterialAlertVue from './MaterialAlert.vue';

  @Component({
    components:{
      'base-material-alert': MaterialAlertVue
    },
    props: {
      dismissible: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: '',
      },
      value: Boolean,
    }
  })
  export default class MaterialSnackbar extends Vue {
    name = 'BaseMaterialSnackbar';
    internalValue = this.$props.value;

    @Watch('internalValue')
    onPropertyChanged(val, oldVal){
        if (val === oldVal) 
          return this.$emit('input', val);
    }

    @Watch('value')
    onPropertyChanged2(val, oldVal){
      if (val === oldVal)
        return this.internalValue = val
    }
  }
</script>

<style lang="sass">
  .v-snackbar--material
    margin-top: 32px
    margin-bottom: 32px

    .v-alert--material,
    .v-snack__wrapper
      border-radius: 4px

    .v-snack__content
      overflow: visible
      padding: 0
</style>
