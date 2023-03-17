import Head from "next/head";

function Meta({description, keywords, title}) {
    return (
        <Head>
            <meta name="description" content={description}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="keywords" content={keywords}/>
            <title>{title}</title>
        </Head>
    );
}

Meta.defaultProps =
    {
        description: "the programmin blog",
        keywords: "none",
        title: "programmin-blog"
    };


export default Meta;