import Settings from "../../repositories/Settings"

const isAuthenticated = () => {
    return sessionStorage.getItem(Settings.token) !== null
}

const login = credentials => {
    return fetch(`${Settings.remoteURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(res => {
        if ('valid' in res && res.valid && 'token' in res){
            sessionStorage.setItem(Settings.token, res.token)
            return true
        }
    })
}

const register = userInfo => {
    return fetch(`${Settings.remoteURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(res => {
        console.log('register', res)
        if ('token' in res) {
            sessionStorage.setItem(Settings.token, res.token)
            return true
        }
    })
}

const logout = () => {
    sessionStorage.removeItem(Settings.token)
}

export { isAuthenticated, login, logout, register }