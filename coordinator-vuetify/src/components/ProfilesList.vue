<template>
  <v-container fluid width="30%">
    <v-data-table
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
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Profile</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedProfile.id"
                        label="Id"
                        disabled
                      ></v-text-field> </v-col
                    ><br />
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedProfile.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedProfile.rate"
                        label="Rate"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { coordinatorsClient } from "../utils";

export default {
  data() {
    return {
      fields: [
        { text: "Id", value: "id" },
        { text: "Description", value: "description" },
        { text: "Rate", value: "rate", align: "right" },
        { text: "Actions", value: "action", sortable: false }
      ],
      profiles: [],
      isProfilesListEmpty: true,
      editedIndex: -1,
      editedProfile: {
        id: "",
        description: "",
        rate: 0
      },
      defaultProfile: {
        id: "",
        description: "",
        rate: 0
      },
      dialog: false
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Profile" : "Edit Profile";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(profile) {
      this.editedProfile = Object.assign({}, profile);
      this.dialog = true;
    },
    deleteItem(profile) {
      alert(
        `Se modifica el profile con id: ${profile.id}-${profile.description}`
      );
    },
    save() {
      alert(`Se guarda el elemento`);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedProfile = Object.assign({}, this.defaultProfile);
        this.editedIndex = -1;
      }, 300);
    },
    onRowSelected(profiles) {
      this.$router.push({
        name: "profiles-edit",
        params: { profileExistent: profiles[0] }
      });
    }
  },
  created() {
    coordinatorsClient
      .get("profiles")
      .then(response => {
        this.profiles = response.data;
        if (this.profiles && this.profiles.length > 0) {
          this.isProfilesListEmpty = false;
        }
      })
      .catch(error => alert(error));
  }
};
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
