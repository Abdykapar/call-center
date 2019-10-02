export default {
    checkOperator(next) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_OPERATOR')) {
            next()
        } else {
            next('/login')
        }
    },
}