import storage from "./storage"

const prefix = 'store__'

const get = (key, def) => storage.get(prefix + key, def)

const set = (key, value, expired = 0) => {
    if (value !== null){
        storage.set(prefix + key, value, expired)
    } else {
        storage.remove(prefix + key)
    }
    return value
}

const remove = key => {
    storage.remove(prefix + key)
    return null
}

export default {
    get,
    set,
    remove,
}
