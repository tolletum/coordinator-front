<template>
    <b-container>
        <br />
        <b-container align="center">
            <h1>LISTADO DE EMPLEADOS</h1>
            <b-row>
                <b-col sm align="right">
                    <v-icon name="plus-circle" class="icon-insert"></v-icon>
                </b-col>
            </b-row>
        </b-container>

        <br />
        <b-table
            striped
            hover
            small
            :items="employees"
            :fields="fields"
            responsive="sm"
        >
        </b-table>
        <!-- <b-row class="row-header">
            <b-col sm class="col-header">Id</b-col>
            <b-col sm class="col-header">Name</b-col>
            <b-col sm class="col-header">LastName</b-col>
            <b-col sm class="col-header">Chargeability</b-col>
            <b-col sm class="col-header">Profile</b-col>
        </b-row>
        <b-row v-for="employee in employees" :key="employee.id">
            <b-col sm>{{ employee.id }}</b-col>
            <b-col sm>{{ employee.name }}</b-col>
            <b-col sm>{{ employee.lastName }}</b-col>
            <b-col sm>{{ employee.chargeability }}</b-col>
            <b-col sm>{{ employee.profile.description }}</b-col>
        </b-row> -->
        <b-alert show variant="warning" v-if="isEmployeesListEmpty"
            >No Results</b-alert
        >
    </b-container>
</template>
<script>
import { coordinatorsClient } from '../utils/'

export default {
    data() {
        return {
            fields: [
                'id',
                'name',
                'lastName',
                'chargeability',
                'isCoordinator',
                { key: 'profile.description', label: 'Profile Description' },
                { key: 'team.description', label: 'Team Description' },
            ],
            employees: [],
            isEmployeesListEmpty: true,
        }
    },
    created() {
        coordinatorsClient
            .get('employees')
            .then(response => {
                this.employees = response.data
                if (this.employees && this.employees.length > 0) {
                    this.isEmployeesListEmpty = false
                }
            })
            .catch(error => alert(error))
        // {
        //     const resultArray = []
        //     for (let key in data) {
        //         resultArray.push(data[key])
        //     }
        //     this.employees = resultArray
        //     if (this.employees && this.employees.length > 0) {
        //         this.isEmployeesListEmpty = false
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
