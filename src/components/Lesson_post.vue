<template lang="pug">
    .lesson-post.col-xs-4.col-lg-4.col-md-6.col-sm-12
        .lesson-post__inner
            agile(v-bind:arrows="false" v-bind:dots="false" v-bind:autoplay="true" v-bind:autoplaySpeed="5000")
                //.slide.slide__one
                    p.lesson-post__desc After flattening the caviars, varnish rice. Break oysters freshly, then mix with iced tea and serve equally in plastic bag.
                    .lesson-post__details
                        .lesson-post__isvideo
                            span Have video
                        .lesson-post__difficult
                            span High
                .slide.slide__two
                    h4.lesson-post__head Награды
                    .lesson-post__rewerds
                        .lesson-post__money
                            i.ion-social-usd
                            //img(src="access/stack_money.png")
                            span +17
                        .lesson-post__achievement
                        .lesson-post__exp
            .lesson-post__meta
                .lesson-post__title Введение в HTML
                .lesson-post__datas
                    span.lesson-post__name Thomas
                    span.lesson-post__dot
                    span.lesson-post__along 2h ago
                    span.lesson-post__dot
                    span.lesson-post__comments
                        i.ion-ios-eye
                        |27232
</template>

<script>
    import Agile from "../../node_modules/vue-agile/src/Agile";

    export default {
        components: {Agile},
        data () {
            return {}
        }
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
        font-weight: 300
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
        position: relative
        top: -20px
        font-weight: 700

    .lesson-post__money
        font-weight: 700
        color: #ffffff
        position: relative
        &:before
            content: ''
            width: 50px
            height: 50px
            background: rgba(0, 231, 110, 0.51)
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
            left: 0
            right: 0
            top: 0
            bottom: 0
            position: absolute
        img
            width: 30px

</style>