<template>
    <v-container fluid width="30%">
        <v-data-table
            v-if="!isProfilesListEmpty"
            :headers="fields"
            :items="profiles"
            sort-by="Description"
            class="elevation-1"
            width="70%"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Profiles</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogProfile" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn dark fab top right color="pink" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <!-- <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Profile</v-btn
              > -->
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
                                                v-model="editedProfile.id"
                                                label="Id"
                                                disabled
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="12">
                                            <v-text-field
                                                v-model="
                                                    editedProfile.description
                                                "
                                                label="Description"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedProfile.rate"
                                                label="Rate"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <!-- <v-row>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                  </v-row> -->
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
import profileApi from '../api/profiles'
import { mapActions } from 'vuex'
import ConfirmDialog from './ConfirmDialog.vue'

export default {
    data() {
        return {
            fields: [
                { text: 'Id', value: 'id' },
                { text: 'Description', value: 'description' },
                { text: 'Rate', value: 'rate', align: 'right' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            profiles: [],
            isProfilesListEmpty: false,
            editedIndex: -1,
            editedProfile: {
                id: '',
                description: '',
                rate: 0,
            },
            defaultProfile: {
                id: '',
                description: '',
                rate: 0,
            },
            dialogProfile: false,
        }
    },
    components: {
        ConfirmDialog,
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Profile' : 'Edit Profile'
        },
    },

    watch: {
        dialogProfile(val) {
            val || this.close()
        },
    },

    methods: {
        ...mapActions(['setConfirmDialog']),

        editItem(profile) {
            this.editedProfile = Object.assign({}, profile)
            this.dialogProfile = true
        },
        deleteItem(profile) {
            this.setConfirmDialog({
                title: 'Delete a profile',
                message: `You are going to delete profile with id ${profile.id}, are you sure?`,
            })
            // await profileApi.deleteProfile(profile.id);
            // this.profiles = await profileApi.listProfiles();
        },
        async save() {
            if (this.editedProfile.id) {
                await profileApi.updateProfile(this.editedProfile)
            } else {
                await profileApi.insertProfile(this.editedProfile)
            }
            this.profiles = await profileApi.listProfiles()
            this.dialogProfile = false
            this.$forceUpdate()
        },
        close() {
            this.dialogProfile = false
            setTimeout(() => {
                this.editedProfile = Object.assign({}, this.defaultProfile)
                this.editedIndex = -1
            }, 300)
        },
        onRowSelected(profiles) {
            this.$router.push({
                name: 'profiles-edit',
                params: { profileExistent: profiles[0] },
            })
        },
    },
    async created() {
        this.profiles = await profileApi.listProfiles()
        if (this.profiles && this.profiles.length > 0) {
            this.isProfilesListEmpty = false
        }
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
