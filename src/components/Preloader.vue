<template lang="pug">
    transition(name="fade")
        .preloader(v-if="unLoaded")
            .preloader__inner
                .preloader__wrapper
                    .preloader__one
                        span J
                    .preloader__two


</template>

<script>
    export default {
        props: ['unLoaded'],
        data () {
            return {}
        }
    }
</script>

<style lang="sass">

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0

    .preloader
        position: fixed
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: 10000
        background: #1E202D

    .preloader__inner
        height: 100%
        display: flex
        justify-content: center
        align-items: center

    .preloader__wrapper
        position: relative

    .preloader__one
        width: 60px
        height: 60px
        border: 2px solid #fbfbfb
        position: absolute
        background: #1e202d
        z-index: 2
        left: 0
        top: 0
        display: flex
        justify-content: center
        align-items: center
        font-size: 30px
        font-weight: 300
        color: #ffffff


    .preloader__two
        width: 60px
        height: 60px
        border: 2px solid #fbfbfb
        position: absolute
        z-index: 1
        left: 0
        top: 0
        transform: rotate(45deg)
        animation: rotate 2s infinite

    @keyframes rotate
        0%
            transform: rotate(45deg)
        100%
            transform: rotate(225deg)



</style>