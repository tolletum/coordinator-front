<template>
    <b-container fluid>
        <b-container style="width: 50%">
            <br />
            <h1>ALTA DE UN PERFIL</h1>
            <br /><br />
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="description-group"
                    label="Description:"
                    label-for="description"
                    label-size="sm"
                    label-align-sm="right"
                    label-cols-sm="2"
                >
                    <b-form-input
                        id="id"
                        v-model="profile.description"
                        required
                        placeholder="Enter description"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="rate-group"
                    label="Rate:"
                    label-for="rate"
                    label-size="sm"
                    label-align-sm="right"
                    label-cols-sm="2"
                >
                    <b-form-input
                        id="rate"
                        v-model="profile.rate"
                        required
                        placeholder="Enter the rate"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-container>
    </b-container>
</template>
<script>
import { coordinatorsClient } from '../utils'

export default {
    data() {
        return {
            profile: {
                description: '',
                rate: 0,
            },
            isUpdate: false,
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            if (!this.isUpdate) {
                coordinatorsClient.post('profiles', this.profile).then(
                    async response => {
                        await this.$router.push({ name: 'profiles-list' })
                        this.$bvToast.toast(`Inserted: ${response.data.id}`, {
                            title: `Insert profile`,
                            toaster: 'b-toaster-top-center',
                            solid: true,
                            variant: 'success',
                            autoHideDelay: 3000,
                        })
                    },
                    error => {
                        this.$bvToast.toast(`Error: ${error}`, {
                            title: `Error inserting profile`,
                            toaster: 'b-toaster-top-center',
                            solid: true,
                            variant: 'danger',
                            autoHideDelay: 3000,
                        })
                    }
                )
            } else {
                coordinatorsClient
                    .patch(`profiles/${this.profile.id}`, this.profile)
                    .then(
                        async response => {
                            await this.$router.push({ name: 'profiles-list' })
                            this.$bvToast.toast(
                                `Updated: ${response.data.id}`,
                                {
                                    title: `Update profiles`,
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: 'success',
                                    autoHideDelay: 3000,
                                }
                            )
                        },
                        error => {
                            this.$bvToast.toast(`Error: ${error}`, {
                                title: `Error updating profile`,
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: 'danger',
                                autoHideDelay: 3000,
                            })
                        }
                    )
            }
        },
        onReset(evt) {
            evt.preventDefault()
            this.profile.description = ''
            this.profile.rate = 0
        },
    },
    created() {
        if (this.$route.params.profileExistent) {
            this.profile = this.$route.params.profileExistent
            this.isUpdate = true
        }
    },
}
</script>
