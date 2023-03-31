import {Inter} from 'next/font/google'
import {useEffect} from "react";
import {useStore, SET, REMOVE} from "../contexts/store/store";
import api from "../utils/api";
import {GET_ARTICLES} from "@/constans/urls";
import Error from "../components/error";
import {useRouter} from "next/router";
import Meta from "../components/layout/Meta";

const inter = Inter({subsets: ['latin']})

export default function Home({articles, error}) {

    const store = useStore();
    const router = useRouter();

    useEffect(() => {

        // action({
        //     type: SET,
        //     path: "items",
        //     payload: [{name: "set abolfazl"}],
        // });

        // Axios({
        //     method: "get",
        //     headers: {
        //         Authorization: "Bearer e5a3d95451fa77bb8094f3081ea5cdf7e13358c765067d4ccd5e7eea6156663a4adbab6a2bcc7fde6ba649e03e2b47c2febdedb45401f4e507dae65b5da80e0ab46bae041c6513fbebd8e552b75595736bd2ed53e5f47783bff22ba3f08a96d11b2fc72474c0d37578708b76720473a28c1385c550ba645e697159cfd0ee1c99",
        //     },
        //     url: "http://localhost:1337/api/users/1",
        // }).then((res) => {
        //     console.log(res)
        // })
    }, [])

    return (
        <div className="container mx-auto my-20">
            <h3 className="text-5xl  mb-10">Articles</h3>

            <Meta title={"Articles"}/>

            {error ? <Error title={"Error communicating with the server"}/> : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
                    {articles.map(({id, attributes: {content, image, title}}) => {
                        let url = image.data ? image.data.attributes.url : "";
                        return (
                            <div className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg" key={id}
                                 onClick={() => router.push("/article/" + id)}>
                                <img className="w-full h-56 object-cover" src={api.defaults.baseURL + url}
                                     alt="Sunset in the mountains"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">
                                        {title}
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        {content.substring(0, 200)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    )
}

export async function getStaticProps() {

    let error = false;
    let res = await api.get(GET_ARTICLES).then(response => response.data).then((reponse) => {
        return reponse.data
    }).catch(() => {
        error = "Error";
        return [];
    });

    return {
        props: {
            articles: res,
            error: error
        },
    }
}
