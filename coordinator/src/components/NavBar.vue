<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{ name: 'home' }" active-class="active" exact>
                <img
                    height="63"
                    width="214"
                    src="../../public/images/logo-next.png"
                />
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        :to="{ name: 'profiles-list' }"
                        active-class="active"
                        >Profiles</b-nav-item
                    >
                    <b-nav-item disabled>Teams</b-nav-item>
                    <b-nav-item disabled>Projects</b-nav-item>
                    <b-nav-item
                        :to="{ name: 'employees-list' }"
                        active-class="active"
                        >Employees</b-nav-item
                    >
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
    background-color: #072146 !important;
}
</style>
