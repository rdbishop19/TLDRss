import Settings from "../../repositories/Settings"

const isAuthenticated = () => {
    return sessionStorage.getItem(Settings.token_key) !== null
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
        // console.log(res)
        if ('valid' in res && res.valid && 'token' in res){
            sessionStorage.setItem(Settings.token_key, res.token)
            sessionStorage.setItem("user", JSON.stringify(res.user))
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
        // console.log('register', res)
        if ('token' in res) {
            sessionStorage.setItem(Settings.token_key, res.token)
            sessionStorage.setItem("user", JSON.stringify(res.user))
            return true
        }
    })
}

const logout = () => {
    sessionStorage.removeItem(Settings.token_key)
    sessionStorage.removeItem("user")
}

export { isAuthenticated, login, logout, register }