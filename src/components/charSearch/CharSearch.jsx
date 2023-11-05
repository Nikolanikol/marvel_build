import { Formik, ErrorMessage, Field, Form} from "formik";
import * as Yup from 'yup';
import './charSearch.scss';
import { useState } from "react";
import useMarvelService from "../services/MarvelService";
import { Link } from "react-router-dom";
const CharSearch = (props)=>{
    const [char, setChar] = useState(null);
    const { loading, error, getCharachterByName, clearError} = useMarvelService();
    const onCharLoaded = (char) => {
        setChar(char)
        // console.log(Object.keys(char).length)
    }
    const updateChar = (name) => {
        clearError();

        getCharachterByName(name)
            .then(onCharLoaded);
    }
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : Object.keys(char).length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char.name} page?</div>
                        <Link to={`./charachter/${char.name}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> :

                    <div className="char__search-error">
                    The character was not found. Check the name and try again
                </div>;
                 
    return(

        <div className="char__search-form">
            <Formik
                initialValues={{charName : ''}}
                validationSchema={Yup.object({
                    charName : Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                })}
                onSubmit={({charName})=>{
                    updateChar(charName)
    
                }
                }
                
            >
                <Form > 
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <Field 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 

                        disabled={loading}
                        type='submit' 
                        className="button button__main"
                        >
                        <div className="inner">find</div>
                    </button>
                </div>
                <ErrorMessage component="div" className="char__search-error" name="charName" />
            </Form>
           
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}


export default CharSearch;
