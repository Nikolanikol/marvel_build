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
import { MainPage, ComicsPager } from "../pages";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsPage from "../comicsPage/ComicsPage";
import ComicsMainList from "../comicsMainList/ComicsMainList";


const App = ()=> {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/comics' element={<ComicsPager/>}/>
                        <Route path='/' element={<MainPage/>}/>
                    </Routes>
                </main>
            </div>
         </BrowserRouter>
    )

} 
export default App;