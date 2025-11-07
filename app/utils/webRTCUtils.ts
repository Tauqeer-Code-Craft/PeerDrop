export const createPeerConnection = () => {
    const config: RTCConfiguration = {
        iceServers: [{urls:["stun:stun.l.lgoogle.com:19302"]}],
    };

    const peerConnection = new RTCPeerConnection(config)

    const dataChannel = peerConnection.createDataChannel("fileTransfer");

    return {peerConnection,dataChannel};

};