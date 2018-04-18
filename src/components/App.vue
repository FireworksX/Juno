<template lang="pug">
    .application
        person-small(:user="profile")
        ul.application-container
            svg.paper
            li.application-container__item(v-for="node in nodes" v-bind:style="node.styles" v-on:click="selectLesson(node.id)")
                |{{ node.name }}
</template>

<script>
    import Vue from 'vue'
    import VueResourse from 'vue-resource'
    import Person_small from '../components/Person_small.vue'
    import DrawPaths from '../model/DrawPaths'


    Vue.use(VueResourse);

    Vue.component('person-small', Person_small);



    export default {
        data () {
            return {
                profile: {},
                nodes: []
            }
        },
        methods: {
            getSession () {
                this.$http.post("http://localhost:2000/getSessionAuto").then( (res) => {
                    this.profile = res.data;
                }, (err) => {
                    console.log(err);
                });
            },
            getNodes () {
                this.$http.post("http://localhost:2000/getNodes").then( (res) => {
                    this.nodes = res.data.object;
                    new DrawPaths('.paper', this.nodes).render();
                }, (err) => {
                    console.log(err);
                });
            },
            selectLesson (id) {
                this.$router.push(`/lessons/${id}`);
            }
        },
        mounted() {
            this.getSession();
            this.getNodes();
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
        transition: .3s
        cursor: pointer
        &:hover
            transform: scale(1.2)
            background: #465c71


</style>