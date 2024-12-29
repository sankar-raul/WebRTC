const vid = document.getElementById("vid")
const capture = document.getElementById("capture")
const capturedImg = document.getElementById("capturedImg")
const stopRecording = document.getElementById('stop')
let stream = null
vid.disabled = false
async function startRecording() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio: true
    })
    record(stream)
    vid.srcObject = stream
    vid.onloadedmetadata = () => {
        vid.play()
    }
} catch (error) {
    console.log(error)
}
}
startRecording()
let mediaRecorder = null
const record = (streamContent) => {
    mediaRecorder = new MediaRecorder(streamContent)
    mediaRecorder.start()
    const recordedChunks = []
    mediaRecorder.ondataavailable = (event) => {
        recordedChunks.push(event.data)
    }
    mediaRecorder.addEventListener('stop', () => {
        createUrl(recordedChunks)
    })
}
const createUrl = (recordedChunks) => {
    const blob = new Blob(recordedChunks)
    const url = URL.createObjectURL(blob)
    const newVid = document.createElement("video")
    const link = document.createElement('a')
    link.href = url
    link.innerHTML = "Download"
    link.download = "ok.mp4"
    newVid.src = url
    newVid.controls = true
    newVid.loop = true

    newVid.download = 'ok.mp4'
    document.body.appendChild(newVid)
    newVid.play()
    newVid.onloadeddata = () => {
        document.body.appendChild(link)
    }
    console.log(url)
}
stopRecording.addEventListener('click', () => {
    mediaRecorder.stop()
})
capture.addEventListener("click", () => {
    // stream.
    mediaRecorder.start()
    console.log("Clicked")
})