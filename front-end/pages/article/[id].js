import api from "../../utils/api";
import {GET_ARTICLE, GET_ARTICLES} from "../../constans/urls";
import Error from "../../components/error";
import Meta from "../../components/layout/Meta";
import {useRouter} from "next/router";

export default function Home({article, error}) {

    const router = useRouter();

    if (error) {
        return (
            <Error title={"Faild"}/>
        )
    }

    const {attributes: {title, author, content}} = article;
    const {firstName, lastName, createdAt, job, avatar} = author.data.attributes;
    const {url} = avatar.data ? avatar.data.attributes : {url: ""};

    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
            <Meta title={title}/>
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article
                    className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full"
                                     src={api.defaults.baseURL + url}
                                     alt="Jese Leos"/>
                                <div>
                                    <a href="#" rel="author"
                                       className="text-xl font-bold text-gray-900 dark:text-white"
                                       onClick={() => router.push("/profile/" + author.data.id)}
                                    >
                                        {firstName}{" "}
                                        {lastName}
                                    </a>
                                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                                        {job}
                                    </p>
                                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                                        <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
                                            {createdAt}
                                        </time>
                                    </p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                            {title}
                        </h1>
                    </header>
                    <p className="lead">
                        {content}
                    </p>


                </article>
            </div>
        </main>


    )
}

export async function getStaticProps(context) {

    let error = false;
    let res = await api.get(GET_ARTICLE.replace("{id}", context.params.id)).then(response => response.data).then((reponse) => {
        return reponse.data
    }).catch(() => {
        error = "Error";
        return [];
    });

    return {
        props: {
            article: res,
            error: error
        },
    }
}

export async function getStaticPaths() {

    let res = await api.get(GET_ARTICLES).then(response => response.data).then((reponse) => {
        return reponse.data
    }).catch(() => {
        return [];
    });

    return {
        paths: res.map((item) => {
            return {params: {id: item.id.toString()}}
        }),
        fallback: false,
    }
}
