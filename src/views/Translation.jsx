//import { useState } from "react";
import { addTranslation } from "../api/translation";
import TranslationForm from "../Components/Translation/TranslationForm";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage";

const Translation = () => {

    //const [translation, setTranslation] = useState(null);
    const { user, setUser } = useUser();

    const handleTranslationClick = async (translation) => {
        if (!translation) {
            alert('Please fill in the field first.');
        }

        const [error, updatedUser] = await addTranslation(user, translation);
        if (error !== null) {
            return;
        }
        // Keep UI state and server state in sync.
        storageSave(STORAGE_KEY_USER, updatedUser);

        //Update context state.
        setUser(updatedUser);

        console.log('Error', error);
        console.log('Result', updatedUser);
    }

    return (
        <>
            <h1>Translation</h1>
            <section id="translation-input">
                <TranslationForm onTranslation={handleTranslationClick} />
            </section>
        </>
    )
}
export default withAuth(Translation);