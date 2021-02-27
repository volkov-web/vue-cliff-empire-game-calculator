<template>
  <div class="selector">
    <div class="step2-header"> {{ headerText }} </div>
    <div :id="selectorID" @click="selector_switch_active" class="step2-select selector_switch_active">
        <div v-for="(item, index) in objItemSelector" v-bind:key="index" :data-customkey="index" :id="item.id" :class="{ active: activeIndex == index }" class="step2-wrapper selector_switch_active_item">
            <div class="step2-img-wrapper"><img ondragstart = "return false;" class="step2-img" :src="refinedImgSrc(item)"></div>
            <div class="step2-img-description"> {{ item.imgDescription }} </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CustomSelector',
  props: [
    'selectorID',
    'headerText',
    'objItemSelector',
    /* Remind:
    objItemSelector [
      {
        id: "",
        imgName: "",
        imgDescription: "",
      },
    ]
    */
  ],
  data() {
    return {
      activeIndex: 0,
    }
  },
  created: function(){
  },
  components: {
  },
  computed: {
  },
  methods: {
    refinedImgSrc(item){
      return require(`../assets/imgs/${item.imgName}`);
    },
    selector_switch_active(event){
      let closest = event.target.closest(".selector_switch_active_item");
      if(closest == null) return;
      if(event.currentTarget.contains(closest) == false) return;
      this.activeIndex = Number(closest.dataset.customkey);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
