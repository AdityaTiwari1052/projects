import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { App_ID, SERVER_SECRET } =constant;

const VideoPage = () => {
    const sanitizeRoomID = (id) => {
        return id ? id.replace(/[^a-zA-Z0-9_-]/g, "") : generateRoomID();
    };
    
    const generateRoomID = () => {
        return Math.random().toString(36).substring(2, 8);
    };

    const { id } = useParams();
    const roomID = sanitizeRoomID(id);

    let myMeeting = async (element) => {
        const appID = App_ID;
        const serverSecret = SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            roomID, 
            Date.now().toString(), 
            "Aditya"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
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
    };

    return <div ref={myMeeting}></div>;
};

export default VideoPage;
