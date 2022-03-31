export default ElMessage

export const success = message => {
    ElMessage({
        type: 'success',
        showClose: true,
        message,
    })
}

export const error = message => {
    ElMessage({
        type: 'error',
        showClose: true,
        message,
    })
}

export const warning = message => {
    ElMessage({
        type: 'warning',
        showClose: true,
        message,
    })
}
