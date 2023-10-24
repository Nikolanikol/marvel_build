import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import './comicsMainList.scss'
import logo from './Avengers logo.png';
import uw from './UW.png'
import avanger from './Avengers.png'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const ComicsMainList = ()=>{
    useEffect(()=>{
        getComicsList()
            .then(res=>setComicsList(comicsList=>[...comicsList, ...res]))
            .then(console.log(comicsList))
    }, [])
    const {getComicsList, loading, error,} = useMarvelService()
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(218);

 
    const OnLoadComics = (newComicsList)=>{
        setOffset(offset=>offset+8)
        console.log(offset)
        getComicsList(offset)
        .then(res=>setComicsList(comicsList=>[...comicsList, ...res]))

    }
    const renderComicsItem = () =>{
        const elements = comicsList.map((item, i)=>{
            const {id, name, prices, thumbnail} = item;
            return (
                <div className="card-list__item" key={item.id}>
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

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const list = renderComicsItem()
    return(
        <>
      
            <div className="card-list">
                <div className="container">
                    {errorMessage}
                    {spinner}
                    {list}

                    <div className="card-list__load-more"><button onClick={()=>OnLoadComics()}>Load more</button></div>
                </div>
            </div>
            
        </>
    )
}

export default ComicsMainList;