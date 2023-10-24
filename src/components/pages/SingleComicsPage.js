import { useParams, Link } from 'react-router-dom';
import './singleComicPage.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComics] = useState([])
    const {loading, error, clearError, getComics} = useMarvelService();
    useEffect(()=>{
        updateComics();
        console.log(comic)
    },[comicId])

    const updateComics = () =>{
        clearError();
        if(!comicId){
            return;
        }
        getComics(comicId)
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (comics)=>{
        setComics(comics)
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic = {comic}/> : null;
    return (
       <>
            {errorMessage}
            {spinner}
            {content}
       </>
    )
}

const View = ({comic}) =>{
    const {name, description, pageCount, thumbnail, language, prices} = comic
    return (
        <div className="single-comic">
        <img src={thumbnail} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">Page count: {pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{prices}</div>
        </div>
        <Link to={'/comics'} className="single-comic__back">Back to all</Link>
    </div>
    )
}

export default SingleComicPage;