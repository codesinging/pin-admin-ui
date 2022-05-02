import http from "./http";

class Model {
    _model = null

    _paths = []

    _config = {}

    constructor(model) {
        this._model = model
    }

    url(...paths) {
        this._paths = this._paths.concat(paths)
        return this
    }

    config(config = {}) {
        Object.assign(this._config, config)
        return this
    }

    label(label) {
        this._config.label = label
        return this
    }

    params(params) {
        this._config.params = params
        return this
    }

    success(message) {
        if (message === false) {
            this.showSuccess = false
        } else {
            this.successMessage = message
        }
        return this
    }

    error(message) {
        if (message === false) {
            this.showError = false
        } else {
            this.errorMessage = message
        }
        return this
    }

    catch() {
        this._config.catch = true
        return this
    }

    _url() {
        return [this._model].concat(this._paths).join('/')
    }

    get() {
        return http.get(this._url(), this._config)
    }

    post(data) {
        return http.post(this._url(), data, this._config)
    }

    put(data) {
        return http.put(this._url(), data, this._config)
    }

    delete() {
        return http.delete(this._url(), this._config)
    }

    list(params = {}) {
        this.params(params)
        return this.get()
    }

    store(data) {
        return this.post(data)
    }

    update(data) {
        return this.url(data.id).put(data)
    }

    show(id) {
        return this.url(id).get()
    }

    destroy(id) {
        return this.url(id).delete()
    }
}

export default model => new Model(model)
