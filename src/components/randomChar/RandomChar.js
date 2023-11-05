import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './randomChar.scss';
import useMarvelService from '../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent';

const RandomChar = (props)=>{
    const [char, setChar] = useState({});

    const {process, setProcess, getCharachter, clearError} = useMarvelService();
    useEffect(()=>{
        clearError()
        updateChar()
    }, [])

    const updateChar = () =>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharachter(id)
                .then(onCharLoaded)
                .then(()=>setProcess('confirmed'))
    }

    const onCharLoaded = (char)=>{
        setChar(char);
    }
   
    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    onClick={updateChar}
                    className="button button__main"
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

    
} 

const View = ({data}) =>{
    const {thumbnail, name, description,homepage, wiki} = data;
    let descStr = description ? description : 'not found'
    if (descStr.length > 150){
        descStr = descStr.slice(0, 150) + '...'
    }
    let imgStyle = null;
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
                    <img 
                        style={imgStyle}
                        src={thumbnail} 
                        alt="Random character" 
                        className="randomchar__img"
                    />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                         {descStr}
                        </p>
                        <div className="randomchar__btns">
                            <Link to={`./charachter/${name}`} className="button button__main">
                                <div className="inner">homepage</div>
                            </Link>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}
export default RandomChar;
