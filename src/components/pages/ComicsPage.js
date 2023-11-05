import { Helmet } from "react-helmet";


import ComicsMainList from "../comicsMainList/ComicsMainList";



const ComicsPager = ()=>{

    return(
        <>
            <Helmet>
            <meta
                name="description"
                content="Page  with list of our comics"
            />
            <title>Comics page</title>

            </Helmet>
            <ComicsMainList/>
        </>
 
    )
}
export default ComicsPager;