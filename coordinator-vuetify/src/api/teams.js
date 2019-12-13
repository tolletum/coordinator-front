import { coordinatorsClient } from '../utils/endpoint'

const listTeams = async () => {
    return (await coordinatorsClient.get('teams')).data
}

// const updateEmployee = async employee => {
//     return (
//         await coordinatorsClient.patch(`employees/${employee.id}`, employee)
//     ).data
// }

// const insertEmployee = async employee => {
//     return (await coordinatorsClient.post('employees', employee)).data
// }

// const deleteEmployee = async id => {
//     try {
//         return (await coordinatorsClient.delete(`employees/${id}`)).data
//     } catch (error) {
//         throw new Error(error)
//     }
// }

export default {
    listTeams,
    // updateEmployee,
    // insertEmployee,
    // deleteEmployee,
}
