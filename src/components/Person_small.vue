<template lang="pug">
    .person
        .person__avatar
            img(src="images/avatars/avatar.jpg")
        .person__name spaceman
        i.ion-ios-arrow-down.person__down
</template>

<script>

    export default {
        data () {
            return {
                msg: 'Profile Page!'
            }
        }
    }

</script>

<style lang="sass">

    $lightColor: #fff
    $darkColor: #244555
    $lightGray: #dfdfdf
    $blueLight: #1875f0

    .person
        display: flex
        justify-content: space-around
        align-items: center
        margin-right: 60px

    .person__avatar
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        overflow: hidden
        border: 4px solid $lightGray
        margin-right: 15px

    .person__name
        font-size: 20px
        color: $darkColor

    .person__down
        font-size: 20px
        color: $darkColor
        position: relative
        right: -15px
        top: 1px

</style>