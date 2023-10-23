import { useState, useEffect } from "react";
import { ReactFragment } from "react";
import logo from './Avengers logo.png';
import xmen from './x-men.png'
import avanger from './Avengers.png'
import './comicsPage.scss'

const ComicsPage = ()=> {
    return(
        <div>


            <div className="comics-block">
                <div className="container">
                    <div className="comics-block__row">
                        <img src={xmen} alt="#"/>
                        <div className="comics-block__text">
                            <div className="text-title">X-Men: Days of Future Past</div>
                            <p className="text-desc">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                            <p>144 pages</p>
                            <p>Language: en-us</p>
                            <p><span>9.99$</span></p>
                        </div>
                        <button>Back to all</button>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default ComicsPage;