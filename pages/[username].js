import styles from '../styles/Home.module.css'
import ChatHeader from "../components/ChatHeader";
import ChatTimeline from "../components/ChatTimeline";
import axios from 'axios';

export default function Main({ user, isOwner }) {
    return (
        <>
            {
                user &&
                <div className={styles.container}>
                    <main className={styles.main}>
                        <ChatHeader user={user} isOwner={isOwner}/>
                        <ChatTimeline user={user} />
                    </main>
                </div>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { username } = context.query

    try {
        const { data: { data: res } } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/${username}`, {
            headers: {
                Authorization: 'Bearer ' + context.req.cookies['accessToken']
            }
        })

        return {
            props: {
                user: res.user,
                isOwner: res.is_owner
            }
        }
    } catch(error) {
        console.error(error)

        return {
            props: {
                data: null
            }
        }
    }
}