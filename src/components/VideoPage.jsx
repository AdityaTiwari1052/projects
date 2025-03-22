import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SERVER_SECRET } from "./constant";

const VideoPage = () => {
    const roomContainerRef = useRef(null);
    const { id } = useParams();

    const sanitizeRoomID = (id) => {
        return id ? id.replace(/[^a-zA-Z0-9_-]/g, "") : generateRoomID();
    };
    
    const generateRoomID = () => {
        return Math.random().toString(36).substring(2, 8);
    };

    const roomID = sanitizeRoomID(id);

    useEffect(() => {
        const appID = APP_ID;
        const serverSecret = SERVER_SECRET;

        console.log("Joining Room with APP_ID:", appID);
        console.log("Server Secret:", serverSecret);

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            roomID, 
            Date.now().toString(), 
            "Aditya"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: roomContainerRef.current,
            sharedLinks: [
                {
                    name: "Copy link",
                    url: `${window.location.protocol}//${window.location.host}/room/${encodeURIComponent(roomID)}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });
    }, [roomID]);

    return <div ref={roomContainerRef} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default VideoPage;
