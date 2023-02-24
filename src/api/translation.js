import { postData } from ".";

export const addTranslation = async (user, translation) => {
    const response = postData(`/${user.id}`, {translations: [...user.translations, translation]}, 'PATCH'); 
    return response;
}

export const clearHistoryTranslation = (userId) => {
    const response = postData(`/${userId}`, {translations: []}, 'PATCH'); 
    return response
}