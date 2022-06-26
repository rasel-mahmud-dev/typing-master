function keyPressSound(isError = false, isMute) {
    if (!isMute) {
        let audio = document.getElementById(isError ? "audioError" : "audio")
        audio.play()
    }
}


export default keyPressSound