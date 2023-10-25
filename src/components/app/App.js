import { useState } from "react";

// import { Routes } from "react-router";
// import { Router } from "react-router";
// import { Route } from "react-router";
import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

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
                <main>
                    <Suspense fallback={<span>Loading...</span>} >
                            <Routes>
                                <Route path='/comics' element={<ComicsPager/>}/>
                                <Route path='/' element={<MainPage/>}/>
                                <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                    </Suspense>
                </main>
            </div>
         </BrowserRouter>
    )
 
} 
export default App;