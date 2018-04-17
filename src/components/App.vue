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
    import Nodes from '../model/Nodes'

    Vue.use(VueResourse);

    Vue.component('person-small', Person_small);




    export default {
        data () {
            return {
                profile: {},
                nodes: [
                    {
                        id: 0,
                        name: 'HTML',
                        parent: 0,
                        enabled: true,
                        position: {
                            cx: 850,
                            cy: 125,
                            cr: 40
                        },
                        styles: {
                            background: '#34495e',
                            left: '850px',
                            top: '125px',
                            width: '80px',
                            height: '80px'
                        },
                        path: '/lessons/0'
                    },
                    {
                        id: 1,
                        name: 'CSS',
                        parent: 0,
                        enabled: false,
                        position: {
                            cx: 625,
                            cy: 140,
                            cr: 40
                        },
                        styles: {
                            background: '#34495e',
                            left: '625px',
                            top: '140px',
                            width: '80px',
                            height: '80px'
                        },
                        path: '/lessons/1'
                    },
                    {
                        id: 2,
                        name: 'JS',
                        parent: 0,
                        enabled: true,
                        position: {
                            cx: 1220,
                            cy: 150,
                            cr: 40
                        },
                        styles: {
                            background: '#34495e',
                            left: '1220px',
                            top: '150px',
                            width: '80px',
                            height: '80px'
                        },
                        path: '/lessons/2'
                    },
                ]
            }
        },
        methods: {
            getSession () {
                this.$http.post("http://localhost:2000/getSessionAuto").then( (res) => {
                    this.profile = res.data;
                    console.log(this.profile)
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
            new Nodes('.paper', this.nodes);
            console.log(this)
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