<template lang="pug">
    .lessons
        .container
            //.lessons-statistics
            //    h4.lessons-statistics__title Статистика
            //    .lessons-statistics__container
            //        ul.lessons-statistics__list
            //            .row
            //                li.lessons-statistics__item.col-lg-4
            //                    .lessons-statistics__icon
            //                        i.ion-ios-people.lessons-statistics__icon_one
            //                    .lessons-body
            //                        .lessons-body__head Новых пользователей
            //                        .lessons-body__count
            //                            span.lessons-body__count_bold 34
            //                            |На этой неделе
            //                li.lessons-statistics__item.col-lg-4
            //                    .lessons-statistics__icon
            //                        i.ion-clipboard.lessons-statistics__icon_two
            //                    .lessons-body
            //                        .lessons-body__head Человек решило этот тест
            //                        .lessons-body__count
            //                            span.lessons-body__count_bold 841
            //                            |В этом месяце
            //                li.lessons-statistics__item.col-lg-4
            //                    .lessons-statistics__icon
            //                        i.ion-android-favorite.lessons-statistics__icon_three
            //                    .lessons-body
            //                        .lessons-body__head Обсуждений
            //                        .lessons-body__count
            //                            span.lessons-body__count_bold 438
                                        |На этой неделе
            .lessons-wrapper
                h4.lessons-wrapper__head 7 Lessons found
                ul.lessons-wrapper__list
                    .row
                        li.lessons-item.col-lg-3(v-for="(lesson, index) in lessons")
                            .lessons-item__wrapper
                                .lessons-item__lock(v-if="!lesson.enabled")
                                    div.lessons-item__icon
                                        i.ion-locked
                                    .lessons-item__text Извените данный урок закрыт для вас. Нужно решить предыдущий. Мы ждём вас!
                                .lesson-item__content(:class="{ blur: !lesson.enabled }")
                                    .lesson-item__top
                                        img(:src="'lessons/'+ $route.params.id +'/'+ index +'/'+ lesson.bg_name").lesson-item__img
                                        span.lesson-item__status(:style="{ background: lesson.status.color }") {{ lesson.status.text }}
                                    .lesson-item__center
                                        h6.lesson-item__title {{ lesson.title }}
                                        .lesson-item__peoples
                                            img(src="lessons/0/0/avatar1.jpg").lesson-item__people
                                            img(src="lessons/0/0/avatar2.jpg").lesson-item__people
                                            img(src="lessons/0/0/avatar3.jpg").lesson-item__people
                                            img(src="lessons/0/0/avatar4.jpg").lesson-item__people
                                            span.lesson-item__more +7 more
                                    .lesson-item__buttons
                                        .lesson-item__start Начать
                                        .lesson-item__details Подробнее

</template>

<script>

    import Vue from 'vue'
    import Person_small from '../components/Person_small.vue';

    Vue.component('person-small', Person_small);


    export default {
        data () {
            return {
                profile: {},
                lessons: [
                    {
                        title: 'Введение в HTML',
                        bg_name: 'post_bg.png',
                        parent: 0,
                        enabled: true,
                        status: {
                            color: '#ffed32',
                            text: 'Finished'
                        }
                    },
                    {
                        title: 'Позиционирование',
                        bg_name: 'post_bg.png',
                        parent: 1,
                        enabled: false,
                        status: {
                            color: '#fff',
                            text: 'Ongoing'
                        }
                    },
                ]
            }
        },
        methods: {
            getSession () {
                this.$http.post("http://localhost:2000/getSessionAuto").then((res) => {
                    this.profile = res.data;
                    console.log(this.profile)
                }, (err) => {
                    console.log(err);
                });
            },
        },
        mounted () {
            this.getSession()
        }
    }

</script>

