<template>
    <div>
      <img v-if="isInit" alt="Vue logo" src="../../public/images/init.jpg" width="100%" />
    </div>
</template>

<script>
export default {
  props: [
    "isInit",
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
