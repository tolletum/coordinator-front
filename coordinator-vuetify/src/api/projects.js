import { coordinatorsClient } from '../utils/endpoint'

const listProjects = async () => {
    return (await coordinatorsClient.get('projects')).data
}

const updateProject = async project => {
    return (
        await coordinatorsClient.patch(`projects/${project.id}`, project)
    ).data
}

const insertProject = async project => {
    return (await coordinatorsClient.post('projects', project)).data
}

const deleteProject = async id => {
    try {
        return (await coordinatorsClient.delete(`projects/${id}`)).data
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    listProjects,
    updateProject,
    insertProject,
    deleteProject,
}
