<template lang="pug">
    .lesson-post(v-if="isEnable")
        .lesson-post__inner(:class="{ inner_active: isOpenMore }")
            //agile(v-bind:arrows="false" v-bind:dots="false" v-bind:autoplay="true" v-bind:autoplaySpeed="5000" v-bind:unagile="true")
            .slide-one
                img(:src="'assets/lessons/0/' + id + '/post_bg.png'").slide-one__bg
                .lesson-post__wrapper
                    .lesson-post__overlay
                    .lesson-post__like
                        i.ion-android-favorite-outline
                    .lesson-post__more(@click="openMore" v-bind:class="{ more_active: isOpenMore }")
                        i.ion-android-more-vertical
                    .lesson-post__meta
                        h4.lesson-post__title {{ options.title }}
        transition(name="openMore")
            .slide-two(v-show="isOpenMore")
                //p.lesson-post__desc {{ options.desc }}
                h5.lesson-post__head Награды
                .lesson-post__reward
                    .lesson-post__money
                        img(src="assets/stack_money.png")
                        span +13
                    .lesson-post__achievement
                        img(src="assets/achievement/starter-pack/one.png")
                    .lesson-post__exp
                        img(src="assets/exp_star.png")
                        span +30
</template>

<script>
    import Agile from "../../node_modules/vue-agile/src/Agile";

    export default {
        components: {Agile},
        props: ['options', 'id'],
        data () {
            return {
                isEnable: true,
                isOpenMore: false,
                image: './assets/public/app/lessons/0/0/post_bg.png'
//                options: {
//                    isVideo: true,
//                    difficult: 0,
//                    description: 'After flattening the caviars, varnish rice. Break oysters freshly, then mix with iced tea and serve equally in plastic bag.',
//                    title: 'Введение в HTML',
//                    meta: {
//                        authorName: 'Thomas',
//                        authorUrl: '/user/0',
//                        timeAgo: 1,
//                        views: 27198,
//                    },
//                    rewards: {
//                        money: 10,
//                        achievementPackName: 'starter',
//                        achievementName: 'one',
//                        exp: 25
//                    }
//                },
            }
        },
        methods: {
            openMore(){
                this.isOpenMore = !this.isOpenMore;
                this.$emit('more', {id: this.id, isOpenMore: this.isOpenMore});
            }
        },
        created(){
            if(this.id === undefined) this.isEnable = false; //В цикле Lessons.vue выполняется лишняя итерация, в props['options'] приходит undefined и мы получаем ошибку
        }
    }
</script>

<style lang="sass" scoped>

    .openMore-enter-active, .openMore-leave-active
        transition: all .5s
        max-height: 100%

    .openMore-enter, .openMore-leave-to
        opacity: 0
        max-height: 0


    .lesson-post
        margin-bottom: 30px
        position: relative

    .lesson-post__inner
        background: #fff
        -webkit-box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.28)
        -moz-box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.28)
        box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.28)
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        overflow: hidden

    .inner_active
        animation: itemClick .5s ease

    @keyframes itemClick
        0%
            transform: scale(1)
        50%
            transform: scale(.97)
        100%
            transform: scale(1)

    .lesson-post__wrapper
        left: 0
        top: 0
        width: 100%
        height: 180px
        -webkit-background-size: cover
        background-size: cover
        position: relative
        display: flex
        align-items: flex-end
        z-index: 3

    .lesson-post__overlay
        background: -moz-linear-gradient(bottom,  rgba(0,0,0,0.69) 0%, rgba(0,0,0,0.5) 49%, rgba(0,0,0,0) 99%)
        background: -webkit-linear-gradient(bottom,  rgba(0,0,0,0.69) 0%,rgba(0,0,0,0.5) 49%,rgba(0,0,0,0) 99%)
        background: linear-gradient(to top,  rgba(0,0,0,0.69) 0%,rgba(0,0,0,0.5) 49%,rgba(0,0,0,0) 99%)
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b0000000', endColorstr='#00000000',GradientType=0 )
        position: absolute
        height: 100%
        width: 100%
        left: 0
        top: 0

    .lesson-post__like
        position: absolute
        top: 10px
        right: 10px
        color: #ffffff
        font-size: 23px
        cursor: pointer

    .lesson-post__more
        width: 20px
        height: 20px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        position: absolute
        bottom: 20px
        right: 10px
        display: flex
        justify-content: center
        align-items: center
        color: #ffffff
        font-size: 30px
        cursor: pointer
        z-index: 1
        transition: .2s

    .more_active
        transform: rotate(90deg)

    .slide-one
        position: relative

    .slide-one__bg
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0

    .lesson-post__title
        font-size: 18px
        font-weight: 600
        color: #fff
        margin-top: 20px

    .lesson-post__meta
        position: relative
        padding: 10px
        width: 100%

    .slide-two
        position: absolute
        padding: 0 20px
        width: 100%
        height: 100%
        background: #ffffff
        -webkit-box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.28)
        -moz-box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.28)
        box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.28)
        border-bottom-left-radius: 5px
        border-bottom-right-radius: 5px
        overflow: hidden
        z-index: 1

    .lesson-post__head
        font-size: 16px
        color: #000000
        font-weight: 500
        margin: 10px 0
        text-align: center

    .lesson-post__reward
        display: flex
        justify-content: space-around
        align-items: center

    .lesson-post__money
        display: flex
        flex-direction: column
        align-items: center
        img
            width: 40px
        span
            font-size: 14px
            font-weight: 700
            color: #000000
            margin-top: 10px

    .lesson-post__exp
        display: flex
        flex-direction: column
        align-items: center
        img
            width: 40px
        span
            font-size: 14px
            font-weight: 700
            color: #000000
            margin-top: 10px

</style>