<style lang="sass">

    .lessons
        width: 100%
        height: 100%
        background: #f5f5f5
        font-family: 'Montserrat', sans-serif

    .lessons-statistics
        padding: 20px 0
        color: #777777
        font-size: 16px

    .lessons-statistics__container
        padding: 20px 20px 5px 20px
        background: #fff
        -webkit-border-radius: 7px
        -moz-border-radius: 7px
        border-radius: 7px
        margin-top: 10px
        width: 100%
        -webkit-box-shadow: 0px 3px 20px 0px rgba(163, 198, 241, 0.3)
        -moz-box-shadow: 0px 3px 20px 0px rgba(163, 198, 241, 0.3)
        box-shadow: 0px 3px 20px 0px rgba(163, 198, 241, 0.3)

    .lessons-statistics
        width: 100%

    .lessons-statistics__item
        display: flex
        position: relative
        &:after
            content: ''
            height: 40px
            width: 2px
            background: #ececec
            position: absolute
            right: 5px
            top: 15px
        &:last-child
            &:after
                display: none

    .lessons-statistics__icon
        padding: 40px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        background: #fff
        color: #212121
        margin-right: 20px
        font-size: 30px
        position: relative
        -webkit-box-shadow: 0px 0px 20px 0px rgba(163, 198, 241, 0.3)
        -moz-box-shadow: 0px 0px 20px 0px rgba(163, 198, 241, 0.3)
        box-shadow: 0px 0px 20px 0px rgba(163, 198, 241, 0.3)

    .lessons-statistics__icon_one
        position: absolute
        top: 25px
        left: 25px
        color: #acd1ff

    .lessons-statistics__icon_two
        position: absolute
        top: 25px
        left: 29px
        color: #eedc5a

    .lessons-statistics__icon_three
        position: absolute
        top: 27px
        left: 27px
        color: #e14f3f

    .lessons-body
        margin-top: 5px

    .lessons-body__head
        font-size: 16px
        margin-bottom: 5px
        color: #323C47

    .lessons-body__count
        font-size: 14px

    .lessons-body__count_bold
        font-weight: 700
        font-size: 20px
        margin-right: 10px

    /* Lessons Container */

    .lessons-wrapper
        padding-top: 50px

    .lessons-wrapper__head
        font-size: 14px
        margin-bottom: 30px
        font-weight: 500

    .lessons-item__wrapper
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        overflow: hidden
        min-height: 300px
        background: #ffffff
        -webkit-box-shadow: 0px 20px 20px 0px rgba(78, 100, 134, 0.5)
        -moz-box-shadow: 0px 20px 20px 0px rgba(78, 100, 134, 0.5)
        box-shadow: 0px 20px 20px 0px rgba(78, 100, 134, 0.5)
        position: relative

    .lesson-item__top
        position: relative

    .lesson-item__img
        width: 100%

    .lesson-item__status
        position: absolute
        bottom: 10px
        right: 10px
        color: #797979
        padding: 5px 10px
        display: inline-block
        background: #ffffff
        font-size: 12px
        font-weight: 500
        -webkit-border-radius: 12px
        -moz-border-radius: 12px
        border-radius: 12px

    .lesson-item__center
        padding: 15px

    .lesson-item__title
        font-weight: 700
        font-size: 16px
        margin-bottom: 10px

    .lesson-item__people
        width: 35px
        height: 35px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        border: 1px solid #fff
        &:nth-child(2)
            position: relative
            left: -15px
        &:nth-child(3)
            position: relative
            left: -30px
        &:nth-child(4)
            position: relative
            left: -45px

    .lesson-item__more
        position: relative
        left: -15px
        font-size: 14px
        font-weight: 700

    .lesson-item__buttons
        display: flex
        margin-top: 30px

    .lesson-item__start, .lesson-item__details
        width: 50%
        padding: 10px 0
        font-size: 14px
        color: #777
        font-weight: 700
        text-align: center
        position: relative
        cursor: pointer

    .lesson-item__start
        &:after
            content: ' '
            width: 1px
            height: 20px
            background: #777777
            position: absolute
            right: 0

    .lessons-item__lock
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background: rgba(14, 14, 14, 0.51)
        color: #ffffff
        z-index: 10
        text-align: center

    .lessons-item__icon
        margin-top: 70px
        font-size: 20px
        color: #fff

    .lessons-item__text
        font-size: 14px
        font-weight: 500
        padding: 20px
        margin-top: 10px

    .blur
        filter: blur(5px)

    .lesson__lock
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, 0.6)


</style>