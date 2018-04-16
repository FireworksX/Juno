<template lang="pug">
    .application
        person-small(:user="profile")
        svg.paper
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
                profile: {}
            }
        },
        methods: {
            getSession () {
                this.$http.post("http://localhost:2000/getSessionAuto").then( (res) => {
                    this.profile = res.data
                    console.log(this.profile)
                }, (err) => {
                    console.log(err);
                });
            }
        },
        mounted() {
            this.getSession();
            new Nodes('.paper')
        }
    }

</script>

<style lang="sass">

    .paper
        width: 1920px
        height: 1080px
        position: absolute
        left: 0
        top: 0

</style>