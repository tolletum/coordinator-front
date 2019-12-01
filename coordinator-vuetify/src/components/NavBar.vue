<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="{ name: 'home' }">
        <v-img
          alt="Next Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          height="63"
          width="214"
          src="../../public/images/logo-next.png"
        />
      </router-link>
    </div>
    <v-btn text :to="{ name: 'profiles-list' }">
      <span>Profiles</span>
    </v-btn>
    <v-btn text disabled>
      <span class="mr-2">Teams</span>
    </v-btn>
    <v-btn text disabled>
      <span class="mr-2">Projects</span>
    </v-btn>
    <v-btn text :to="{ name: 'employees-list' }">
      <span class="mr-2">Employees</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
