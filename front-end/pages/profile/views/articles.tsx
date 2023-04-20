import React ,{FC}  from 'react';
import useSWR from "swr";
import {GET_USER_ARTICLES} from "../../../constans/urls";
import api from "../../../utils/api";
import Loading from "../../../components/loading";
import {useRouter} from "next/router";

interface IProps {
    id? : string
}

const Articles:FC<IProps> = (props) => {

    const router = useRouter();
    const {id} = props;
    const {data, error} = useSWR<any, Error>(GET_USER_ARTICLES.replace("{id}", id), api);


    if (error) return <div>failed to load</div>
    if (!data) return <Loading className="w-100 py-40 flex justify-center"/>

    const articles : JSX.Element[] = data.data.data.map((article, key) => {
        const {image, title} = article.attributes;

        return (
            <a key={key}
               className="cursor-pointer w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150"
               onClick={() => router.push("/article/" + article.id)}
            >
                {image.data && (
                    <img src={`${api.defaults.baseURL}${image.data.attributes.url}`} alt=""
                         className="rounded-full h-6 shadow-md inline-block mr-2"/>
                )}
                {title}
            </a>
        )
    });

    return (
        <div className="w-full">
            <h3 className="font-medium text-gray-900 text-left px-6">Articles</h3>
            <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                {articles}
            </div>
        </div>
    );
}

export default Articles;