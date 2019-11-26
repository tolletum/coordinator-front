<template>
    <div class="container">
        <div class="row">
            <h1>LISTADO DE EMPLEADOS</h1>
        </div>
        <div class="row">
            <div class="col-sm">Id</div>
            <div class="col-sm">Name</div>
            <div class="col-sm">LastName</div>
            <div class="col-sm">Chargeability</div>
            <div class="col-sm">Profile</div>
        </div>
        <div class="row" v-for="employee in employees" :key="employee.id">
            <div class="col-sm">{{ employee.id }}</div>
            <div class="col-sm">{{ employee.name }}</div>
            <div class="col-sm">{{ employee.lastName }}</div>
            <div class="col-sm">{{ employee.chargeability }}</div>
            <div class="col-sm">{{ employee.profile.description}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            employees: []
        }
    },
    methods: {
        created() {
            this.$http.get("employees")
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const resultArray = [];
                    for (let key in data) {
                        resultArray.push(data[key]);
                    }
                    this.employees = resultArray;
                });
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>