import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { useApplicationStore } from '@/stores/application.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            // component: HomeView,
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/role-error',
            name: 'role-error',
            component: () => import('../views/WrongRoleView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/students',
            name: 'students',
            component: () => import('../views/StudentsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/students/new',
            name: 'student-new',
            component: () => import('../views/CreateStudentView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/students/:id',
            name: 'student',
            component: () => import('../views/StudentView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'student-details',
                    component: () => import('../views/StudentDetailsView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'courses',
                    name: 'student-courses',
                    component: () => import('../views/StudentCoursesView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/course/:id',
            name: 'course',
            component: () => import('../views/CourseView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'course-details',
                    component: () => import('../views/CourseDetailsView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'students',
                    name: 'course-students',
                    component: () => import('../views/CourseStudentsView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'delete',
                    name: 'course-delete',
                    component: () => import('../views/CourseDeleteView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/courses/new',
            name: 'course-new',
            component: () => import('../views/CreateCourceView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/courses',
            name: 'courses',
            component: () => import('../views/CoursesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignUpView.vue')
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../views/UsersView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/user/:id',
            name: 'user',
            component: () => import('../views/UserView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'details',
                    name: 'user-details',
                    component: () => import('../views/UserDetailsView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'edit',
                    name: 'user-edit',
                    component: () => import('../views/UserEditView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'delete',
                    name: 'user-delete',
                    component: () => import('../views/UserDeleteView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/adoption-request-create',
            name: 'adoption-request-create',
            component: () => import('../views/AdoptionRequestCreateView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_CITIZEN']},
        },
        {
            path: '/adoption-requests',
            name: 'adoption-requests',
            component: () => import('../views/AdoptionRequestsView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER']},
        },
        {
            path: '/adoption-request/:id',
            name: 'adoption-request',
            component: () => import('../views/AdoptionRequestView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER']},
            children: [
                {
                    path: 'adoption-request-details',
                    name: 'adoption-request-details',
                    component: () => import('../views/AdoptionRequestDetailsView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER']},
                },
                {
                    path: 'adoption-request-delete',
                    name: 'adoption-request-delete',
                    component: () => import('../views/AdoptionRequestDeleteView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN']}
                },
                {
                    path: 'adoption-request-edit',
                    name: 'adoption-request-edit',
                    component: () => import('../views/AdoptionRequestEditView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_SHELTER']}
                }
            ]
        },
        {
            path: '/pet-create',
            name: 'pet-create',
            component: () => import('../views/PetCreateView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_SHELTER']},
        },
        {
            path: '/pets',
            name: 'pets',
            component: () => import('../views/PetsView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER', 'ROLE_CITIZEN', 'ROLE_VET']},
        },
        {
            path: '/pet/:id',
            name: 'pet',
            component: () => import('../views/PetView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER', 'ROLE_CITIZEN', 'ROLE_VET']},
            children: [
                {
                    path: 'pet-details',
                    name: 'pet-details',
                    component: () => import('../views/PetDetailsView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER', 'ROLE_CITIZEN', 'ROLE_VET']},
                },
                {
                    path: 'pet-delete',
                    name: 'pet-delete',
                    component: () => import('../views/PetDeleteView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_SHELTER']},
                },
                {
                    path: 'pet-edit',
                    name: 'pet-edit',
                    component: () => import('../views/PetEditView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_ADMIN', 'ROLE_VET']},
                },
                
            ]
        },
        {
            path: '/medical-histories',
            name: 'medical-histories',
            component: () => import('../views/MedicalHistorysView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_VET']},
        },
        {
            path: '/medical-history/:id',
            name: 'medical-history',
            component: () => import('../views/MedicalHistoryView.vue'),
            meta: { requiresAuth: true, requiresRole: true, requiredRole: ['ROLE_VET']},
            children: [
                {
                    path: 'medical-history-details',
                    name: 'medical-history-details',
                    component: () => import('../views/MedicalHistoryDetailsView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: [ 'ROLE_VET']},
                },
                {
                    path: 'medical-history-delete',
                    name: 'medical-history-delete',
                    component: () => import('../views/MedicalHistoryDeleteView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: [ 'ROLE_VET']},
                },
                {
                    path: 'medical-history-edit',
                    name: 'medical-history-edit',
                    component: () => import('../views/MedicalHistoryEditView.vue'),
                    meta: { requiresAuth: true, requiresRole: true, requiredRole: [ 'ROLE_VET']},
                },
            ]
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated, getRole } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresRole = to.matched.some((record) => record.meta.requiresRole);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else if(requiresRole){
        let requiredRoles = to.meta.requiredRole || [];
        let currentRole = getRole();
        if(!requiredRoles.includes(currentRole) && requiredRoles.length > 0)
        {
            console.log('wrong role. redirecting to /');
            next('/role-error');
        }else{
            next();
        }
    }else{
        next();
    }
});

export default router;