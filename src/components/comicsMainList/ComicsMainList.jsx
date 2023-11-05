import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import './comicsMainList.scss'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

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
const ComicsMainList = ()=>{
    useEffect(()=>{
        onRequest(offset, true)
    }, [])
    const {getComicsList, process, setProcess} = useMarvelService()
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(218);



    const onRequest = (offset, initial) =>{

        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComicsList(offset)
            .then(onComicsListLoaded)
            .then(()=>{
                setProcess('confirmed')
            })
    }
    const onComicsListLoaded = (newComics)=>{
        setNewItemLoading(true);
        setComicsList(comics=>[...comics, ...newComics]);
        setOffset(offset=>offset+9)

        setNewItemLoading(false)
    }
    // ///////////

    const renderComicsItem = () =>{
        const elements = comicsList.map((item, i)=>{
            const {id, name, prices, thumbnail} = item;
            return (
                <div className="card-list__item" key={i}>
                    <Link to={`/comics/${item.id}`}> 
                        <img src={thumbnail} alt="#"/>
                        <div className="card-list__title">{name}</div>
                        <div className="card-list__price">{prices}</div>
                    </Link>
                </div>
            )

        })
        return(
            <div className="card-list__row">
                {elements}
            </div>
        )
    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const list = renderComicsItem()
    return(
        <>
      
            <div className="card-list">
                <div className="container">
                    {setContent(process, ()=>renderComicsItem(),newItemLoading)}
                    <div className="card-list__load-more"><button disabled={newItemLoading} onClick={()=>onRequest(offset)}>Load more</button></div>
                </div>
            </div>
            
        </>
    )
}

export default ComicsMainList;