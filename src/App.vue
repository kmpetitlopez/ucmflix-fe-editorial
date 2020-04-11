<template>
  <MainScreen />
</template>

<script src="node_modules/shaka-player/dist/shaka-player.compiled.js"></script>
<script src="myapp.js"></script>
<script>
import MainScreen from '@/screens/MainScreen.vue'

export default {
  name: 'App',
  components: {
    MainScreen,
  }
}
</script>