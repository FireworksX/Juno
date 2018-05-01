<template lang="pug">
    .lesson-post.col-xs-4.col-lg-4.col-md-6.col-sm-12
        .lesson-post__inner
            agile(v-bind:arrows="false" v-bind:dots="false" v-bind:autoplay="true" v-bind:autoplaySpeed="5000")
                .slide.slide__one
                    p.lesson-post__desc {{ options.description }}
                    .lesson-post__details
                        .lesson-post__isvideo(v-if="options.isVideo")
                            span Have video
                        .lesson-post__difficult
                            span High
                .slide.slide__two
                    h4.lesson-post__head Награды
                    .lesson-post__rewards
                        .lesson-post__money
                            img(src="access/stack_money.png")
                            span +{{ options.rewards.money }}
                        .lesson-post__achievement
                            img(:src="'access/achievement/'+ options.rewards.achievementPackName +'-pack/'+ options.rewards.achievementName +'.png'")
                        .lesson-post__exp
                            img(src="access/exp_star.png")
                            span +{{ options.rewards.exp }}
                //.slide.slide__three
                    h4.lesson-post__impressions Впечатления
                    .lesson-post__imp
                        .lesson-post__complexity
                            .lesson-post__text Оцените сложность
                            .lesson-post__select
                                span.lesson-post__dif.lesson-post__low Легко
                                span.lesson-post__dif.lesson-post__middle Средне
                                span.lesson-post__dif.lesson-post__high Сложно
                        //.lesson-post__btns
                            .lesson-post__attachment
                                i.ion-android-attach
                            .lesson-post__send Отправить
                                i.ion-ios-paperplane-outline
            .lesson-post__meta
                .lesson-post__title {{ options.title }}
                .lesson-post__datas
                    span.lesson-post__name {{ options.meta.authorName }}
                    span.lesson-post__dot
                    span.lesson-post__along {{ options.meta.timeAgo }}h ago
                    span.lesson-post__dot
                    span.lesson-post__comments
                        i.ion-ios-eye
                        |{{ options.meta.views }}
</template>

<script>
    import Agile from "../../node_modules/vue-agile/src/Agile";

    export default {
        components: {Agile},
        //props: ['options'],
        data () {
            return {
                options: {
                    isVideo: true,
                    difficult: 0,
                    description: 'After flattening the caviars, varnish rice. Break oysters freshly, then mix with iced tea and serve equally in plastic bag.',
                    title: 'Введение в HTML',
                    meta: {
                        authorName: 'Thomas',
                        authorUrl: '/user/0',
                        timeAgo: 1,
                        views: 27198,
                    },
                    rewards: {
                        money: 10,
                        achievementPackName: 'starter',
                        achievementName: 'one',
                        exp: 25
                    }
                },
                impressions: {
                    complexity: 0
                }
            }
        },
    }
</script>

<style lang="sass">
    .lesson-post
        margin-bottom: 30px

    .lesson-post__inner
        background: #2b2e41
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 10px
        overflow: hidden

    .lesson-post__desc
        font-size: 14px
        font-weight: 500
        color: #ffffff
        text-align: center
        margin-top: 5px

    .slide__one
        position: relative
        padding: 20px

    .lesson-post__details
        display: flex
        justify-content: space-between
        margin-top: 40px

    .lesson-post__isvideo
        padding-left: 20px
        position: relative
        &:before
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
            content: ''
            width: 10px
            height: 10px
            background: #87fd7b
            position: absolute
            left: 0
            top: 5px
        span
            background: #434451
            font-size: 12px
            padding: 5px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
            color: #ffffff

    .lesson-post__difficult
        padding-right: 20px
        position: relative
        &:after
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
            content: ''
            width: 10px
            height: 10px
            background: #fd5c4a
            position: absolute
            right: 0
            top: 5px
        span
            background: #434451
            font-size: 12px
            padding: 5px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
            color: #ffffff

    .lesson-post__meta
        padding: 20px

    .lesson-post__title
        font-size: 20px
        font-weight: 600
        color: #d0ddef

    .lesson-post__name,
    .lesson-post__along,
    .lesson-post__comments
        font-size: 14px
        font-weight: 500
        color: #71728e
        i
            margin-right: 7px
            margin-left: 3px

    .lesson-post__dot
        display: inline-block
        width: 3px
        height: 3px
        background: #71728e
        margin: 0 7px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        position: relative
        top: -2px

    .slide__two
        padding: 20px

    .lesson-post__head
        text-align: center
        font-size: 20px
        color: #abacca
        margin-bottom: 15px
        font-weight: 700

    .lesson-post__rewards
        display: flex
        justify-content: space-around

    .lesson-post__money
        font-weight: 700
        color: #ffffff
        position: relative
        display: flex
        flex-direction: column
        img
            width: 40px
            margin-top: 15px
        span
            margin-top: 10px
            position: relative
            left: 5px

    .lesson-post__exp
        font-weight: 700
        color: #ffffff
        position: relative
        display: flex
        flex-direction: column
        img
            width: 40px
            margin-top: 15px
        span
            margin-top: 5px
            position: relative
            left: 3px

    /* impressions */

    .lesson-post__impressions
        text-align: center
        font-weight: 500
        font-size: 18px
        color: #D0DDE4
        margin: 15px 0

    .lesson-post__complexity
        padding: 0 20px

    .lesson-post__text
        font-weight: 500
        font-size: 16px
        color: #ffffff
        text-align: center

    .lesson-bar
        margin-top: 20px
        position: relative
        padding-bottom: 5px
        width: 100%
        height: 10px

    .lesson-post__select
        display: flex
        justify-content: space-around
        margin-top: 10px

    .lesson-post__dif
        padding: 5px 10px
        color: #ffffff
        background: #434451
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        cursor: pointer
    
    .dif-active
        border: 2px solid #C6DDEF

    .lesson-post__btns
        display: flex
        justify-content: center
        margin-top: 15px
        align-items: flex-end

    .lesson-post__send
        display: flex
        justify-content: center
        align-items: center
        background: #434451
        color: #C6DDEF
        font-size: 14px
        font-weight: 500
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        padding: 7px 15px

    .lesson-post__attachment
        display: flex
        justify-content: center
        align-items: center
        background: #434451
        color: #C6DDEF
        font-size: 20px
        font-weight: 500
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px


</style>