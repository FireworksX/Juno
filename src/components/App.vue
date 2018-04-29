<template lang="pug">
    .application
        vignette
        person-small(:user="profile")
        ul.application-container
            svg.paper
            li.application-container__item(v-for="(node, index) in nodes" v-bind:style="node.styles" v-on:click="selectLesson(index)" v-bind:class="{node_unlock: node.progress.enabled}")
                |{{ node.name | capitalize }}
</template>

<script>
    import Vue from 'vue'
    import VueResourse from 'vue-resource'
    import Person_small from '../components/Person_small.vue'
    import Vignette from '../components/vignette.vue'
    import DrawPaths from '../model/DrawPaths'


    Vue.use(VueResourse);

    Vue.component('person-small', Person_small);
    Vue.component('vignette', Vignette);



    export default {
        data () {
            return {
                profile: {},
                nodes: [],
                enabled: true
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        },
        methods: {
            getSession () {
                this.$http.post("http://localhost:2000/profileAuto").then( (res) => {
                    this.profile = res.data;
                    console.log(res)
                    this.getNodes();
                }, (err) => {
                    console.log(err);
                });
            },
            getNodes () {
                this.$http.post("http://localhost:2000/getNodes").then( (res) => {
                    this.nodes = res.data.object;
                    console.log(res.data);
                    this.pushPersonalData();
                    new DrawPaths('.paper', this.nodes).render();
                }, (err) => {
                    console.log(err);
                });
            },
            selectLesson (id) {
                if(this.nodes[id].progress.enabled === true){
                    this.$router.push(`/lessons/${id}`);
                }
            },
            pushPersonalData() {
                /*
                    Проходим по всем нодам которые есть у пользователя в сессии ->
                    внутри этого цикла запускаем ещё один цикл, который проходит по всем доступным нодам ->
                    если ID ноды пользователя (которая находится в сессии) равна итерации ->
                    в ноду с индексом итерации добавляем объект из сесии. (По умолчанию: progress: false из базы)
                 */
                let i = 0;
                for( let key of this.profile.progress.nodes ){
                    let j = 0;
                    for( let node of this.nodes ){
                        if(key.id === j){
                            this.nodes[key.id].progress = key;
                        }
                        j++
                    }
                    i++;
                }
            }
        },
        mounted() {
            this.getSession();
        }
    }

</script>

<style lang="sass">

    .application
        font-family: 'Montserrat', sans-serif

    .paper
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        circle
            cursor: pointer
        text
            fill: #fff
            font-size: 16px
            font-weight: 700

    .application-container
        width: 100%
        height: 100%
        position: relative
        transform-origin: center center 0
        transition: all 0.2s ease 0s
        -webkit-transform-origin: center center 0
        -webkit-transition: all 0.2s ease 0s

    .application-container__item
        width: 80px
        height: 80px
        background: #34495e
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        position: absolute
        left: 100px
        top: 190px
        display: flex
        justify-content: center
        align-items: center
        color: #fff

    .node_unlock
        transition: .3s
        cursor: pointer
        &:hover
            transform: scale(1.2)
            background: #465c71


</style>