<template lang="pug">
    .vignette
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style lang="sass">
    .vignette
        width: 100%
        height: 100%
        min-height: 100%
        display: block
        content: ""
        pointer-events: none
        position: fixed
        z-index: 3
        top: 0
        left: 0
        background-attachment: fixed
        background-image: -webkit-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -moz-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -o-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -ms-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -webkit-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -moz-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -o-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: -ms-radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-image: radial-gradient(50% 50%, ellipse closest-side, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 120%)
        background-repeat: no-repeat
</style>