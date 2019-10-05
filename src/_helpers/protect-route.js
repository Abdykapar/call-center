export default {
    checkOperator(next) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_OPERATOR') || user.roles.includes('ROLE_SUPER_ADMIN')) {
            next()
        } else {
            next('/login')
        }
    },
    checkReport(next) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_SUPER_ADMIN')) {
            next()
        } else {
            next('/login')
        }
    },
}