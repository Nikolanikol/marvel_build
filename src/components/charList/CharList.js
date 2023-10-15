import { Component } from 'react';
import MarvelService from '../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
class CharList extends Component{

    state = {
        char : [],
        loading : true,
        error : false,
        newItemLoading : false,
        offset : 210,
    }

    componentDidMount(){
        this.onRequest()
    }

    marvelSevice = new MarvelService();
    onCharListLoaded = (newChar)=>{
        this.setState(({char, offset})=>({
            char : [...char, ...newChar],  
            loading : false, 
            newItemLoading : false,
            offset : offset + 9,
        }))

    }
    onError = ()=>{
        this.setState({
            loading : false,
            error : true, 
        })
    }
    getAllCharacter = ()=>{
        this.marvelSevice
            .getAllCharachters()
                .then(this.onCharListLoaded)
                .catch(this.onError)

    }



    charListRender = () =>{
   
        const {char} = this.state;
        const items = char.map(obj=>{
            const {name, thumbnail, id} = obj;
            let imgStyle = {'objectFit' : 'cover'};
        if(thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit' : 'contain'};
        }
        let clazz = 'char__item'
        if(this.props.charId == id){
            clazz = 'char__item char__item_selected'

        }
            return (
                <li 
                    onFocus={this.props.charId == id}
                    tabIndex={0}
                    key = {id}
                    className= {clazz}
                    onClick={()=>this.props.onCharSelected(obj.id)}
                    onKeyPress = {(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(obj.id);
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
    onRequest = (offset) =>{
        this.onCharListLoading();
        this.marvelSevice
            .getAllCharachters(offset)
                .then(this.onCharListLoaded)
                .catch(this.onError)
    }
    onCharListLoading = ()=>{
        this.setState({
            newItemLoading : true
        })
    }
    render () {
        const element = this.charListRender()
        const {loading, error, newItemLoading, offset} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? element : null
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    onClick={()=>this.onRequest(offset)}
                    disabled = {newItemLoading}
                    className="button button__main button__long"
                >
                    <div className="inner"
                    >load more</div>
                </button>
            </div>
        )

    }
} 

export default CharList;