import http from "./http";

class Api {
    paths = []

    constructor(resource=null) {
        if (resource){
            this.paths.push(resource)
        }
    }

    url(path) {
        path = path ? (Array.isArray(path) ? path : [path]) : []
        return this.paths.concat(path).join('/')
    }

    get(path, config) {
        return http.get(this.url(path), config)
    }

    post(path, data, config) {
        return http.post(this.url(path), data, config)
    }

    put(path, data, config){
        return http.put(this.url(path), data, config)
    }

    delete(path, config){
        return http.delete(this.url(path), config)
    }

    list(config){
        return this.get(null, config)
    }

    store(data, config) {
        return this.post(null, data, config)
    }

    update(data, config) {
        return this.put(data.id, data, config)
    }

    show(data, config){
        return this.get(typeof data === 'object' ? data.id : data, config)
    }

    destroy(data, config){
        return this.delete(typeof data === 'object' ? data.id : data, config)
    }
}

export default resource => new Api(resource)
