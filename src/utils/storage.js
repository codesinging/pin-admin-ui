import config from '../config/storage'

class Storage{
    constructor(prefix, driver) {
        this.prefix = prefix
        this.driver = driver
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

        return this.driver.setItem(this.prefixedKey(key), JSON.stringify(value))
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

export default new Storage(config.prefix, config.driver)
