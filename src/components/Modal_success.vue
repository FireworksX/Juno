<template lang="pug">
    .form-alert(v-if="settings.enabled")
        .form-alert__body
            .form-alert__overlay
            img(src="images/success.png").form-alert__img
            .form-alert__container
                img(src="images/wave.png").form-alert__wave
                .form-alert__head {{ settings.head }}
                p.form-alert__desc {{ settings.text }}
                .form-alert__btn(@click="changeType('choose')") {{ settings.btnText }}
</template>

<script>
    export default {
        props: ['settings'],
        data () {
            return {

            }
        }
    }
</script>

<style lang="sass">
    /* Alert */

    .form-alert
        width: 400px
        background: #ffffff
        -webkit-border-radius: 7px
        -moz-border-radius: 7px
        border-radius: 7px
        overflow: hidden
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)

    .form-alert__body
        position: relative

    .form-alert__img
        width: 400px
        z-index: 5
        position: relative

    .form-alert__overlay
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #82eac5
        z-index: 4

    .form-alert__container
        padding: 15px 20px 20px 20px
        background: #fff
        position: relative
        z-index: 6
        text-align: center

    .form-alert__wave
        width: 100%
        position: absolute
        top: -30px
        left: 0

    .form-alert__head
        font-weight: 700
        font-size: 24px
        color: #244555
        position: relative
        margin-bottom: 30px
        display: inline-block
        &:after
            content: ' '
            width: 50px
            height: 4px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
            background: #c1cbcf
            position: absolute
            left: 50%
            margin-left: -25px
            bottom: -10px

    .form-alert__desc
        font-weight: 400
        color: #244555
        padding: 0 15px
        margin-bottom: 30px
        line-height: 25px

    .form-alert__btn
        font-weight: 400
        padding: 15px 30px
        font-size: 14px
        background: #a3c6f1
        text-transform: uppercase
        display: inline-block
        color: #fff
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        cursor: pointer
        transition: background .3s
        &:hover
            background: #88a8d3
</style>