import Image from 'next/image'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";
import { setCookie } from 'cookies-next';

export default function Home() {
  const router = useRouter()

  const storeUser = async (e) => {
    e.preventDefault()

    const payload = {
      name: e.target.name.value
    }

    try {
      const { data: { data: res } } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`, payload)
      setCookie('accessToken', res.token)

      await router.push(`${process.env.NEXT_PUBLIC_APP_URL}/${res.userData.username}`)
    } catch(error) {
      console.error(error)
    }

  }

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className="text-center text-gray-700 text-3xl lg:text-4xl font-brand pb-10">
            Secreto Clone
          </h1>

          <form className="w-full md:w-4/12" onSubmit={storeUser}>
            <div className="mb-6 font-body">
              <input type="text"
                     id="name"
                     name="name"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 border-1 outline-none"
                     placeholder="Your display name" required
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <button type="submit"
                      className="mx-auto font-title font-semibold text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ease-linear duration-200">Submit
              </button>
            </div>
          </form>
        </main>
        <footer className={styles.footer}>
          <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
          </a>
        </footer>
      </div>
  )
}
