<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="390">
            <v-card>
                <v-card-title class="headline">{{
                    confirmDialog.title
                }}</v-card-title>
                <v-card-text>{{ confirmDialog.message }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false"
                        >Disagree</v-btn
                    >
                    <v-btn color="green darken-1" text @click="dialog = false"
                        >Agree</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
        }
    },
    computed: {
        ...mapState(['confirmDialog']),
    },
    watch: {
        'confirmDialog.show': function(newValue) {
            this.dialog = !!newValue
        },
    },
}
</script>
