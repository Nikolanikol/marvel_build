import { useEffect, useState, useRef, useMemo} from 'react';
import {CSSTransition, TransitionGroup}  from 'react-transition-group'
import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';
import Spinner from '../spinner/Spinner';

const setContent = (process,Component, newItemLoading)=>{
    switch(process){
        case 'waitng' :
            return <Spinner/>
        case 'loading' :
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed' :
            return <Component/>
        case 'error' :
            return <ErrorMessage/>
        default :
            throw new Error('Unexpected process')
    }
}
const CharList = (props) =>{
    const {getAllCharachters, process, setProcess} = useMarvelService();

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)

    useEffect(()=>{
        onRequest(offset, true)
    },[])
    const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharachters(offset)
            .then(onCharListLoaded)
            .then(()=>setProcess('confirmed'))
    }
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
        console.log('char list render')
        const items = charList.map((obj, i)=>{
            const {name, thumbnail, id} = obj;
            let imgStyle = {'objectFit' : 'cover'};
        if(thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit' : 'contain'};
        }
            return (
                    <CSSTransition key={i} classNames={'char'} timeout={3000}>
                        <li 
                            // onFocus={()=>this.props.charId == id}
                            ref={el => itemRefs.current[i] = el}
                            tabIndex={0}
                            key={i}
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
                    </CSSTransition>
            )       
            
        })
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    }

    const elements = useMemo(()=>{
        return setContent(process, ()=>charListRender(), newItemLoading)
    }, [process])
    return (
        <div className="char__list">
            {elements}
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