import { Link } from "react-router-dom"
import { clearHistoryTranslation } from "../../api/translation";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";


const ProfileActions = () => {

    const { user, setUser } = useUser();

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure?')) {
            storageDelete(STORAGE_KEY_USER);
            setUser(null);
        }
    }

    const handleClearHistoryClick = async () => {
        if (!window.confirm('Are you sure?\nThis cannot be undone!')) {
            return;
        }
        const [clearError] = await clearHistoryTranslation(user.id);
        if (clearError !== null) {
            return;
        }
        const updatedUser = {
            ...user,
            translations: []
        };
        storageSave(STORAGE_KEY_USER, updatedUser);
        setUser(updatedUser);
    }


    return (
        <div>
            <button className="btn btn-outline-dark"><Link to="/translation">Translations</Link></button>
            <button className="btn btn-primary" onClick={handleClearHistoryClick}>Clear history</button>
            <button className="btn btn-primary" onClick={handleLogoutClick}>Logout</button>
        </div>
    )
}
export default ProfileActions