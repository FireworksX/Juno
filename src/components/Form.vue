<template lang="pug">
    .form
        #form__overlay
        .form__progress(:style="{ width: progress }")
        .form-register(v-if="registration.enabled")
            .form-register__body.animated(:class="{ shake: registration.isMistakeNext,  done: registration.isDone}")
                i.ion-android-arrow-forward.form__btn(@click="next" v-if="registration.step !== 4")
                .form__container(v-if="registration.step !== registration.countStep")
                    .form__caption(v-bind:class="{ form__caption_active: registration.isActive }") {{ registration.questions[registration.step] }}
                    input.form__input(type="text" v-model="personalData.name" v-if="registration.step === 0" )(@input="_checkInputName")
                    input.form__input(type="text" v-model="personalData.login" v-if="registration.step === 1")(@input="_checkInputLogin")
                    input.form__input(type="text" v-model="personalData.mail" v-if="registration.step === 2")(@input="_checkInputMail")
                    input.form__input(type="password" v-model="personalData.pass" v-if="registration.step === 3")(@input="_checkInputPass")
                    .form__line
        .form-auth(v-if="auth.enabled")
            .form-register__body.animated(:class="{ shake: auth.isMistakeNext,  done: auth.isDone}")
                i.ion-android-arrow-forward.form__btn(@click="next" v-if="auth.step !== auth.countStep")
                .form__container(v-if="auth.step !== auth.countStep")
                    .form__caption(v-bind:class="{ form__caption_active: auth.isActive }") {{ auth.questions[auth.step] }}
                    input.form__input(type="text" v-model="personalData.login" v-if="auth.step === 1")(@input="_checkInputLogin")
                    input.form__input(type="password" v-model="personalData.pass" v-if="auth.step === 3")(@input="_checkInputPass")
                    .form__line
        .form-alert(v-if="alert.enabled")
            .form-alert__body
                .form-alert__overlay(:style="{ background: alert[alert.type].color }")
                img(:src="alert[alert.type].image").form-alert__img
                .form-alert__container
                    img(src="images/wave.png").form-alert__wave
                    .form-alert__head {{ alert[alert.type].head }}
                    p.form-alert__desc {{ alert.text }}
                    .form-alert__btn {{ alert[alert.type].btnText }}


</template>

<script>
    import 'particles.js'
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import SHA256 from 'crypto-js/sha256'

    particlesJS.load('form__overlay', 'particlesjs-config.json', () => console.log('Particles enabled'));

    Vue.use(VueResource);

    export default {
        props: ['title'],
        data () {
            return {
                registration: {
                    enabled: false,
                    questions: [
                        'Какое твоё имя?',
                        'Какой хочешь логин?',
                        'Какая твоя почта?',
                        'Придумай пароль'
                    ],
                    isActive: false,
                    isMistake: false,
                    isMistakeNext: false,
                    isDone: false,
                    step: 0,
                    countStep: 4,
                },
                auth: {
                    enabled: true,
                    questions: [
                        'Логин',
                        'Пароль'
                    ],
                    isActive: false,
                    isMistake: false,
                    isMistakeNext: false,
                    isDone: false,
                    step: 0,
                    countStep: 2,
                },
                personalData: {
                    name: '',
                    login: '',
                    mail: '',
                    pass: ''
                },
                widthProgress: '0%',
                response: {
                    type: '',
                    code: null,
                    text: ''
                },
                alert: {
                    enabled: false,
                    type: 'success',
                    text: '',
                    failed: {
                        head: 'Упс! Ошибочка...',
                        color: '#f89da8',
                        image: 'images/failed.png',
                        btnText: 'Попробовать снова'
                    },
                    success: {
                        head: 'Замечательно!',
                        color: '#82eac5',
                        image: 'images/success.png',
                        btnText: 'Продолжить'
                    }
                }
            }
        },
        computed: {
            progress () {
                return `${this.registration.step / this.registration.countStep * 100}%`;
            },
        },
        methods: {
            _checkInputName () {

                if (this.personalData.name === '') {
                    this.registration.isActive = false;
                } else {
                    this.registration.isActive = true;
                }

                if(/^[a-zA-ZА-Яа-я]+$/.test(this.personalData.name) !== true || this.personalData.name === ''){
                    this.registration.isMistake = true;
                }else{
                    this.registration.isMistake = false;
                }

            },
            _checkInputLogin () {
                if (this.personalData.login === '') {
                    this.registration.isActive = false;
                } else {
                    this.registration.isActive = true;
                }

                if(/^[a-zA-Z0-9]+$/.test(this.personalData.login) !== true){
                    this.registration.isMistake = true;
                }else{
                    this.registration.isMistake = false;
                }
            },
            _checkInputMail () {
                if (this.personalData.mail === '') {
                    this.registration.isActive = false;
                } else {
                    this.registration.isActive = true;
                }

                if(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.personalData.mail) !== true){
                    this.registration.isMistake = true;
                }else{
                    this.registration.isMistake = false;
                }
            },
            _checkInputPass () {
                if (this.personalData.pass === '') {
                    this.registration.isActive = false;
                } else {
                    this.registration.isActive = true;
                }

                if(this.personalData.pass === ''){
                    this.registration.isMistake = true;
                }else{
                    this.registration.isMistake = false;
                }
            },
            next () {
                if(this.registration.isMistake == false){
                    this.registration.isDone = true;

                    setTimeout( () => {
                        this.registration.isDone = false;
                    }, 1000);

                    this.registration.isMistake = false;
                    this.registration.isActive = false;
                    this.registration.step = this.registration.step + 1;
                    if(this.registration.step === this.registration.questions.length){
                        this.register()
                    }
                }else{
                    this.registration.isMistakeNext = true;
                    setTimeout( () => {
                        this.registration.isMistakeNext = false;
                    }, 1000)
                }
            },
            encpypt (arg) {
                let array = SHA256(this.personalData[arg]).words;
                var code = '';
                for( let key of array){
                    code += `${String(key)}?`
                }
                return btoa(code);
            },
            register () {
                this.personalData.pass = this.encpypt('pass');
                this.$http.post("http://localhost:2000/register", this.personalData, {emulateJSON: true}).then( (res) => {
                    this.response = res.data;
                    this.alert.type = res.data.type;
                    this.alert.text = res.data.text;
                    this.alert.enabled = true;
                    this.registration.enabled = false;
                    console.log(this.personalData);
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }
        },
    }
</script>

<style lang="sass">

    .form
        background: #e4f0ff
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
        background: #d6e2f1
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
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px

    .done
        animation: done .2s

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


    .form-register__title
        padding: 15px
        font-size: 20px
        font-weight: 700
        text-align: center

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
        background: #f89da8
        z-index: 4

    .form-alert__container
        padding: 15px 20px 20px 20px
        background: #fff
        position: relative
        z-index: 6
        text-align: center
        font-family: 'Montserrat', sans-serif

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