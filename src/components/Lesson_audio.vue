<template lang="pug">
    .lesson-audio.col-xs-4.col-lg-4.col-md-6.col-sm-12
        .lesson-audio__inner
            .lesson-audio__more
            .lesson-audio__track
                .lesson-audio__play(@click="toggleAudio")
                    i.ion-ios-locked(v-if="obj.lock")
                    i.ion-ios-play(v-if="track.toggle === 'play'")
                    i.ion-ios-pause(v-if="track.toggle === 'pause'")
                    svg.lesson-audio__progress
                        circle(r="30" cx="33" cy="33" stroke="#71728e" stroke-width="3" fill="transparent" stroke-linecap="round" stroke-dasharray="189" v-bind:stroke-dashoffset="track.offset")
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
            .lesson-audio__time {{ track.duration }}
            .lesson-audio__meta
                .lesson-audio__title {{ obj.song.title }}
                .lesson-audio__details
                    span.lesson-audio__name {{ obj.author.name }}
                    span.lesson-audio__dot
                    span.lesson-audio__along {{ obj.timeAgo }}h ago
                    span.lesson-audio__dot
                    span.lesson-audio__comments
                        i.ion-ios-eye
                        |{{ obj.views }}
</template>

<script>
    /*
        TODO: Добавить возможность плейлистов (несколько теков)
     */

    export default {
        props: ['obj'],
        data () {
            return {
                track: {
                    toggle: 'lock',
                    duration: '',
                    offset: 189,
                    object: {}
                }
            }
        },
        methods: {
            initAudio() {
                this.track.object = new Audio(this.obj.song.url);
                this.track.object.addEventListener('timeupdate', () => {
                    this.track.offset = 189 - (this.track.object.currentTime / this.track.object.duration * 100);
                });
                this.track.object.addEventListener('loadedmetadata', () => {
                    this.track.duration = this.track.object.duration;
                    let s = this.track.duration % 60;
                    let m = Math.floor( this.track.duration / 60 ) % 60;

                    s = s < 10 ? "0"+s : s;
                    m = m < 10 ? "0"+m : m;

                    this.track.duration = `${m}:${Math.floor(s)}`
                });
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
            this.initAudio();
            this.track.toggle = (this.obj.lock === true) ? 'lock' : 'play';
        }
    }
</script>

<style lang="sass">
    .lesson-audio
        margin-bottom: 30px

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
        font-size: 20px
        font-weight: 600
        color: #d0ddef

    .lesson-audio__name,
    .lesson-audio__along,
    .lesson-audio__comments
        font-size: 14px
        font-weight: 500
        color: #71728e
        i
            margin-right: 7px
            margin-left: 3px

    .lesson-audio__dot
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


    @media (max-width: 1199px)
        .lesson-audio__wave:nth-child(n+26)
            display: none

        .lesson-audio__title
            font-size: 22px

        .lesson-audio__name,
        .lesson-audio__along,
        .lesson-audio__comments
            font-size: 14px


    @media (max-width: 991px)
        .lesson-audio__wave:nth-child(n+26)
            display: inline-block



    /*@media (max-width: 767px)*/




    /*@media (max-width: 575px)*/



</style>