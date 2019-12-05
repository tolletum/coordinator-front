<template>
  <b-container fluid>
    <br />
    <h1>ALTA DE UN EMPLEADO</h1>
    <br /><br />
    <b-container style="width: 50%;">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="id-group"
          label="Id:"
          label-for="id"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-input
            id="id"
            v-model="employee.id"
            required
            placeholder="Enter Id"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="name-group"
          label="Name:"
          label-for="name"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-input
            id="id"
            v-model="employee.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="last-name-group"
          label="Last Name:"
          label-for="last-name"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-input
            id="last-name"
            v-model="employee.lastName"
            required
            placeholder="Enter the last name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="chargeability-group"
          label="Chargeability:"
          label-for="chargeability"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-input
            id="chargeability"
            v-model="employee.chargeability"
            required
            placeholder="Enter the chargeability"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="is-coordinator-group"
          label="Is Coordinator:"
          label-for="is-coordinator"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-checkbox
            id="is-coordinator"
            v-model="employee.isCoordinator"
            name="isCoordinator"
            class="text-left mt-1"
          >
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          id="profile-group"
          label="Profile:"
          label-for="profile"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-select
            v-model="employee.profile.id"
            :options="profileOptions"
            size="sm"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="team-group"
          label="Team:"
          label-for="team"
          label-size="sm"
          label-align-sm="right"
          label-cols-sm="2"
        >
          <b-form-select
            v-model="employee.team.id"
            :options="teamOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </b-container>
</template>
<script>
import { coordinatorsClient } from "../utils/endpoint";

export default {
  data() {
    return {
      employee: {
        name: "",
        lastName: "",
        chargeability: 0,
        isCoordinator: false,
        profile: {
          id: "1"
        },
        team: {
          id: "1"
        }
      },
      isUpdate: false,
      profileOptions: [],
      teamOptions: [],
      profiles: [],
      teams: []
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.isUpdate) {
        // this.employee.profile = { id: this.profileSelected }
        // this.employee.team = { id: this.teamSelected }
        coordinatorsClient.post("employees", this.employee).then(
          async response => {
            await this.$router.push({ name: "employees-list" });
            this.$bvToast.toast(`Inserted: ${response.data.id}`, {
              title: `Insert employee`,
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "success",
              autoHideDelay: 3000
            });
          },
          error => {
            this.$bvToast.toast(`Error: ${error}`, {
              title: `Error inserting employee`,
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "danger",
              autoHideDelay: 3000
            });
          }
        );
      } else {
        alert(this.employee.profile.id);
        let profileSelected = this.profiles.filter(
          profile => profile.id === this.employee.profile.id
        );
        alert(JSON.stringify(profileSelected));
        let teamSelected = this.teams.filter(
          team => team.id === this.employee.team.id
        );
        this.employee.profile = profileSelected[0];
        this.employee.team = teamSelected[0];

        coordinatorsClient
          .patch(`employees/${this.employee.id}`, this.employee)
          .then(
            async response => {
              await this.$router.push({ name: "employees-list" });
              this.$bvToast.toast(`Updated: ${response.data.id}`, {
                title: `Update employees`,
                toaster: "b-toaster-top-center",
                solid: true,
                variant: "success",
                autoHideDelay: 3000
              });
            },
            error => {
              this.$bvToast.toast(`Error: ${error}`, {
                title: `Error updating employee`,
                toaster: "b-toaster-top-center",
                solid: true,
                variant: "danger",
                autoHideDelay: 3000
              });
            }
          );
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.employee.name = "";
      this.employee.lastName = "";
      this.employee.chargeability = 0;
      this.employee.isCoordinator = false;
      this.employee.profile = {};
      this.employee.team = {};
    }
  },
  async created() {
    await coordinatorsClient.get("profiles").then(response => {
      this.profiles = response.data;
      this.profileOptions = this.profiles.map(profile => ({
        value: profile.id,
        text: profile.description
      }));
    });

    await coordinatorsClient.get("teams").then(response => {
      this.teams = response.data;
      this.teamOptions = this.teams.map(team => ({
        value: team.id,
        text: team.description
      }));
    });

    if (this.$route.params.employeeExistent) {
      this.employee = this.$route.params.employeeExistent;
      this.isUpdate = true;
    }
  }
};
</script>
