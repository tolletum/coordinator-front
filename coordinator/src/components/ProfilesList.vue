<template>
    <b-container>
        <b-container align="center">
            <br />
            <h1>LISTADO DE PERFILES</h1>
            <b-row>
                <b-col sm align="right">
                    <b-link :to="{ name: 'profiles-edit' }">
                        <v-icon name="plus-circle" class="icon-insert"></v-icon
                    ></b-link>
                </b-col>
            </b-row>
        </b-container>
        <br />
        <b-table
            selectable
            selectMode="single"
            striped
            hover
            small
            :fields="fields"
            :items="profiles"
            responsive="sm"
            @row-selected="onRowSelected"
        ></b-table>
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
            fields: ['id', 'description', 'rate'],
            profiles: [],
            isProfilesListEmpty: true,
        }
    },
    methods: {
        onRowSelected(profiles) {
            this.$router.push({
                name: 'profiles-edit',
                params: { profileExistent: profiles[0] },
            })
        },
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
</style>
