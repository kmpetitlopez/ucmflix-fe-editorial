<template>
    <div class="MainScreen">
       <div id="app">
          <Transition
            name="main-router"
            mode="out-in"
        >
            <RouterView />
        </Transition>
       </div>
    </div>
</template>

<script>
export default {
    name: 'MainScreen',
}
</script>

<style lang="scss">
@import '@/theme/theme.scss';

</style>
