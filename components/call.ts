import AgoraRTC from "agora-rtc-sdk-ng";

interface RTC {
    client: any;
    localAudioTrack: any;
}

const rtc: RTC = {
    client: null,
    localAudioTrack: null
};

const options = {
    // Pass your App ID here.
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID || "851ac570e1b74e8fbd3010cdfa270f00",
    // Set the channel name.
    channel: process.env.NEXT_PUBLIC_AGORA_CHANNEL || "voice",
    // Pass your temp token here.
    token: process.env.NEXT_PUBLIC_AGORA_TOKEN || "007eJxTYPhZ3s6xliNgX6Rmm0CJABvHdKvfqdECSt3r9Rv2lZi5vldgsDA1TEw2NTdINUwyN0m1SEtKMTYwNEhOSUs0MjdIMzDYb1qV1hDIyLDNSoOZkQECQXxWhrL8zORUBgYAbCccfQ",
};
async function listenToCall() {

    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
    rtc.client.on("user-published", async (user: any, mediaType: any) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
            console.log("audio track remote");
            
            // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
            const remoteAudioTrack = user.audioTrack;
            // Play the remote audio track.
            remoteAudioTrack.play();
        }
    });
    // Listen for the "user-unpublished" event
    rtc.client.on("user-unpublished", async (user: any) => {
        // Unsubscribe from the tracks of the remote user.
        await rtc.client.unsubscribe(user);
    });
}


async function joinBasicCall(userId: string) {
    // Join an RTC channel.
    await rtc.client.join(options.appId, options.channel, options.token, userId);
    // Create a local audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Publish the local audio tracks to the RTC channel.
    await rtc.client.publish([rtc.localAudioTrack]);

    console.log("publish success!");
}

async function leaveBasicCall() {
    // Destroy the local audio track.
    rtc.localAudioTrack.close();

    // Leave the channel.
    await rtc.client.leave();
}

export { listenToCall, joinBasicCall, leaveBasicCall };