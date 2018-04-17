<template lang="pug">
    .person-small
        .person-small__avatar(@click="listShow = !listShow")
            img(src="images/avatars/avatar.jpg")
        transition(name="fade")
            ul.person-small__list(v-if="listShow")
                i.ion-arrow-up-b.person-small__arrow
                li.person-small__item
                    .person-small__logout
                        i.ion-log-out
                        |Выйти
</template>

<script>

    export default {
        props: ['user'],
        data () {
            return {
                listShow: false
            }
        },
        methods: {

        },

    }

</script>

<style lang="sass">

    $lightColor: #fff
    $darkColor: #244555
    $lightGray: #dfdfdf
    $blueLight: #1875f0

    .person-small
        position: fixed
        z-index: 100
        right: 30px
        top: 30px
        display: flex
        justify-content: flex-end
        font-family: 'Montserrat', sans-serif

    .person-small__avatar
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        overflow: hidden
        border: 3px solid $lightGray
        width: 50px
        height: 50px
        position: relative
        cursor: pointer

    .person-small__list
        position: absolute
        top: 66px
        right: 5px
        background: $lightColor
        -webkit-box-shadow: 0px 8px 60px 0px rgba(24, 117, 240, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(24, 117, 240, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(24, 117, 240, 0.2)
        width: 200px
        -webkit-border-radius: 7px
        -moz-border-radius: 7px
        border-radius: 7px
        text-align: center

    .person-small__arrow
        -webkit-box-shadow: 0px 8px 60px 0px rgba(24, 117, 240, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(24, 117, 240, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(24, 117, 240, 0.2)
        position: absolute
        top: -16px
        right: 10px
        font-size: 25px
        color: $lightColor

    .person-small__logout
        font-weight: 400
        padding: 10px 30px
        font-size: 14px
        background: #a3c6f1
        text-transform: uppercase
        display: inline-block
        color: #fff
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        cursor: pointer
        transition: background .3s
        margin: 15px 0
        &:hover
            background: #88a8d3
        i
            margin-right: 10px

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0



</style>