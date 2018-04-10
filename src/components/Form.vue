<template lang="pug">
    .form
        #form__overlay
        .form__progress(:style="{ width: widthProgress }")
        .form-register
            .form-register__body
                i.ion-android-arrow-forward.form__btn(@click="next" v-if="step !== 4")
                .form__container(v-if="step !== 4")
                    .form__caption(v-bind:class="{ form__caption_active: isActive }") {{ questions[step] }}
                    input.form__input(type="text" v-model="personalData.name" v-if="step === 0" )(@input="checkInputName")
                    input.form__input(type="text" v-model="personalData.login" v-if="step === 1")(@input="checkInputLogin")
                    input.form__input(type="text" v-model="personalData.mail" v-if="step === 2")(@input="checkInputMail")
                    input.form__input(type="password" v-model="personalData.pass" v-if="step === 3")(@input="checkInputPass")
                    .form__line
                .form-register__check(v-if="step === 4")
                    h3.form-register__head Проверяем..
                    .form-register__line
                        .form-register__col1 Имя
                        .form-register__col2
                            img(src="images/tail-spin.svg" v-if="dataRequest.name === 'load'")
                            i.ion-ios-close.form-register_wrong(v-else-if="dataRequest.name === 'wrong'")
                            i.ion-ios-checkmark.form-register_success(v-else)
                    .form-register__line
                        .form-register__col1 Логин
                        .form-register__col2
                            img(src="images/tail-spin.svg" v-if="dataRequest.login === 'load'")
                            i.ion-ios-close.form-register_wrong(v-else-if="dataRequest.login === 'wrong'")
                            i.ion-ios-checkmark.form-register_success(v-else)
                    .form-register__line
                        .form-register__col1 Почта
                        .form-register__col2
                            img(src="images/tail-spin.svg" v-if="dataRequest.mail === 'load'")
                            i.ion-ios-close.form-register_wrong(v-else-if="dataRequest.mail === 'wrong'")
                            i.ion-ios-checkmark.form-register_success(v-else)
                    .form-register__line
                        .form-register__col1 Пароль
                        .form-register__col2
                            img(src="images/tail-spin.svg" v-if="dataRequest.pass === 'load'")
                            i.ion-ios-close.form-register_wrong(v-else-if="dataRequest.pass === 'wrong'")
                            i.ion-ios-checkmark.form-register_success(v-else)

</template>

<script>
    import 'particles.js'

    particlesJS.load('form__overlay', 'particlesjs-config.json', () => console.log('Particles enabled'));


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
                dataRequest: {
                    name: 'load',
                    login: 'success',
                    mail: 'wrong',
                    pass: 'success'
                },
                isActive: false,
                widthProgress: '50%',
                step: 0,
                countStep: 4
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
            },
            checkInputLogin () {
                if (this.personalData.login === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }
            },
            checkInputMail () {
                if (this.personalData.mail === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }
            },
            checkInputPass () {
                if (this.personalData.pass === '') {
                    this.isActive = false;
                } else {
                    this.isActive = true;
                }
            },
            next () {
                this.isActive = false;
                this.step = this.step + 1;
                this.setProgress();
                console.log(this.step)
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
        font-weight: 700
        font-size: 20px
        margin-bottom: 15px
        text-align: center

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

</style>