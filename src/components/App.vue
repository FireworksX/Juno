<template lang="pug">
    .application
        preloader(:unLoaded="isPreloader")
        //vignette
        person-small(:user="profile")
        svg.paper
</template>

<script>
    import Vue from 'vue'
    import VueResourse from 'vue-resource'
    import Person_small from '../components/Person_small.vue'
    import Vignette from '../components/vignette.vue'
    import DrawNodes from '../model/DrawNodes'
    import Person_level from '../components/Person_level.vue'
    import Preloader from '../components/Preloader.vue'


    Vue.use(VueResourse);

    Vue.component('person-small', Person_small);
    Vue.component('vignette', Vignette);
    Vue.component('person-level', Person_level);
    Vue.component('preloader', Preloader);

    export default {
        data () {
            return {
                isPreloader: true,
                profile: {},
                nodes: [],
                enabled: true,
                paperOfNodes: {}
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
                    console.log(res);
                    this.getNodes();
                }, (err) => {
                    console.log(err);
                });
            },
            getNodes () {
                this.$http.post("http://localhost:2000/getNodes").then( (res) => {
                    this.nodes = res.data.object;
                    this.pushPersonalData();
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

                /*
                    render() - рисуем ноды и пути к ним
                    light(enable) - включает [true] и выключает свет [false]
                */
                this.paperOfNodes = new DrawNodes('.paper', this.nodes, this.$router).render().light(true);

                /*
                    Принимает 3 аргумента: 1- DOM svg элемент где будет происходить отрисовка
                    2- Массив с нодами которые нужно отрисовать
                    3- Router от экземпляра Vue для переходи между страницами SPA
                 */
                this.isPreloader = false;


            }
        },
        mounted() {
            this.getSession();
        }
    }

</script>

<style lang="sass">

    text
        text-transform: uppercase

    body
        overflow: hidden

    .application
        font-family: 'Montserrat', sans-serif
        background: #1E202D

    .paper
        width: 100%
        height: 100%
        position: relative
        left: 0
        top: 0


</style>