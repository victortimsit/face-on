const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const createRoom = async () => {
  const peerConnection = await new RTCPeerConnection(configuration);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  const roomWithOffer = {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  };

  const answer = new RTCSessionDescription(roomWithOffer.offer);
  await peerConnection.setRemoteDescription(answer);

  console.log("ROOM", roomWithOffer);
  console.log("ANWSER", answer);

  return { offer: roomWithOffer.offer };
};

const joinRoom = async ({ offer }) => {
  const peerConnection = new RTCPeerConnection(configuration);
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      const json = event.candidate.toJSON();
      console.log("JSON ROOM", json);
      const candidate = new RTCIceCandidate(json);
      peerConnection.addIceCandidate(candidate);
    }
  });
};

const chat = async () => {
  const room = await createRoom();
  joinRoom(room);
};

export default createRoom;