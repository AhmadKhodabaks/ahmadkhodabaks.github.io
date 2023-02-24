import ProfileTranslationHistoryItem from "./ProfileTranslationHistoryItem"

const ProfileTranslationHistory = ({ translations }) => {

    const translationList = translations.slice(-10).map((translation, index) => <ProfileTranslationHistoryItem key={index + '-' + translation} translation={translation} />)

    return (
        <section>
            <h4>Your translation history</h4>
            <table className="table table-hover">
                <thead>

                    {translationList.length === 0 && <p>There is no translation history...</p>}
                    <tr>
                        {translationList}
                    </tr>
                </thead>
            </table>
        </section>
    )
}
export default ProfileTranslationHistory