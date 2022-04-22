import persist from "./persist"
import config from '../config/auth'

const token = () => persist.get('token')

const user = () => persist.get('user')

const setToken = (token = null) => persist.set('token', token, config.expire)

const freshToken = () => persist.set('token', token(), config.expire)

const setUser = (user = null) => persist.set('user', user)

const login = (token, user) => {
    setToken(token)
    setUser(user)
}

const logout = () => {
    setToken()
    setUser()
}

const check = () => {
    return new Promise((resolve, reject) => {
        if (token()!==null && user()!==null){
            freshToken()
            resolve()
        } else {
            reject()
        }
    })
}

export default {
    token,
    user,
    login,
    logout,
    check
}
