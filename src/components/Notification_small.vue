<template lang="pug">
    .notification
        .notification-element
            i.ion-android-notifications-none.notification-element(@click="list.enabled = !list.enabled")
            span.notification-element__indicator
        transition(name="fade")
            ul.notification-list(v-if="list.enabled")
                i.ion-arrow-up-b.notification-list__arrow
                li.notification-list__item
                    i.ion-ios-plus-outline.notification-list__icon
                    .notification-list__body
                        .notification-list__head Уроки
                        .notification-list__desc Был добавлен новый урок на тему Webpack 4!
                    i.ion-ios-close-outline.notification-list__close
                li.notification-list__item
                    i.ion-android-person-add.notification-list__icon
                    .notification-list__body
                        .notification-list__head Друзья
                        .notification-list__desc Maris007 хочет добавть вас в друзья.
                    i.ion-ios-close-outline.notification-list__close
</template>

<script>

    export default {
        data () {
            return {
                list: {
                    enabled: false
                }
            }
        }
    }

</script>

<style lang="sass">

    $lightColor: #fff
    $darkColor: #244555
    $lightGray: #dfdfdf
    $blueLight: #1875f0

    /* Notification Component */

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0


    .notification
        font-size: 30px
        color: $darkColor
        margin-right: 60px
        position: relative

    .notification-element
        cursor: pointer

    .notification-element__indicator
        position: absolute
        right: -5px
        width: 15px
        height: 15px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        background: $blueLight
        border: 2px solid $lightColor

    .notification-list
        position: absolute
        right: -6px
        top: 40px
        font-size: 14px
        background: $lightColor
        border: 2px solid $lightColor
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        padding: 10px
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)

    .notification-list__arrow
        position: absolute
        right: 10px
        top: -11px
        color: $lightColor

    .notification-list__item
        width: 300px
        padding: 10px
        color: $darkColor
        display: flex
        justify-content: space-between
        position: relative
        border-bottom: 1px solid $lightGray
        &:last-child
            border-bottom: none

    .notification-list__close
        position: absolute
        right: 10px
        top: 10px
        font-size: 18px

    .notification-list__icon
        margin-right: 15px
        font-size: 20px
        color: $blueLight

    .notification-list__head
        font-weight: 700
        font-size: 16px

    .notification-list__desc
        font-size: 14px


</style>