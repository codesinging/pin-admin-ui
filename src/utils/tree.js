const tree = (items, parentId = "0", parentKey = 'pid') => items
    .filter(item => item[parentKey] === parentId)
    .map(item => ({
        ...item,
        children: tree(items, item.id, parentKey)
    }))

export const listToTree = tree

const _treeNode = (item, key, value) => {
    if (item[key]===value){
        return item
    } else if (item.children){
        for (let i = 0; i < item.children.length; i++) {
            let node = _treeNode(item.children[i], key, value)
            if (node!==null){
                return node
            }
        }
    }
    return null
}

export const treeNode = (arr = [], key, value) => {
    for (let i = 0; i < arr.length; i++) {
        let node = _treeNode(arr[i], key, value)
        if (node!==null){
            return node
        }
    }
    return null
}

const _treePath = (item, key, value) => {
    if (item[key] === value) {
        return []
    } else if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
            let result = _treePath(item.children[i], key, value)
            if (result !== null) {
                result.unshift(item.children[i])
                return result
            }
        }
    }
    return null
}

export const treePath = (arr = [], key, value) => {
    for (let i = 0; i < arr.length; i++) {
        let result = _treePath(arr[i], key, value)
        if (result !== null) {
            result.unshift(arr[i])
            return result
        }
    }
    return []
}
