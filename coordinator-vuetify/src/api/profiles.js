import { coordinatorsClient } from '../utils/endpoint'

const listProfiles = async () => {
    return (await coordinatorsClient.get('profiles')).data
}

const updateProfile = async profile => {
    return (await coordinatorsClient.patch(`profiles/${profile.id}`, profile))
        .data
}

const insertProfile = async profile => {
    return (await coordinatorsClient.post('profiles', profile)).data
}

const deleteProfile = async id => {
    try {
        return (await coordinatorsClient.delete(`profiles/${id}`)).data
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    listProfiles,
    updateProfile,
    insertProfile,
    deleteProfile,
}
