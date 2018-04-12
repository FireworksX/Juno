<template lang="pug">
    .form
        #form__overlay
        .form__progress(:style="{ width: progress }")
        .form-choose(v-if="choose.enabled")
            .form-choose__body
                img(src="images/logo.png").form-choose__logo
                h4.form-choose__head JUNO
                p.form-choose__desc Добро пожаловать в наш уютный уголок в пучине всемирной паутины! Мы не смогли найти вашу сессию, поэтому просим Вас Авторизироваться или Зарегистрироваться.
                .form-choose__btn(@click="changeType('auth')") Авторизация
                .form-choose__or или
                .form-choose__btn(@click="changeType('register')") Регистрация
        .form-register(v-if="register.enabled")
            .form-register__body.animated(:class="{ shake: inputs.isMistakeNext,  done: inputs.isDone}")
                i.ion-android-arrow-forward.form__btn(@click="next" v-if="register.step !== 4")
                .form__container
                    .form__caption(v-bind:class="{ form__caption_active: inputs.isActive }") {{ register.questions[inputs.step] }}
                    input.form__input(type="text" v-model="personalData.name" v-if="inputs.step === 0" )(@input="_checkInputName")
                    input.form__input(type="text" v-model="personalData.login" v-if="inputs.step === 1")(@input="_checkInputLogin")
                    input.form__input(type="text" v-model="personalData.mail" v-if="inputs.step === 2")(@input="_checkInputMail")
                    input.form__input(type="password" v-model="personalData.pass" v-if="inputs.step === 3")(@input="_checkInputPass")
                    .form__line
        .form-auth(v-if="auth.enabled")
            .form-register__body.animated(:class="{ shake: inputs.isMistakeNext,  done: inputs.isDone}")
                i.ion-android-arrow-forward.form__btn(@click="next" v-if="inputs.step !== inputs.countStep")
                .form__container
                    .form__caption(v-bind:class="{ form__caption_active: inputs.isActive }") {{ auth.questions[inputs.step] }}
                    input.form__input(type="text" v-model="personalData.login" v-if="inputs.step === 0")(@input="_checkInputLogin")
                    input.form__input(type="password" v-model="personalData.pass" v-if="inputs.step === 1")(@input="_checkInputPass")
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
        props: ['text'],
        data () {
            return {
                type: 'choose', //Types: register, auth, choose - choose auth or register
                choose: {
                    enabled: false
                },
                register: {
                    enabled: false,
                    questions: [
                        'Какое твоё имя?',
                        'Какой хочешь логин?',
                        'Какая твоя почта?',
                        'Придумай пароль'
                    ]
                },
                auth: {
                    enabled: false,
                    questions: [
                        'Логин',
                        'Пароль'
                    ]
                },
                inputs: {
                    isActive: false, //Отрабатывает при написании в input
                    isMistake: false, //Отрабатывает если есть ошибки в валидации поля
                    isMistakeNext: false, //Отрабатывает если есть ошибка при клике, навешивает классы для анимации
                    isDone: false, //Отрабатывает при клике на next[btn], true - ошибок нет
                    step: 0, //Шаг для progressbar
                    countStep: 0 //Всего шагов, устанавливается функцией formInit в зависимости от type
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
                return `${this.inputs.step / this.inputs.countStep * 100}%`;
            }
        },
        methods: {
            formInit() {
                if(this.type === 'register'){
                    this.inputs.countStep = 4;
                    this.auth.enabled = false;
                    this.register.enabled = true;
                    this.choose.enabled = false;
                }
                if(this.type === 'auth'){
                    this.inputs.countStep = 2;
                    this.register.enabled = false;
                    this.auth.enabled = true;
                    this.choose.enabled = false;
                }
                if(this.type === 'choose'){
                    this.inputs.countStep = 0;
                    this.register.enabled = false;
                    this.auth.enabled = false;
                    this.choose.enabled = true;
                }
            },
            changeType(type) {
                this.type = type;
                this.formInit()
            },
            _checkInputName () {
                console.log(this.inputs.isActive)
                if (this.personalData.name === '') {
                    this.inputs.isActive = false;
                } else {
                    this.inputs.isActive = true;
                }

                if(/^[a-zA-ZА-Яа-я]+$/.test(this.personalData.name) !== true || this.personalData.name === ''){
                    this.inputs.isMistake = true;
                }else{
                    this.inputs.isMistake = false;
                }

            },
            _checkInputLogin () {
                if (this.personalData.login === '') {
                    this.inputs.isActive = false;
                } else {
                    this.inputs.isActive = true;
                }

                if(/^[a-zA-Z0-9]+$/.test(this.personalData.login) !== true){
                    this.inputs.isMistake = true;
                }else{
                    this.inputs.isMistake = false;
                }
            },
            _checkInputMail () {
                if (this.personalData.mail === '') {
                    this.inputs.isActive = false;
                } else {
                    this.inputs.isActive = true;
                }

                if(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.personalData.mail) !== true){
                    this.inputs.isMistake = true;
                }else{
                    this.inputs.isMistake = false;
                }
            },
            _checkInputPass () {
                if (this.personalData.pass === '') {
                    this.inputs.isActive = false;
                } else {
                    this.inputs.isActive = true;
                }

                if(this.personalData.pass === ''){
                    this.inputs.isMistake = true;
                }else{
                    this.inputs.isMistake = false;
                }
            },
            next () {
                if(this.inputs.isMistake == false){
                    this.inputs.isDone = true;

                    setTimeout( () => {
                        this.inputs.isDone = false;
                    }, 1000);

                    this.inputs.isMistake = false;
                    this.inputs.isActive = false;
                    this.inputs.step = this.inputs.step + 1;
                    if(this.inputs.step === this[this.type].questions.length){
                        if(this.type == 'register'){
                            this.registration()
                        }
                        if(this.type == 'auth'){
                            this.authorization()
                        }
                    }
                }else{
                    this.inputs.isMistakeNext = true;
                    setTimeout( () => {
                        this.inputs.isMistakeNext = false;
                    }, 1000)
                }
            },
            encrypt (arg) {
                let array = SHA256(this.personalData[arg]).words;
                var code = '';
                for( let key of array){
                    code += `${String(key)}?`
                }
                return btoa(code);
            },
            registration () {
                this.personalData.pass = this.encrypt('pass');
                this.$http.post("http://localhost:2000/register", this.personalData, {emulateJSON: true}).then( (res) => {
                    this.response = res.data;
                    this.alert.type = res.data.type;
                    this.alert.text = res.data.text;
                    this.alert.enabled = true;
                    this.register.enabled = false;
                    console.log(this.personalData);
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            },
            authorization () {
                this.personalData.pass = this.encrypt('pass');
                this.$http.post("http://localhost:2000/auth", this.personalData, {emulateJSON: true}).then( (res) => {
                    this.response = res.data;
                    this.alert.type = res.data.type;
                    this.alert.text = res.data.text;
                    this.alert.enabled = true;
                    this.auth.enabled = false;
                    console.log(this.personalData);
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }
        },
        mounted() {
            this.formInit()
        }
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
        font-family: 'Montserrat', sans-serif

    #form__overlay
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 2

    .form__progress
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

    /* Choose Block */

    .form-choose__body
        width: 410px
        background: #ffffff
        padding: 20px
        position: relative
        z-index: 5
        text-align: center
        -webkit-border-radius: 7px
        -moz-border-radius: 7px
        border-radius: 7px
        overflow: hidden
        -webkit-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        -moz-box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)
        box-shadow: 0px 8px 60px 0px rgba(0, 0, 0, 0.2)

    .form-choose__head
        font-weight: 700
        font-size: 24px
        position: relative
        color: #244555
        margin: 10px 0 30px 0
        &:after
            content: ''
            width: 30px
            height: 3px
            background: #244555
            position: absolute
            left: 50%
            margin-left: -15px
            bottom: -10px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px

    .form-choose__desc
        font-weight: 400
        color: #244555
        padding: 0 15px
        margin-bottom: 30px
        line-height: 25px

    .form-choose__btn
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
        margin: 15px 0
        &:hover
            background: #88a8d3

    .form-choose__or
        font-size: 16px
        font-weight: 700
        text-transform: uppercase
        color: #244555
        position: relative
        &:before
            content: ''
            width: 40px
            height: 2px
            background: rgba(36, 69, 85, .2)
            position: absolute
            left: 50%
            margin-left: -75px
            bottom: 6px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px
        &:after
            content: ''
            width: 40px
            height: 2px
            background: rgba(36, 69, 85, .2)
            position: absolute
            right: 50%
            margin-right: -75px
            bottom: 6px
            -webkit-border-radius: 5px
            -moz-border-radius: 5px
            border-radius: 5px

</style>