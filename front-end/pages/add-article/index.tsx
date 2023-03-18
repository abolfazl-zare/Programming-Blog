import React, {FC, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import api from "../../utils/api";
import {POST_ARTICLE} from "../../constans/urls";
import {toast} from "react-toastify";

interface initialValues {
    title: string,
    content: string
}

const Index: FC = () => {

    const handelForm = (values: initialValues) => {
        api.post(POST_ARTICLE, {data: values}).then(() => {
            toast.success("success")
        }).catch(() => {
            toast.error("error")
        })
    }

    return (
        <div className="container mx-auto my-10 px-7">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <Formik
                    initialValues={{title: '', content: '', author: "1"}}
                    onSubmit={(values, {setSubmitting}) => handelForm(values)}
                    validationSchema={Yup.object().shape({
                        title: Yup.string()
                            .min(2, 'Too Short!')
                            .max(50, 'Too Long!')
                            .required('Required'),
                        content: Yup.string()
                            .min(2, 'Too Short!')
                            .max(450, 'Too Long!')
                            .required('Required'),
                    })}
                >

                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (

                        <form onSubmit={handleSubmit}>

                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                    <h3 className="text-2xl">Add Article</h3>

                                    <div className="w-100">
                                        <label htmlFor="first-name"
                                               className="block text-sm font-medium leading-6 text-gray-900">Title</label>

                                        <input
                                            onChange={handleChange}
                                            value={values.title}
                                            type="text"
                                            name="title"
                                            className="px-3 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>


                                        {errors.title && touched.title && (
                                            <p className="mt-2  text-rose-600  text-sm text-gray-500">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="about"
                                               className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                        <div className="mt-2">
                                            <textarea id="about"
                                                      rows={3}
                                                      className="px-3 mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                                      placeholder="content"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.content} name="content"></textarea>
                                        </div>
                                        {errors.content && touched.content && (
                                            <p className="mt-2 text-rose-600 text-sm text-gray-500">{errors.content}</p>
                                        )}
                                    </div>


                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save
                                    </button>
                                </div>
                            </div>

                        </form>

                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Index;