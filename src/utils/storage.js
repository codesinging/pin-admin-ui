import config from '../config/storage'

class Storage {
    constructor(prefix, driver) {
        this.prefix = prefix
        this.driver = driver || window.localStorage
    }

    prefixedKey(key) {
        return this.prefix + key
    }

    has(key) {
        return Object.keys(this.driver).includes(this.prefixedKey(key))
    }

    remove(key) {
        this.driver.removeItem(this.prefixedKey(key))
    }

    clear() {
        Object.keys(this.driver).forEach(item => {
            if (item.substring(this.prefix.length) === this.prefix) {
                this.driver.removeItem(item)
            }
        })
    }

    set(key, value, expire = 0) {
        value = {
            value,
            expire: expire === 0 ? 0 : (new Date().getTime() + expire)
        }

        this.driver.setItem(this.prefixedKey(key), JSON.stringify(value))
        return value.value
    }

    get(key, def = null) {
        if (!this.has(key)) {
            return def
        }

        const item = this.driver.getItem(this.prefixedKey(key))

        if (!!item) {
            let value = JSON.parse(item)
            if (value.expire === 0 || value.expire >= new Date().getTime()) {
                return value.value
            }
        }

        this.remove(key)

        return def
    }
}

class UseStorage {
    constructor(key) {
        this.key = key
        this.storage = new Storage(config.prefix, config.driver)
    }

    set(value, expire = 0){
        this.storage.set(this.key, value, expire)
        return value
    }

    get(def){
        return this.storage.get(this.key, def)
    }

    remove(){
        this.storage.remove(this.key)
    }
}

export const useStorage = (key) => {
    return new UseStorage(key)
}

export default new Storage(config.prefix, config.driver)
