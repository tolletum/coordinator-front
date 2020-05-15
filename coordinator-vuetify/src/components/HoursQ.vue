<template>
    <v-container fluid width="30%">
        <v-data-table
            v-if="!isHoursQListEmpty"
            :headers="headers"
            :items="hoursq"
            sort-by="Description"
            class="elevation-1"
            width="70%"
        >
            <template v-slot:top>
                <v-row dense>
                    <v-col cols="1">
                        <v-text-field
                            v-model="year"
                            label="Year"
                            style="padding-left: 20px;"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-select
                            :items="quarters"
                            label="Quarter"
                            v-model="quarterSelected"
                            style="padding-left: 20px;"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                            :items="teams"
                            item-text="description"
                            label="Team"
                            v-model="teamSelected"
                            style="padding-left: 20px;"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Hours By Quarter</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogTeam" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn dark fab top right color="pink" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text style="height: 300px">
                                <v-container>
                                    <v-row>
                                        <v-col md="12">
                                            <v-text-field
                                                v-model="editedTeam.id"
                                                label="Id"
                                                disabled
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="12">
                                            <v-text-field
                                                v-model="editedTeam.description"
                                                label="Description"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="12">
                                            <v-text-field
                                                v-model="editedTeam.area"
                                                label="Area"
                                            ></v-text-field>
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
import teamApi from '../api/teams'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import ConfirmDialog from './ConfirmDialog.vue'
import { QUARTERS_MONTHS } from '../constants'

export default {
    data() {
        return {
            hoursq: [
                {
                    employee: 'Homer Simpson',
                    JANUARY: 123,
                    FEBRUARY: 167,
                    MARS: 210,
                },
                {
                    employee: 'Maggi Simpson',
                    JANUARY: 156,
                    FEBRUARY: 90,
                    MARS: 23,
                },
            ],
            quarters: Object.keys(QUARTERS_MONTHS),
            quarterSelected: 'Q1',
            teamSelected: '',
            year: new Date().getFullYear(),
            isHoursQListEmpty: false,
            editedIndex: -1,
            editedTeam: {
                id: '',
                description: '',
                area: '',
            },
            defaultTeam: {
                id: '',
                description: '',
                area: '',
            },
            dialogTeam: false,
        }
    },
    components: {
        ConfirmDialog,
    },
    computed: {
        headers() {
            const headers = [
                { text: 'Employee', value: 'employee', width: '60px' },
            ]
            Object.keys(
                QUARTERS_MONTHS[
                    Object.keys(QUARTERS_MONTHS).find(
                        q => q === this.quarterSelected
                    )
                ]
            ).forEach(element => {
                headers.push({
                    text: element,
                    value: `${element}`,
                    width: '30px',
                })
            })
            return headers
        },
        formTitle() {
            return this.editedIndex === -1 ? 'New Team' : 'Edit Team'
        },
        ...mapState('teams', ['teams']),
    },

    watch: {
        dialogTeam(val) {
            val || this.close()
        },
    },

    methods: {
        ...mapActions(['setConfirmDialog', 'hideConfirmDialog']),

        ...mapActions('teams', ['listTeams']),

        editItem(team) {
            this.editedTeam = Object.assign({}, team)
            this.dialogTeam = true
        },
        deleteItem(team) {
            this.setConfirmDialog({
                title: 'Delete a team',
                message: `You are going to delete team with id ${team.id}, are you sure?`,
                accept: async () => {
                    try {
                        await teamApi.deleteTeam(team.id)
                    } catch (error) {
                        this.$toast(
                            `Error deleting team with id: ${team.id}. ${error.message}`
                        )
                    } finally {
                        this.hideConfirmDialog()
                        await this.listTeams()
                    }
                },
                cancel: async () => {
                    this.hideConfirmDialog()
                },
            })
        },
        async save() {
            if (this.editedTeam.id) {
                await teamApi.updateTeam(this.editedTeam)
            } else {
                await teamApi.insertTeam(this.editedTeam)
            }
            await this.listTeams()
            this.dialogTeam = false
        },
        close() {
            this.dialogTeam = false
            setTimeout(() => {
                this.editedTeam = Object.assign({}, this.defaultTeam)
                this.editedIndex = -1
            }, 300)
        },
    },
    async created() {
        this.isHoursQListEmpty = false
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
