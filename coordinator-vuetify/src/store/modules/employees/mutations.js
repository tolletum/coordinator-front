export const mutations = {
    SET_EMPLOYEES: (state, employees) => {
        state.employees = employees
        state.selectedEmployee = -1
    },
}
export default mutations
