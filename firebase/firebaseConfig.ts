import firebase from "firebase/app";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvtL5qXTDxVl_Bp44QsINK1kF9edx3jPo",
  authDomain: "memoz-383e9.firebaseapp.com",
  databaseURL: "https://memoz-383e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memoz-383e9",
  storageBucket: "memoz-383e9.appspot.com",
  messagingSenderId: "613411706109",
  appId: "1:613411706109:web:cedd6e3bdb6468e68bda94",
  measurementId: "G-5B3T4ZBWJJ"
};

const app = firebase.initializeApp(firebaseConfig);


const db = app.database();


const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

let peerConnection  = new RTCPeerConnection(servers);
let localStream     = null;
let remoteStream    = null;


function call() {
    
}

