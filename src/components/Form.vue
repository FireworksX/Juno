<template lang="pug">
    .form
        #form__overlay
        .form__progress(:style="{ width: widthProgress }")
        .form-register
            .form-register__body.animated(:class="{ shake: isMistakeNext }")
                i.ion-android-arrow-forward.form__btn(@click="next" v-if="step !== 4" v-bind:class="{ next_wrong: isMistake }")
                .form__container(v-if="step !== countStep")
                    .form__caption(v-bind:class="{ form__caption_active: isActive }") {{ questions[step] }}
                    input.form__input(type="text" v-model="personalData.name" v-if="step === 0" )(@input="checkInputName")
                    input.form__input(type="text" v-model="personalData.login" v-if="step === 1")(@input="checkInputLogin")
                    input.form__input(type="text" v-model="personalData.mail" v-if="step === 2")(@input="checkInputMail")
                    input.form__input(type="password" v-model="personalData.pass" v-if="step === 3")(@input="checkInputPass")
                    .form__line(v-bind:class="{ line_wrong: isMistake }")
                .form-register__response(v-if="step === countStep") {{ this.response.text }}
                    .form-register__continue(v-if="this.response.code === 201") Продолжить

</template>

<script>
    import 'particles.js'
    import Vue from 'vue'
    import VueResource from 'vue-resource'

    particlesJS.load('form__overlay', 'particlesjs-config.json', () => console.log('Particles enabled'));

    Vue.use(VueResource);

    export default {
        props: ['title'],
        data () {
            return {
                questions: [
                    'Какое твоё имя?',
                    'Какой хочешь логин?',
                    'Какая твоя почта?',
                    'Придумай пароль'
                ],
                personalData: {
                    name: '',
                    login: '',
                    mail: '',
                    pass: ''
                },
                isActive: false,
                isMistake: false,
                isMistakeNext: false,
                widthProgress: '50%',
                step: 0,
                countStep: 4,
                response: {
                    code: null,
                    text: ''
                }
            }
        },
        methods: {
            setProgress () {
                this.widthProgress = `${this.step / this.countStep * 100}%`
            },
            checkInputName () {

                if (this.personalData.name === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }

                if(/^[a-zA-ZА-Яа-я]+$/.test(this.personalData.name) !== true || this.personalData.name === ''){
                    this.isMistake = true;
                }else{
                    this.isMistake = false;
                }

            },
            checkInputLogin () {
                if (this.personalData.login === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }

                if(/^[a-zA-Z0-9]+$/.test(this.personalData.login) !== true){
                    this.isMistake = true;
                }else{
                    this.isMistake = false;
                }
            },
            checkInputMail () {
                if (this.personalData.mail === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }

                if(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.personalData.mail) !== true){
                    this.isMistake = true;
                }else{
                    this.isMistake = false;
                }
            },
            checkInputPass () {
                if (this.personalData.pass === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }

                if(this.personalData.pass === ''){
                    this.isMistake = true;
                }else{
                    this.isMistake = false;
                }
            },
            next () {
                if(this.isMistake == false){
                    this.isMistake = false;
                    this.isActive = false;
                    this.step = this.step + 1;
                    if(this.step === this.questions.length){
                        this.register()
                    }
                    this.setProgress();
                }else{
                    this.isMistakeNext = true;
                    setTimeout( () => {
                        this.isMistakeNext = false;
                    }, 1000)
                }
            },
            register () {
                this.$http.post("http://localhost:2000/register", this.personalData, {emulateJSON: true}).then( (res) => {
                    this.response = res.data;
                    console.log(this.response);
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }
        },
        mounted () {
            this.setProgress();
        }
    }
</script>

<style lang="sass">

    .form
        background: #5f89d7
        width: 100%
        height: 100vh
        z-index: 0
        display: flex
        justify-content: center
        align-items: center
        font-family: 'Roboto', sans-serif

    #form__overlay
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 2

    .form__progress
        width: 25%
        height: 100%
        background: #4875ca
        position: absolute
        left: 0
        top: 0
        z-index: 1
        transition: width .5s

    .form-register__body
        background: #ffffff
        padding: 5px
        width: 410px
        position: relative
        z-index: 10
        -webkit-box-shadow: 0px 3px 30px 0px rgba(50, 50, 50, 0.7)
        -moz-box-shadow: 0px 3px 30px 0px rgba(50, 50, 50, 0.7)
        box-shadow: 0px 3px 30px 0px rgba(50, 50, 50, 0.7)

    .form-register__body_done
        animation: done .5s

    @keyframes done
        0%
            transform: translateY(0)
        50%
            transform: translateY(10px)
        100%
            transform: translateY(0)


    .form__container
        //padding: 25px 65px 0 0
        margin: 25px 65px 10px 10px
        position: relative

    .form__btn
        position: absolute
        right: 20px
        top: 15px
        font-size: 40px
        color: #5f89d7
        cursor: pointer

    .form__input
        outline: none
        background-color: transparent
        border: none
        width: 100%
        font-size: 20px
        font-weight: 700
        position: relative
        z-index: 2

    .form__caption
        font-size: 20px
        font-weight: 700
        display: inline-block
        transition: all .5s
        position: absolute
        top: 0
        left: 0
        z-index: 1

    .form__caption_active
        font-size: 14px
        color: #6e6e6e
        top: -20px
    
    .form__line
        height: 2px
        width: 100%
        margin-top: 3px
        background: #5f89d7

    /* Check */

    .form-register__check
        padding: 10px
        width: 50%
        margin: 0 auto

    .form-register__head
        font-weight: 400
        font-size: 20px
        margin-bottom: 15px
        text-align: center

    .form-register__name
        font-weight: 700

    .form-register__line
        display: flex
        margin-bottom: 15px
        justify-content: space-between
        align-items: center

    .form-register__col1
        font-size: 18px

    .form-register_wrong
        font-size: 18px
        color: #e36d69

    .form-register_success
        font-size: 18px
        color: #0de3b3
    
    .next_wrong
        color: #e36d69

    .line_wrong
        background: #e36d69

    .form-register__response
        padding: 15px
        font-size: 20px
        font-weight: 700
        text-align: center

    .form-register__continue
        padding: 10px 15px
        background: #5f89d7
        font-size: 20px
        font-weight: 700
        cursor: pointer
        color: #ffffff
        display: inline-block
        margin-top: 30px
        -webkit-border-radius: 7px
        -moz-border-radius: 7px
        border-radius: 7px
        &:hover
            background: #4875ca

</style>