import { useHttp } from "../../hooks/http.hook";

const useMarvelService = ()=>{
const { request, clearError, process, setProcess} = useHttp();

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

    const getCharachterByName = async(name) =>{
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        if(Object.keys(res.data.results).length > 0){
            return {
                id : res.data.results[0].id,
                name : res.data.results[0].name,
                desc : res.data.results[0].description,
                thumbnail : res.data.results[0].thumbnail.path + "." +res.data.results[0].thumbnail.extension
            }
        }else{
            return {}
        }
         
    }
    const getComics = async (id) =>{
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        console.log(res)
        return _transformComics(res.data.results[0]);
        
    }
    const getComicsList = async(offset = _baseOffset) =>{
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        // console.log(res)
        return res.data.results.map(_transformComics)
    }
    const _transformComics = (comics) =>{

        return {
            id : comics.id,
            name : comics.title, 
            prices : comics.prices[0].price ? comics.prices[0].price : "not available",
            thumbnail : comics.thumbnail.path +'.'+ comics.thumbnail.extension,
            description : comics.description || "There is no description",
            pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
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
    return {  
        process,
        setProcess,
        getCharachterByName,
        getAllCharachters,
        getCharachter,
        clearError,
        getComicsList,
        getComics}
}

export default useMarvelService;