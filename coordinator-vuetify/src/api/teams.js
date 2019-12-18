import { coordinatorsClient } from '../utils/endpoint'

const listTeams = async () => {
    return (await coordinatorsClient.get('teams')).data
}

const updateTeam = async team => {
    return (
        await coordinatorsClient.patch(`teams/${team.id}`, team)
    ).data
}

const insertTeam = async team => {
    return (await coordinatorsClient.post('teams', team)).data
}

const deleteTeam = async id => {
    try {
        return (await coordinatorsClient.delete(`teams/${id}`)).data
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    listTeams,
    updateTeam,
    insertTeam,
    deleteTeam,
}
