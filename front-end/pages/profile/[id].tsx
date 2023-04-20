import React, {FC} from 'react';
import api from "../../utils/api";
import useSWR from 'swr'
import {GET_USER} from "../../constans/urls";
import Loading from "../../components/loading";
import {useRouter} from "next/router";
import Articles from "./views/articles";
import Meta from "../../components/layout/Meta";

const Profile : FC = () => {

    const router = useRouter();
    const {id} : {id? : string} = router.query;

    const {data, error} = useSWR<any, Error>(GET_USER.replace("{id}", id), api);

    if (error) return <div>failed to load</div>
    if (!data) return <Loading className="w-100 py-40 flex justify-center"/>


    const {firstName, lastName, avatar, email, job} = data.data;

    return (
        <div className="bg-gray-100 antialiased py-40">

            <Meta title={"Profile"} keywords={"none2"}/>

            <div className="container mx-auto ">
                <div>

                    <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                        <div className="flex justify-center">
                            <img src={`${api.defaults.baseURL}${avatar && avatar.url}`} alt=""
                                 className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                        </div>

                        <div className="mt-16">
                            <h1 className="font-bold text-center text-3xl text-gray-900">{firstName} {lastName}</h1>
                            <p className="text-center text-sm text-gray-400 font-medium">{job}</p>
                            <p>
                        <span>

                        </span>
                            </p>
                            <div className="my-5 px-6">
                                <a
                                    className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"><span
                                    className="font-bold">{email}</span></a>
                            </div>
                            <div className="flex justify-between items-center my-5 px-6">
                                <a href=""
                                   className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
                                <a href=""
                                   className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
                                <a href=""
                                   className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
                                <a href=""
                                   className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>
                            </div>

                            <Articles {...{id}}/>
                        </div>
                        <div className="p-4 pt-2 text-right">
                            <button type="submit"
                                    onClick={() => router.push("/add-article")}
                                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                Add article
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;