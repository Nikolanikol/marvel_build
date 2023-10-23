import { useHttp } from "../../hooks/http.hook";

const useMarvelService = ()=>{
const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=a2229ccb06d8d97b20b5dea7ecc03dd7';
    const _baseOffset = 210;


    const getAllCharachters = async (offset = _baseOffset) =>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
        
    }
    const getCharachter = async (id) =>{
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
        
    }
    const getComicsList = async(offset = _baseOffset) =>{
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        
        return res.data.results.map(_transformComics)
    }
    const _transformComics = (comics) =>{
        return {
            id : comics.id,
            name : comics.title, 
            prices : comics.prices[0].price,
            thumbnail : comics.thumbnail.path +'.'+ comics.thumbnail.extension
        }
    }
    const _transformCharacter = (char)=> {

        return{
            id : char.id,
            name : char.name,
            description : char.description,
            thumbnail : char.thumbnail.path +'.'+char.thumbnail.extension ,
            homepage : char.urls[0].url,
            wiki : char.urls[1].url,
            comics : char.comics.items
        }
    }
    return {loading, error, getAllCharachters, getCharachter, clearError, getComicsList}
}

export default useMarvelService;