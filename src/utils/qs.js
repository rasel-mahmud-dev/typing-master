function qs(search) {
    let q = search.replace("#", "")
    let s = q.split("&")
    let params = {}
    s.forEach(item => {
        let keyValArr = item.split("=")
        if (keyValArr.length > 0) {
            params[keyValArr[0]] = keyValArr[1] ? keyValArr[1] : null
        }
    })
    return params
}
export  default qs