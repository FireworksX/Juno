<template lang="pug">
    .lessons
        .container
            lesson-audio
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
                h4.lessons-wrapper__head {{ lessons.length }} Lessons found
                ul.lessons-wrapper__list
                    .row
                        li.lessons-item.col-lg-3(v-for="(lesson, index) in lessons")
                            .lessons-item__wrapper
                                .lessons-item__lock(v-if="!lesson.progress.enabled")
                                    div.lessons-item__icon
                                        i.ion-locked
                                    .lessons-item__text Извените данный урок закрыт для вас. Нужно решить предыдущий. Мы ждём вас!
                                transition(name="fade")
                                    .lesson-informations(v-if="lesson.isDesc")
                                        i.ion-ios-close.lesson-informations__close(@click="lesson.isDesc = false")
                                        .lesson-informations__container
                                            h6.lesson-informations__title {{ lesson.title }}
                                            .lesson-informations__block
                                                p.lesson-informations__desc {{ lesson.desc }}
                                            .lesson-informations__author
                                                img(:src="'images/avatars/'+ lesson.author.avatar").lesson-informations__avatar
                                                span.lesson-informations__nickname {{ lesson.author.nickname }}
                                            span.lesson-informations__date {{ lesson.date }}
                                .lesson-item__content(:class="{ blur: !lesson.progress.enabled || lesson.isDesc }")
                                    .lesson-item__top
                                        img(:src="'lessons/'+ $route.params.id +'/'+ index +'/'+ lesson.bg_name").lesson-item__img
                                        //span.lesson-item__status(:style="{ background: lesson.progress.status.color }") {{ lesson.progress.status.text }}
                                        span.lesson-item__like(@click="lesson.isLiked = !lesson.isLiked")
                                            i.ion-android-favorite-outline(v-if="!lesson.isLiked")
                                            i.ion-android-favorite.lesson-item__like_active(v-if="lesson.isLiked")
                                        .lesson-item__progress
                                            .lesson-item__inner(:style="{ width: setProgress(lesson).width, background: setProgress(lesson).background }")
                                    .lesson-item__center
                                        h6.lesson-item__title {{ lesson.title }}
                                        //p.lesson-item__desc {{ lesson.desc | cutText }}
                                        //.lesson-item__people
                                            img(src="lessons/0/0/avatar1.jpg").lesson-item__peopl
                                            img(src="lessons/0/0/avatar2.jpg").lesson-item__peopl
                                            img(src="lessons/0/0/avatar3.jpg").lesson-item__peopl
                                            img(src="lessons/0/0/avatar4.jpg").lesson-item__peopl
                                            span.lesson-item__more +7 mor
                                        .lesson-desc {{ lesson.desc | cutText }}
                                    .lesson-item__buttons
                                        .lesson-item__details(@click="lesson.isDesc = true")
                                            i.ion-ios-book-outline
                                        .lesson-item__start
                                            i.ion-ios-arrow-thin-right
                                    span.lesson-item__views
                                        i.ion-ios-eye
                                        |{{ lesson.views }}

</template>

<script>

    /*
        TODO: Устранить возможность зайти по ссылке даже если данный курс недоступен
        TODO: Если через dev-tools убрать overlay у заблокированного урока, то его можно использовать
     */

    import Vue from 'vue'
    import Person_small from '../components/Person_small.vue';
    import Lesson_audio from '../components/Lesson_audio.vue'

    Vue.component('person-small', Person_small);
    Vue.component('lesson-audio', Lesson_audio);


    export default {
        data () {
            return {
                routeID: {
                    id: this.$route.params.id,
                },
                profile: {},
                lessons: []
            }
        },
        methods: {
            getSession () {
                this.$http.post("http://localhost:2000/profileAuto").then((res) => {
                    this.profile = res.data;
                    this.getLessons();
                }, (err) => {
                    console.log(err);
                });
            },
            getLessons () {
                this.$http.post("http://localhost:2000/getLessons", this.routeID, {emulateJSON: true}).then((res) => {
                    this.lessons = res.data.paths;
                    this.pushPersonalData();
                }, (err) => {
                    console.log(err)
                })
            },
            pushPersonalData() {
                let i = 0;
                for(let key of this.profile.progress.nodes[this.$route.params.id].lessons){
                    if(key){
                        this.lessons[i].progress = key;
                    }
                    i++;
                }
                console.log(this.lessons)
            },
            setProgress(lesson) {
                let width = lesson.progress.currentStep / lesson.progress.countStep * 100;
                let widthPerCent = `${lesson.progress.currentStep / lesson.progress.countStep * 100}%`;
                let background = '';
                if(width < 25){
                    background = '#fd5c4a'
                }else if(width >= 25 && width <= 50){
                    background = '#e09b76'
                }else if(width > 50 && width < 75){
                    background = '#e8c96f'
                }else if(width >= 75){
                    background = '#a0ca4c'
                }
                let obj = {
                    width: widthPerCent,
                    background
                };
                return obj;
            }
        },
        computed: {

        },
        mounted () {
            this.getSession();
        },
        filters: {
            cutText: (value) => {
                return value.slice(0, 50) + '...'
            }
        }
    }

