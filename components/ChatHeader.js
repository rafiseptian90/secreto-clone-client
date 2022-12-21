import { Clipboard } from 'react-feather';
import {useRef} from "react";
import axios from "axios";

export default function ChatHeader({ user, isOwner }) {
    const link = useRef(null)

    async function copyLink() {
        link.current.select()
        link.current.setSelectionRange(0, 99999)

        await navigator.clipboard.writeText(link.current.value)
    }

    async function storeChat(e) {
        e.preventDefault()

        const payload = {
            chat: e.target.message.value
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/chat/${user.username}`, payload
        )

        if (res.status === 200)
            e.target.message.value = ''
    }

    return (
        <>
            <h1 className="text-center text-gray-700 text-3xl lg:text-4xl font-brand pb-10">
                Secreto Clone
            </h1>

            <div className="w-full md:w-8/12 lg:w-4/12 mb-6">
                {/* If the visitor is an owner of this chat room */}
                { isOwner && (
                        <>
                            <span className="block text-grey-500 text-center mb-3">
                                Copy this link and share to your stories
                            </span>
                            <div className="flex justify-between items-center">
                                <div className="w-10/12">
                                    <input type="text" id="link"
                                           ref={link}
                                           className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-body text-sm rounded-lg block w-full p-2.5 border-1 outline-none"
                                           readOnly={true}
                                           value={`${process.env.NEXT_PUBLIC_APP_URL}/${user.username}`}
                                    />
                                </div>
                                <div className="w-2/12 pl-4">
                                    <div onClick={() => copyLink()} className="py-2 flex justify-center items-center bg-teal-700 rounded-lg cursor-pointer hover:bg-teal-800 ease-linear duration-200">
                                        <Clipboard color="white" strokeWidth={1.5} size={25} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

                {/* If the visitor isn't an owner of this chat room */}
                { !isOwner && (
                        <>
                            <div className="w-full font-body">
                                <form onSubmit={storeChat}>
                                    <textarea className="w-full py-2 px-3 outline-none" name="message" id="message" rows="7" placeholder={"Write your secret message to " + user.name} />
                                    <button type="submit" className="w-full mt-3 py-1.5 px-3 bg-teal-600 hover:bg-teal-800 text-white rounded-md ease-linear duration-200">
                                        Send a Message
                                    </button>
                                </form>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}