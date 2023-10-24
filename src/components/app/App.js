import { useState } from "react";

// import { Routes } from "react-router";
// import { Router } from "react-router";
// import { Route } from "react-router";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPager, Page404, SingleComicPage} from "../pages";


const App = ()=> {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/comics' element={<ComicsPager/>}/>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
         </BrowserRouter>
    )

} 
export default App;