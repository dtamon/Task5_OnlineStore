export default class AccountService {
    async loginUser(email, password) {
        const response = await fetch('/api/account/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        return response;
    }

    async registerUser(email, password, confirmPassword, firstName, lastName) {
        const response = await fetch('/api/account/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstName,
                lastName: lastName,
                roleId: 2
            })
        })
        return response;
    }
}