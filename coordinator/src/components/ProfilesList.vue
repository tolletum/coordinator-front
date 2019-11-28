<template>
    <b-container>
        <b-container align="center">
            <br />
            <h1>LISTADO DE PERFILES</h1>
            <b-row>
                <b-col sm align="right">
                    <router-link
                        tag="button"
                        class="btn btn-primary"
                        :to="{ name: 'profiles-edit' }"
                        >Insertar</router-link
                    >
                </b-col>
            </b-row>
        </b-container>
        <br />
        <b-table
            striped
            hover
            small
            :items="profiles"
            :fields="fields"
            responsive="sm"
        ></b-table>
        <!-- <b-row class="row-header">
            <b-col sm class="col-header">Id</b-col>
            <b-col sm class="col-header">Description</b-col>
            <b-col sm class="col-header">Rate</b-col>
        </b-row>
        <b-row v-for="profile in profiles" :key="profile.id">
            <b-col sm>{{ profile.id }}</b-col>
            <b-col sm>{{ profile.description }}</b-col>
            <b-col sm>{{ profile.rate }}</b-col>
        </b-row> -->
        <b-alert show variant="warning" v-if="isProfilesListEmpty"
            >No Results</b-alert
        >
    </b-container>
</template>
<script>
import { coordinatorsClient } from '../utils'

export default {
    data() {
        return {
            profiles: [],
            isProfilesListEmpty: true,
        }
    },
    created() {
        coordinatorsClient
            .get('profiles')
            .then(response => {
                this.profiles = response.data
                if (this.profiles && this.profiles.length > 0) {
                    this.isProfilesListEmpty = false
                }
            })
            .catch(error => alert(error))

        // }
        // .then(data => {
        //     const resultArray = []
        //     for (let key in data) {
        //         resultArray.push(data[key])
        //     }
        //     this.profiles = resultArray
        //     if (this.profiles && this.profiles.length > 0) {
        //         this.isProfilesListEmpty = false
        //     }
        // })
    },
}
</script>
<style scoped>
.col-header {
    color: #1973b8;
    font-weight: bold;
    font-size: 1.15rem;
}
.row-header {
    background-color: #2dcccd;
}
.alert {
    margin-left: -15px;
    margin-right: -15px;
}
.icon-insert {
    width: 35px;
    color: #1973b8;
    cursor: pointer;
}
</style>
