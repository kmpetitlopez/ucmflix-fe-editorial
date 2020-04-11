<template>
    <div class="NotFoundScreen">
        <h1 :style="{ color:'gray', fontSize: '124px', lineHeight: '128px' }">
            404
        </h1>
        <h1 :style="{ color:'gray', fontSize: '60px', lineHeight: '64px' }">
            Page not found
        </h1>
    </div>
</template>

<script>
export default {
    name: 'NotFoundScreen',
}
</script>
<style lang="scss" scoped>
.NotFoundScreen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 125px);
}
</style>
