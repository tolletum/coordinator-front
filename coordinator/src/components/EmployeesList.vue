<template>
    <b-container>
        <br />
        <b-container align="center">
            <h1>LISTADO DE EMPLEADOS</h1>
            <b-row>
                <b-col sm align="right">
                    <b-link :to="{ name: 'employees-edit' }">
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
            :items="employees"
            :fields="fields"
            responsive="sm"
            @row-selected="onRowSelected"
        >
        </b-table>
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
    methods: {
        onRowSelected(employees) {
            this.$router.push({
                name: 'employees-edit',
                params: { employeeExistent: employees[0] },
            })
        },
        insert() {
            this.$router.push({ name: 'employees-list' })
        },
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
