import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import SingleCharacterLayout from "./singleCharLayout/SingleCharLayout";

import SingleComponent from "./singleComponent/SingleComponent";
import { Helmet } from "react-helmet";



const MainPage = (props) =>{
    const [selectedChar, setChar] = useState(null)
    const [showChar, setShowChar] = useState(false)
    const onCharSelected = (id)=>{
        setChar(id)
    }

    return(
        <>

            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>

            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <CharList 
                    onCharSelected={onCharSelected}
                    charId={selectedChar}
                    setShowChar={setShowChar}
                    />
                <CharInfo charId={selectedChar}/>
   
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default MainPage;