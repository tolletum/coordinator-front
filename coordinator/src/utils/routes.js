import BodyHome from '../components/BodyHome.vue'
import EmployeesList from '../components/EmployeesList.vue'
import ProfilesList from '../components/ProfilesList.vue'
import ProfilesEdit from '../components/ProfilesEdit.vue'
import EmployeesEdit from '../components/EmployeesEdit.vue'

export const routes = [
    { path: '/', component: BodyHome, name: 'home' },
    { path: '/employees/', component: EmployeesList, name: 'employees-list' },
    {
        path: '/employees/edit',
        component: EmployeesEdit,
        name: 'employees-edit',
    },
    {
        path: '/profiles/',
        component: ProfilesList,
        name: 'profiles-list',
    },
    {
        path: '/profiles/edit/',
        component: ProfilesEdit,
        name: 'profiles-edit',
    },
]
