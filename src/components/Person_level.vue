<template lang="pug">
    .person-level
        span {{ level }}
        svg.person-level__progress(:stroke-dashoffset="progress" v-bind:stroke="stroke")
</template>

<script>

    let initProgress = () => {
        let paper = Snap('.person-level__progress');
        let path = paper.path(`M5,35 L35,5 L65,35 L35,65 Z`);
        path.attr({
            fill: '#fff',
            strokeWidth: 6,
            strokeLinejoin: "round",
            strokLinecap: "round",
            strokeDasharray: "170",
        })
    };


    export default {
        props: ['startExp', 'endExp', 'level'],
        data () {
            return {
                progress: 170,
                stroke: '#000'
            }
        },
        methods: {
            setProgress(){
                let perCent = this.startExp * 100 / this.endExp;

                if(perCent <= 25)
                    this.stroke = '#ff6e58';
                else if(perCent <= 50)
                    this.stroke = '#ffb96d';
                else if(perCent <= 75)
                    this.stroke = '#fffa8c';
                else if(perCent <= 100)
                    this.stroke = '#b0ff8e';


                this.progress = 170 - ((170 * perCent ) / 100);
            }
        },
        mounted(){
            initProgress();
            this.setProgress()
        }
    }
</script>

<style lang="sass">

    .person-level
        width: 70px
        height: 70px
        margin-top: 50px
        position: relative
        display: flex
        align-items: center
        justify-content: center
        span
            position: relative
            z-index: 1
            font-size: 16px
            font-weight: 500

    .person-level__progress
        width: 100%
        height: 100%
        position: absolute
        z-index: 0
        left: 0
        top: 0

</style>