import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect} from "react";
import Axios from "axios";
import {toast} from "react-toastify";

const inter = Inter({subsets: ['latin']})

export default function Home() {


    useEffect(() => {

        // Axios({
        //     method: "get",
        //     headers: {
        //         Authorization: "Bearer e5a3d95451fa77bb8094f3081ea5cdf7e13358c765067d4ccd5e7eea6156663a4adbab6a2bcc7fde6ba649e03e2b47c2febdedb45401f4e507dae65b5da80e0ab46bae041c6513fbebd8e552b75595736bd2ed53e5f47783bff22ba3f08a96d11b2fc72474c0d37578708b76720473a28c1385c550ba645e697159cfd0ee1c99",
        //     },
        //     url: "http://localhost:1337/api/users/1",
        // }).then((res) => {
        //     console.log(res)
        // })

        // toast.success('🦄 Wow so easy!', {
        //     position: "bottom-left",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
    }, [])

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.description}>
                    <p>
                        Get started by editing&nbsp;
                        <code className={styles.code}>pages/index.js</code>
                    </p>
                    <div>
                        <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            By{' '}
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                className={styles.vercelLogo}
                                width={100}
                                height={24}
                                priority
                            />
                        </a>
                    </div>
                </div>

                <div className={styles.center}>
                    <Image
                        className={styles.logo}
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                    <div className={styles.thirteen}>
                        <Image
                            src="/thirteen.svg"
                            alt="13"
                            width={40}
                            height={31}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.grid}>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Docs <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Find in-depth information about Next.js features and&nbsp;API.
                        </p>
                    </a>

                    <a
                        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Learn <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Learn about Next.js in an interactive course with&nbsp;quizzes!
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Templates <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Discover and deploy boilerplate example Next.js&nbsp;projects.
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Deploy <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Instantly deploy your Next.js site to a shareable URL
                            with&nbsp;Vercel.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}
