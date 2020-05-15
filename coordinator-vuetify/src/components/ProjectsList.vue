<template>
    <v-container fluid width="30%">
        <v-data-table
            v-if="!isProjectsListEmpty"
            :headers="headers"
            :items="projects"
            sort-by="Description"
            class="elevation-1"
            width="70%"
            :search="searchByTeam"
        >
            <template v-slot:top>
                <v-select
                    :items="teams"
                    item-text="description"
                    label="Search By Team"
                    v-model="searchByTeam"
                    style="width: 10%; padding-top: 23px;padding-left: 20px"
                ></v-select>

                <v-toolbar flat color="white">
                    <v-toolbar-title>Projects</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogProject" max-width="700px">
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
                            <v-card-text style="height: 490px">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="editedProject.id"
                                                label="Id"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                v-model="editedProject.name"
                                                label="Name"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                v-model="
                                                    editedProject.description
                                                "
                                                label="Description"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col lg="3">
                                            <v-text-field
                                                type="number"
                                                v-model="editedProject.budget"
                                                label="Budget"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select
                                                :items="teams"
                                                item-text="description"
                                                return-object
                                                label="Team"
                                                v-model="editedProject.team"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="editedProject.client"
                                                label="Client"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="editedProject.manager"
                                                label="Manager"
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
import projectApi from '../api/projects'
import { mapActions, mapState } from 'vuex'
import ConfirmDialog from './ConfirmDialog.vue'

export default {
    data() {
        return {
            searchByTeam: '',
            isProjectsListEmpty: false,
            editedIndex: -1,
            editedProject: {
                id: '',
                name: '',
                description: '',
                budget: 0,
                team: {},
                client: '',
                manager: '',
            },
            defaultProject: {
                id: '',
                name: '',
                description: '',
                budget: 0,
                team: {},
                client: '',
                manager: '',
            },
            dialogProject: false,
        }
    },
    components: {
        ConfirmDialog,
    },
    computed: {
        headers() {
            return [
                { text: 'Id', value: 'id' },
                {
                    text: 'Team',
                    value: 'team.description',
                },
                { text: 'Client', value: 'client' },
                { text: 'Manager', value: 'manager' },
                {
                    text: 'Budget',
                    value: 'budget',
                    align: 'right',
                },
                { text: 'Actions', value: 'action', sortable: false },
            ]
        },
        formTitle() {
            return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
        },
        ...mapState('projects', ['projects']),

        ...mapState('teams', ['teams']),
    },

    watch: {
        dialogProject(val) {
            val || this.close()
        },
    },

    methods: {
        ...mapActions(['setConfirmDialog', 'hideConfirmDialog']),

        ...mapActions('projects', ['listProjects']),

        ...mapActions('teams', ['listTeams']),

        async editItem(project) {
            await this.onDialogOpen()
            this.editedIndex = this.projects.indexOf(project)
            this.editedProject = Object.assign({}, project)
            this.dialogProject = true
        },
        deleteItem(project) {
            this.setConfirmDialog({
                title: 'Delete a project',
                message: `You are going to delete project with id ${project.id}, are you sure?`,
                accept: async () => {
                    try {
                        await projectApi.deleteEmployee(project.id)
                    } catch (error) {
                        this.$toast(
                            `Error deleting project with id: ${project.id}. ${error.message}`
                        )
                    } finally {
                        this.hideConfirmDialog()
                        await this.listProjects()
                    }
                },
                cancel: async () => {
                    this.hideConfirmDialog()
                },
            })
        },
        async save() {
            if (this.editedIndex !== -1) {
                try {
                    await projectApi.updateProject(this.editedProject)
                } catch (error) {
                    this.$toast(
                        `Error updating project with id: ${this.editedProject.id}. ${error.message}`
                    )
                }
            } else {
                try {
                    await projectApi.insertProject(this.editedProject)
                } catch (error) {
                    this.$toast(
                        `Error updating project with id: ${this.editedProject.id}. ${error.message}`
                    )
                }
            }
            await this.listProjects()
            this.dialogProject = false
        },
        close() {
            this.dialogProject = false
            setTimeout(() => {
                this.editedProject = Object.assign({}, this.defaultProject)
                this.editedIndex = -1
            }, 300)
        },
        async onDialogOpen() {
            await this.listTeams()
        },
    },
    async created() {
        await this.listProjects()
        if (this.projects && this.projects.length > 0) {
            this.isProjectsListEmpty = false
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
