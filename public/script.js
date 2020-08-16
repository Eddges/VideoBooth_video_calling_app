const socket = io('/')
const peer = new Peer(undefined, {
    host : '/',
    port : '3001'
})

const videoDiv = document.querySelector('#Videos')
console.log(videoDiv)
const myVideo = document.createElement('video')
// videoDiv.appendCh    ild(myVideo)
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true
})
.then(stream => {
    addVideoStream(myVideo, stream)

    socket.on('userConnected', userId => {
        connectToNewUser(userId, stream)
    })

    peer.on('call', call => {
        call.answer(stream)
        const newVideo = document.createElement('video')
        call.on('stream', streamVideo => {
            addVideoStream(newVideo, streamVideo)
        })
    })
})

peer.on('open', id => {
    socket.emit('joinRoom', ROOM_ID, id)
})



const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const userVideo = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(userVideo, userVideoStream)
    })
    call.on('close', () => {
        userVideo.remove()
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoDiv.append(video)
}