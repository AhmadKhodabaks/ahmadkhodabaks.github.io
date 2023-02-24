import ProfileActions from "../Components/Profile/ProfileActions";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileTranslationHistory from "../Components/Profile/ProfileTranslationHistory";
import withAuth from "../hoc/withAuth"
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { findUserById } from "../api/user";
import { storageSave } from "../utils/storage";
import { STORAGE_KEY_USER } from "../const/storageKeys";

const Profile = () => {

    const { user, setUser } = useUser();

    // Prevents rerendering the fetch.
    useEffect(() => {
        const findUser = async () => {
            const [error, latestUser] = await findUserById(user.id);
            if (error === null) {
                storageSave(STORAGE_KEY_USER, latestUser);
                setUser(latestUser);
            }
        }
        //findUser();
    }, [setUser, user.id]);

    return (
        <>
            <h1>Profile</h1>
            <ProfileHeader username={user.username} />
            <ProfileActions />
            <ProfileTranslationHistory translations={user.translations} />
        </>
    )
}
export default withAuth(Profile);