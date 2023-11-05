import { createContext, useState } from "react";
import { useFormik } from "formik";

import { Helmet } from "react-helmet";
import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import AppHeader from "../appHeader/AppHeader";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../charSearch/CharSearch";
import SingleCharacterLayout from "../pages/singleCharLayout/SingleCharLayout";

// import { MainPage, ComicsPager, SingleComicPage} from "../pages";

const Page404 = lazy(()=>import('../pages/404'))
const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPager = lazy(()=>import('../pages/ComicsPage'))
const SingleComicPage = lazy(()=>import('../pages/SingleComicsPage'))



const App = ()=> {

    return (

        <BrowserRouter>
          
            
            <div className="app">
                <AppHeader/>
                <AppBanner/>
                <main>
                    <Suspense fallback={<span>Loading...</span>} >
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPager/>}/>
                            <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path="/charachter/:charName" element={<SingleCharacterLayout />}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div> 
         </BrowserRouter>
    )
 
} 
export default App;