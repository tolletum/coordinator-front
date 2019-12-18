import BodyHome from '../components/BodyHome.vue'
import EmployeesList from '../components/EmployeesList.vue'
import ProfilesList from '../components/ProfilesList.vue'
import TeamsList from '../components/TeamsList.vue'

export const routes = [
    { 
        path: '/', 
        component: BodyHome, 
        name: 'home' 
    },
    { 
        path: '/employees/', 
        component: EmployeesList, 
        name: 'employees-list' 
    },
    {
        path: '/profiles/',
        component: ProfilesList,
        name: 'profiles-list',
    },
    {
        path: '/teams/',
        component: TeamsList,
        name: 'teams-list',
    },
    { 
        path: '*', 
        redirect: '/' 
    },
]
