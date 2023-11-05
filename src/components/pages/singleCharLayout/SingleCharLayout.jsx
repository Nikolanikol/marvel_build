import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import './singleCharLayout.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import setContent from '../../../utils/setContent';
const SingleCharacterLayout = () => {

    const {charName} = useParams()

    const [char, setChar] = useState([]);
    const{ process, setProcess, getCharachterByName, clearError} = useMarvelService();


    useEffect(()=>{
       updateComics()

    },[charName])
    const updateComics = () =>{
        clearError();
        if(!charName){
            return;
        }
        getCharachterByName(charName)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char)=> {
        setChar(char)
    }
   

    const Content = ()=>{

        const {name : title, desc, thumbnail, id} = char;
        if(Object.keys(char).length >1){
            const description = desc.length>0 ? desc : 'Description not found'
            return (
                        <div className="single-comic">
                            <Helmet>
                            <meta
                                name="description"
                                content={`${title} page`}
                            />
                            <title>{title} character</title>
                            </Helmet>
                            <img src={thumbnail} alt={title} className="single-comic__char-img"/>
                            <div className="single-comic__info">
                                <h2 className="single-comic__name">{title}</h2>
                                <p className="single-comic__descr">{description}</p>
                            </div>
                        </div>
                    )
        }else{
            setProcess('error')
        }

    }
    
        return(
            setContent(process, ()=>Content() )
        )
    }



export default SingleCharacterLayout;