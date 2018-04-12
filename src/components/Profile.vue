<template lang="pug">
    .profile
        .profile-top
            .container-fluid
                .row
                    .profile-top__logo.col-lg-3
                        img(src="images/logo.png")
                        span JUNO
                    .profile-top__elements.col-lg-3.ml-auto
                        notifications-small
                        person-small


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

    $lightColor: #fff
    $darkColor: #244555
    $lightGray: #dfdfdf
    $blueLight: #1875f0

    .profile
        position: relative
        z-index: 5
        font-family: 'Montserrat', sans-serif

    .profile-top
        padding: 20px 0
        background: $lightColor

    .profile-top__logo
        font-size: 25px
        font-weight: 700
        color: $darkColor
        span
            margin-left: 10px
            position: relative
            top: 5px

    .profile-top__elements
        display: flex
        justify-content: flex-end
        align-items: center





    


















</style>
