// import {  Formik, Form, Field, ErrorMessage as FormikErrorMessage  } from "formik";
// import * as Yup from 'yup'
// import { useState } from "react";
// import useMarvelService from "../../services/MarvelService";
// import {Link} from 'react-router-dom';
// import ErrorMessage from "../../errorMessage/ErrorMessage";

import './singleComponent.scss'

const SingleComponent = ()=>{

    return (
        <>
            <div className='char__search-form'>
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input
                    id="charName" 
                    name='charName' 
                    type='text' 
                    placeholder="Enter name"/>
                <button 
                    type='submit' 
                    className="button button__main"
                    disabled>
                    <div className="inner">find</div>
                </button>
            </div>
            </div>
        </>
    )
}

export default SingleComponent