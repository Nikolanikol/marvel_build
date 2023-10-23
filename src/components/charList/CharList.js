import { useEffect, useState, useRef } from 'react';
import useMarvelService from '../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
const CharList = (props) =>{
    const {loading, error, getAllCharachters} = useMarvelService();
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)

    useEffect(()=>{
        onRequest(offset, true)
    },[])
    const onCharListLoaded = (newChar)=>{
        setCharList(char=>[...char, ...newChar]);
        setNewItemLoading(false);
        setOffset(offset=>offset+9)
    }
    const itemRefs = useRef([]);

    const focusOnItem = (i, id)=>{
        itemRefs.current.forEach(item=>item.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
        itemRefs.current[i].focus();
        props.onCharSelected(id)
    }


    const charListRender = (props) =>{
        const items = charList.map((obj, i)=>{
            const {name, thumbnail, id} = obj;
            let imgStyle = {'objectFit' : 'cover'};
        if(thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit' : 'contain'};
        }
            return (
                <li 
                    // onFocus={()=>this.props.charId == id}
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    key = {id}
                    className= 'char__item'
                    onClick={()=>focusOnItem(i, id)}
                    onKeyPress = {(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(id);
                        }
                    }
                    }
                >
                <img 
                    style={imgStyle}
                    src={thumbnail} 
                    alt={name}
                />
                <div className="char__name">{name}</div>
            </li>
            )
            
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }
     const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharachters(offset)
            .then(onCharListLoaded)
    }

    const element = charListRender()
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {element}
            <button 
                onClick={()=>onRequest(offset)}
                disabled = {newItemLoading}
                className="button button__main button__long"
            >
                <div className="inner"
                >load more</div>
            </button>
        </div>
    )

    
} 

export default CharList;