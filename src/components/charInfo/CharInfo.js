import './charInfo.scss';
import setContent from '../../utils/setContent';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import CharSearch from '../charSearch/CharSearch';
import useMarvelService from '../services/MarvelService';
import { Link } from 'react-router-dom';

const  CharInfo = (props)=> {
    const [char, setChar] = useState(null);


    const { getCharachter, process, setProcess} = useMarvelService();
    useEffect(()=>{
        updateChar();
    },[props.charId])

    const updateChar = () =>{
        if(!props.charId){
            return;
        }
        getCharachter(props.charId)
            .then(onCharLoaded)
            .then(()=>setProcess('confirmed'))
    }
    const onCharLoaded = (char)=>{
        setChar(char)
    }

  
    return (
        <div className="char__info">
            {setContent(process,View, char)}
        </div>
    )

    
}

const View = ({data}) =>{
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let imgStyle = {'objectFit' : 'cover'}
    if(thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'contain'};
    }
    return(
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={"/charachter/:charName"} href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

            {comics.length > 0 ? null : <ErrorMessage/>}

                {
                    comics.map((item,i)=>{
                        if(i<10){
                            return(
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    
                    })
                }
            </ul>
            <CharSearch />

        </>
    )
}
export default CharInfo;