</script>

<style lang="sass">

    .lessons
        width: 100%
        height: 100%
        background: #000
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

    .lesson-item__content
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

    .lesson-item__progress
        background: #ececec
        width: 100%
        height: 5px

    .lesson-item__inner
        height: 100%

    .lesson-item__center
        padding: 15px
        position: relative

    .lesson-item__like
        position: absolute
        right: 10px
        top: 10px
        color: #fff
        font-size: 25px

    .lesson-item__like_active
        color: #fd5c4a

    .lesson-item__title
        font-weight: 600
        font-size: 16px
        margin-bottom: 10px
        color: #777
        
    .lesson-item__desc
        font-size: 14px
        font-weight: 500
        color: #808080
        
    .lesson-desc
        padding: 7px
        border: 1px solid #d6d6d6
        background: #f6f6f6
        color: #373737
        font-size: 12px


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
        justify-content: flex-end
        margin-bottom: 20px

    .lesson-item__start, .lesson-item__details
        width: 40px
        height: 40px
        padding: 10px 0
        font-size: 20px
        color: #fff
        font-weight: 400
        text-align: center
        position: relative
        cursor: pointer
        display: flex
        justify-content: center
        align-items: center
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        -webkit-box-shadow: 0px 20px 20px 0px rgba(78, 100, 134, 0.5)
        -moz-box-shadow: 0px 20px 20px 0px rgba(78, 100, 134, 0.5)
        box-shadow: 0px 20px 20px 0px rgba(78, 100, 134, 0.5)
        transition: .3s

    .lesson-item__start
        background: #89E253
        margin-right: 15px
        &:hover
            i
                transition: .3s
                transform: translateX(3px)

    .lesson-item__details
        background: #3FADF3
        margin-right: 10px
        &:hover
            i
                transition: .3s
                transform: translateY(3px)

    .lessons-item__lock
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background: rgba(14, 14, 14, 0.5)
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

    .lesson-item__views
        position: absolute
        bottom: 6px
        left: 20px
        display: flex
        font-weight: 500
        font-size: 14px
        color: #515151
        i
            font-size: 22px
            margin-right: 7px

    .lesson-informations
        position: absolute
        z-index: 10
        left: 0
        top: 0
        width: 100%
        height: 100%
        background: rgba(14, 14, 14, 0.5)

    .lesson-informations__close
        position: absolute
        top: 10px
        right: 15px
        font-size: 20px
        color: #888888
        
    .lesson-informations__container
        padding: 10px
        color: #ffffff

    .lesson-informations__title
        font-weight: 500
        font-size: 14px
        margin-top: 20px

    .lesson-informations__block
        padding: 10px
        background: #f6f6f6
        border: 1px solid #000

    .lesson-informations__desc
        font-size: 12px
        font-weight: 400
        color: #111111

    .lesson-informations__author
        margin-top: 10px
        display: flex
        justify-content: center
        align-items: center

    .lesson-informations__avatar
        width: 40px
        height: 40px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        margin-right: 15px

    .lesson-informations__nickname
        font-size: 14px
        color: #ffffff
        font-weight: 400

    .lesson-informations__date
        position: absolute
        bottom: 10px
        right: 10px
        font-size: 12px
        color: #eeeeee
        font-weight: 500

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0



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