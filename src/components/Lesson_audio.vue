<template lang="pug">
    .lesson-audio.col-lg-4
        .lesson-audio__inner
            .lesson-audio__track
                .lesson-audio__play(@click="toggleAudio")
                    i.ion-ios-play(v-if="track.toggle === 'play'")
                    i.ion-ios-pause(v-if="track.toggle === 'pause'")
                    svg.lesson-audio__progress
                        circle(r="30" cx="33" cy="33" stroke="#bcff84" stroke-width="3" fill="transparent" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="188")
                .lesson-audio__waves
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_middle
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_high
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
                    span.lesson-audio__wave.lesson-audio__wave_small
            .lesson-audio__time 03:24
            .lesson-audio__meta
                .lesson-audio__title Soundtrack
                .lesson-audio__details
                    span.lesson-audio__name Thomas
                    span.lesson-audio__dot
                    span.lesson-audio__along 12h ago
                    span.lesson-audio__dot
                    span.lesson-audio__comments
                        i.ion-ios-chatbubble
                        |6 comments
</template>

<script>
    export default {
        props: ['obj'],
        data () {
            return {
                track: {
                    toggle: 'play',
                    object: {}
                }
            }
        },
        methods: {
            initAudio() {
                this.track.object = new Audio('http://dnl10.drivemusic.me/dl/online/6E7ySIYGe3BK7mjxEJiqMQ/1525066363/download_music/2013/08/m83-oblivion-ost-oblivion.mp3')
            },
            toggleAudio() {
                if(this.track.toggle === 'play'){
                    this.track.object.play();
                    this.track.toggle = 'pause'
                }else if(this.track.toggle === 'pause'){
                    this.track.object.pause();
                    this.track.toggle = 'play';
                }
            }
        },
        created(){
            this.initAudio()
        }
    }
</script>

<style lang="sass">
    .lesson-audio__inner
        //font-family: 'Ruler', sans-serif
        background: #2b2e41
        padding: 20px 3px 20px 20px
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 10px

    .lesson-audio__track
        display: flex
        align-items: center
        margin: 20px 0
        position: relative

    .lesson-audio__play
        display: flex
        width: 60px
        height: 60px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        font-size: 30px
        justify-content: center
        align-items: center
        padding: 15px
        background: #434451
        color: #ffffff
        cursor: pointer
        position: relative

    .lesson-audio__progress
        position: absolute
        width: 68px
        height: 68px
        left: -3px
        top: -3px

    .lesson-audio__waves
        height: 50px
        position: relative
        margin-left: 20px

    .lesson-audio__wave
        width: 2px
        background: #71728e
        margin-right: 5px
        display: inline-block

    .lesson-audio__wave_small
        height: 10px
        top: 0

    .lesson-audio__wave_middle
        height: 20px
        position: relative
        top: 5px

    .lesson-audio__wave_high
        height: 30px
        position: relative
        top: 10px

    .lesson-audio__time
        color: #71728e
        padding: 5px
        font-size: 16px
        margin-left: 5px
        font-weight: 600
        text-align: right

    .lesson-audio__title
        font-size: 25px
        font-weight: 600
        color: #d0ddef

    .lesson-audio__name,
    .lesson-audio__along,
    .lesson-audio__comments
        font-size: 15px
        font-weight: 600
        color: #71728e
        i
            margin-right: 7px

    .lesson-audio__dot
        display: inline-block
        width: 5px
        height: 5px
        background: #71728e
        margin: 0 7px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        position: relative
        top: -2px



</style>