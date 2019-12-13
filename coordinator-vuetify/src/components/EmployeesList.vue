<template>
    <v-container fluid width="30%">
        <v-data-table
            v-if="!isEmployeesListEmpty"
            :headers="fields"
            :items="employees"
            sort-by="Description"
            class="elevation-1"
            width="70%"
        >
            <template v-slot:item.isCoordinator="{ item }">
                <v-checkbox
                    style="margin-left: 40px; text-align: center"
                    v-model="item.isCoordinator"
                    disabled
                ></v-checkbox>
            </template>
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Employees</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogEmployee" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                dark
                                fab
                                top
                                right
                                color="pink"
                                v-on="on"
                                @click="onDialogOpen"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text style="height: 470px">
                                <v-container>
                                    <v-row>
                                        <v-col lg="3">
                                            <v-text-field
                                                v-model="editedEmployee.id"
                                                label="Id"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                v-model="editedEmployee.name"
                                                label="Name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field
                                                v-model="
                                                    editedEmployee.lastName
                                                "
                                                label="Last Name"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col lg="3">
                                            <v-text-field
                                                type="number"
                                                v-model="
                                                    editedEmployee.chargeability
                                                "
                                                label="Chargeability"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col offset-lg="2">
                                            <v-checkbox
                                                v-model="
                                                    editedEmployee.isCoordinator
                                                "
                                                class="mx-2"
                                                label="Is Coordinator"
                                            ></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select
                                                :items="profiles"
                                                item-text="description"
                                                item-value="id"
                                                label="Profile"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select
                                                :items="teams"
                                                item-text="description"
                                                item-value="id"
                                                label="Team"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close"
                                    >Cancel</v-btn
                                >
                                <v-btn color="blue darken-1" text @click="save"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"
                    >mdi-pencil</v-icon
                >
                <v-icon small @click.stop="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary">Reset</v-btn>
            </template>
        </v-data-table>
        <confirm-dialog />
    </v-container>
</template>
<script>
import employeeApi from '../api/employees'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import ConfirmDialog from './ConfirmDialog.vue'

export default {
    data() {
        return {
            fields: [
                { text: 'Id', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Last Name', value: 'lastName' },
                {
                    text: 'Chargeability',
                    value: 'chargeability',
                    align: 'right',
                },
                {
                    text: 'Is Coordinator',
                    value: 'isCoordinator',
                    align: 'center',
                },
                { text: 'Profile', value: 'profile.description' },
                { text: 'Team', value: 'team.description' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            isEmployeesListEmpty: false,
            editedIndex: -1,
            editedEmployee: {
                id: '',
                name: '',
                lastName: '',
                chargeability: 0,
                isCoordinator: false,
                profile: {},
                team: {},
            },
            defaultEmployee: {
                id: '',
                name: '',
                lastName: '',
                chargeability: 0,
                isCoordinator: false,
                profile: {},
                team: {},
            },
            dialogEmployee: false,
        }
    },
    components: {
        ConfirmDialog,
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee'
        },
        ...mapState('employees', ['employees']),

        ...mapState('profiles', ['profiles']),

        ...mapState('teams', ['teams']),
    },

    watch: {
        dialogEmployee(val) {
            val || this.close()
        },
    },

    methods: {
        ...mapActions(['setConfirmDialog', 'hideConfirmDialog']),

        ...mapActions('employees', ['listEmployees']),

        ...mapActions('profiles', ['listProfiles']),

        ...mapActions('teams', ['listTeams']),

        async editItem(employee) {
            await this.onDialogOpen()
            this.editedEmployee = Object.assign({}, employee)
            this.dialogEmployee = true
        },
        deleteItem(employee) {
            this.setConfirmDialog({
                title: 'Delete a employee',
                message: `You are going to delete employee with id ${employee.id}, are you sure?`,
                accept: async () => {
                    try {
                        await employeeApi.deleteEmployee(employee.id)
                    } catch (error) {
                        this.$toast(
                            `Error deleting employee with id: ${employee.id}. ${error.message}`
                        )
                    } finally {
                        this.hideConfirmDialog()
                        await this.listEmployees()
                    }
                },
                cancel: async () => {
                    this.hideConfirmDialog()
                },
            })
        },
        async save() {
            if (this.editedEmployee.id) {
                await employeeApi.updateEmployee(this.editedEmployee)
            } else {
                await employeeApi.insertEmployee(this.editedEmployee)
            }
            await this.listEmployees()
            this.dialogEmployee = false
        },
        close() {
            this.dialogEmployee = false
            setTimeout(() => {
                this.editedEmployee = Object.assign({}, this.defaultEmployee)
                this.editedIndex = -1
            }, 300)
        },
        async onDialogOpen() {
            await this.listProfiles()
            await this.listTeams()
        },
    },
    async created() {
        await this.listEmployees()
        if (this.employees && this.employees.length > 0) {
            this.isEmployeesListEmpty = false
        }
    },
}
</script>
<style scoped>
#input-76 {
    text-align: end;
}
.v-text-field__slot {
    text-align: end;
}

.v-list-item__title {
    text-align: left;
}
</style>
