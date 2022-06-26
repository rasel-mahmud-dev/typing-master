function errorToast(message){
    if(typeof Android !== "undefined"){
        Android.toastMessage(message)
    } else {
        alert(message)
    }
}

export default errorToast