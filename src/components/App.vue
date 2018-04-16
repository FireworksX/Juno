<template lang="pug">
    .application
        person-small(:user="profile")
        svg.paper
</template>

<script>
    import Vue from 'vue'
    import VueResourse from 'vue-resource'
    import Person_small from '../components/Person_small.vue'

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
            this.getSession()
        }
    }

</script>