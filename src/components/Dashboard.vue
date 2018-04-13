<template lang="pug">
    .dashboard
        .dashboard-nav
            .dashboard-nav__logo
                img(src="images/logo.png").dashboard-nav__icon
                span JUNO
            ul.dashboard-nav__list
                li.dashboard-nav__item
                    i.ion-ios-settings
                    |Настройки
        .dashboard-top
            .container-fluid
                .row
                    .dashboard-top__search.col-lg-5 dsg
                    .dashboard-top__elements.col-lg-5.ml-auto
                        notifications-small
                        //person-small
        //            <!--.profile-top__logo.col-lg-3-->
        //                <!--img(src="images/logo.png")-->
        //                <!--span JUNO-->
        //            <!--.profile-top__elements.col-lg-3.ml-auto-->
        //                <!--notifications-small-->
        //                <!--person-small-->
        //<!--.profile-container-->
        //    <!--.container-->
        //        <!--.row-->
        //            <!--.settings-block.col-lg-4-->
        //                <!--.settings-->
        //                    <!--.settings__head Настройки-->
        //                    <!--ul.settings__list-->
        //                        <!--li.settings__item Увелечение производительности-->





</template>

<script>

    import Vue from 'vue'
    import Person_small from '../components/Person_small.vue';
    import Notifications_small from '../components/Notification_small.vue';
//    console.log(Notifications_small)

    Vue.component('person-small', Person_small);
    Vue.component('notifications-small', Notifications_small);

    export default {
        data () {
            return {
                msg: 'Profile Page!'
            }
        }
    }

</script>

<style lang="sass">

    $lightLow: #fff
    $darkMid: #244555
    $darkHi: #1a2535
    $grayLow: #F8F9FF
    $grayMid: #f8f8f8
    $blueLow: #a3c6f1
    $blueMid: #1875f0

    .dashboard
        position: relative
        z-index: 5
        font-family: 'Montserrat', sans-serif
        background: $grayLow
        min-height: 100vh

    .dashboard-nav
        width: 300px
        height: 100vh
        position: absolute
        left: 0
        top: 0
        background: $darkHi
        -webkit-box-shadow: 0px 0px 30px 0px rgba(163, 198, 241, 0.75)
        -moz-box-shadow: 0px 0px 30px 0px rgba(163, 198, 241, 0.75)
        box-shadow: 0px 0px 30px 0px rgba(163, 198, 241, 0.75)

    .dashboard-nav__logo
        display: flex
        flex-direction: column
        color: $lightLow
        font-weight: 700
        font-size: 25px
        align-items: center

    .dashboard-nav__icon
        width: 20%
        margin: 15px 0 7px 0

    .dashboard-nav__list
        margin-top: 50px

    .dashboard-nav__item
        padding: 10px 0 10px 30px
        color: $lightLow
        font-size: 18px
        font-weight: 400
        cursor: pointer
        transition: .3s
        i
            margin-right: 10px
        &:hover
            background: $darkMid

    .dashboard-top
        padding-left: 300px

    .dashboard-top__elements
        display: flex
        justify-content: flex-end

    .profile-top
        padding: 15px 0
        background: $lightLow
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)

    .profile-top__logo
        font-size: 25px
        font-weight: 700
        color: $darkMid
        span
            margin-left: 10px
            position: relative
            top: 5px

    .profile-top__elements
        display: flex
        justify-content: flex-end
        align-items: center

    .profile-container
        margin-top: 50px

    /* Settings component */

    .settings
        background: $lightLow
        padding: 10px
        -webkit-border-radius: 7px
        -moz-border-radius: 7px
        border-radius: 7px
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)

    .settings__head
        font-weight: 700
        font-size: 16px
        color: $darkMid
        border-bottom: 1px solid $grayMid

    .settings__list
        padding: 10px 0

    .settings__item
        padding: 5px 0


    


















</style>
