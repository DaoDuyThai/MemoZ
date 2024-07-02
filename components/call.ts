import AgoraRTC from "agora-rtc-sdk-ng";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";

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
    appId: process.env.AGODA_APP_ID || "851ac570e1b74e8fbd3010cdfa270f00",
    // Agora Certificate
    appCert: process.env.APP_CERTIFICATE || "7649a26344d344f495a1e2f7a3be20a8",
    // Set the channel name.
    channel: process.env.AGODA_APP_CHANNEL || "test",
    // Pass your temp token here.
    token: process.env.AGODA_APP_TOKEN || "007eJxSYNgnJHHtWrJF767Ehxvn/m+Old7eqM1RmSpz/f2bXla57UcUGCxMDROTTc0NUg2TzE1SLdKSUowNDA2SU9ISjcwN0gwMJl6tSWOIUWON6frPxMjAyMDCwMgA4jOBSWYwyQIlS1KLS5gZDI2MAQEAAP//N50inQ==",
};

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


/**
 * @author Dương Thành Luân
 * @param userId 
 * @param channel 
 */
async function joinBasicCall(userId: string, channel: string, token: string) {
    // Join an RTC channel.
    await rtc.client.join(options.appId, channel, token, userId);
    // Create a local audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localAudioTrack.setMuted(true);
    // Publish the local audio tracks to the RTC channel.
    await rtc.client.publish([rtc.localAudioTrack]);
    console.log("publish success!");
}


/**
 * @description Leave the basic call
 * @returns void
 */
async function leaveBasicCall() {
    if (rtc) {
        // Destroy the local audio track.
        rtc.localAudioTrack.close();
        // Leave the channel.
        await rtc.client.leave();
    }
}


/**
 * @description Generate token for Agora RTC
 * @param uid 
 * @param channel 
 * @param expire 
 * @returns token
 */
function generateToken(channel: string, expire: number): string {
    let token = "";
    try {
        token = RtcTokenBuilder.buildTokenWithUid(options.appId, options.appCert, channel, 1, RtcRole.PUBLISHER, expire || 840000);
        console.log(`Token: ${token}`);
    } catch (error) {
        console.error(error);
    }
    return token;
};

export { joinBasicCall, leaveBasicCall, generateToken };