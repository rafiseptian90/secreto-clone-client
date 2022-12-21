import moment from "moment";
import io from "socket.io-client";
import {useEffect, useState} from "react";

export default function ChatTimeline({ user }) {
    const [chatCount, setChatCount] = useState(user.chats.length)
    const [chat, setChat] = useState(user.chats)

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

        console.log(user)

        socket.on('connect', () => {
            socket.emit(`room`, user.username)
        })

        socket.on('new-msg', (msg) => {
            chat.push(msg)
            setChat(chat)
            setChatCount(chat.length + 1)
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new-msg');
        };
    }, [chatCount])

    return (
        <>
            <div className="w-full lg:w-4/12">
                <h1 className="text-base lg:text-lg font-title text-left pb-7">
                    Timeline of <span className="font-semibold">{ user.name }</span>
                </h1>

                {
                    chat.map((msg, i) => {
                        return (
                            <>
                                <div className="w-full font-body pb-7" key={i}>
                                    <span className="block text-xs text-gray-800 mb-2">{ moment(msg.created_at).format('DD MMM YYYY HH:mm') }</span>
                                    <div className="py-3 px-5 bg-white shadow-inner rounded-md">
                                        <p className="text-base">
                                            { msg.chat }
                                        </p>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}