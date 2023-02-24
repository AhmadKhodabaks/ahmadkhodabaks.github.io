import SignLanguageTranslator from "./TranslationSignLanguage";
import React, { useState } from 'react';


const { useForm } = require("react-hook-form");

const TranslationForm = ({ onTranslation }) => {

    const { register, handleSubmit } = useForm();
    const [showTranslation, setShowTranslation] = useState(false);
    const [translationInput, setTranslationInput] = useState("");
    const [isTranslated, setIsTranslated] = useState(false);


    const onSubmit = ({ translationInput }) => {
        setShowTranslation(true);
        onTranslation(translationInput);
        setTranslationInput(translationInput);
        setIsTranslated(true);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label className="col-form-label col-form-label-lg mt-4" htmlFor="translation-input">Translation input:</label>
                <input className="form-control form-control-lg" type="text" {...register('translationInput')} placeholder="Hello world" />
            </fieldset>
            <button type="submit" className="btn btn-primary btn-lg">Translate</button>
            {showTranslation && isTranslated && (<SignLanguageTranslator inputText={translationInput} />)}
            {showTranslation && !isTranslated && <p>Loading...</p>}
        </form>
    )
}
export default TranslationForm