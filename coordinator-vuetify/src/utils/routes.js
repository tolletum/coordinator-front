import BodyHome from '../components/BodyHome.vue'
import EmployeesList from '../components/EmployeesList.vue'
import ProfilesList from '../components/ProfilesList.vue'
import TeamsList from '../components/TeamsList.vue'
import ProjectsList from '../components/ProjectsList.vue'
import HoursQ from '../components/HoursQ.vue'

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
        path: '/projects/',
        component: ProjectsList,
        name: 'projects-list',
    },
    {
        path: '/hours-quarter/',
        component: HoursQ,
        name: 'hours-quarter',
    },
    { 
        path: '*', 
        redirect: '/' 
    },
]
