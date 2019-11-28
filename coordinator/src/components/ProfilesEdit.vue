<template>
    <b-container>
        <br />
        <h1>ALTA DE UN PERFIL</h1>
        <br /><br />
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                id="description-group"
                label="Description:"
                label-for="description"
            >
                <b-form-input
                    id="id"
                    v-model="profile.description"
                    required
                    placeholder="Enter description"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="rate-group" label="Rate:" label-for="rate">
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
</template>
<script>
import { coordinatorsClient } from '../utils'
// import axios from 'axios'

export default {
    data() {
        return {
            profile: {
                description: '',
                rate: 0,
            },
            show: true,
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            coordinatorsClient.post('profiles', this.profile).then(
                async response => {
                    await this.$router.push({ name: 'profiles-list' })
                    this.$bvToast.toast(`Alta ok: ${response.data.id}`, {
                        title: `Alta perfiles`,
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: 'success',
                        autoHideDelay: 3000,
                    })
                },
                error => {
                    this.$bvToast.toast(`Error: ${error}`, {
                        title: `Error alta perfiles`,
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: 'danger',
                        autoHideDelay: 3000,
                    })
                }
            )
        },
        onReset(evt) {
            evt.preventDefault()
            this.profile.description = ''
            this.profile.rate = 0
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
    },
}
</script>
