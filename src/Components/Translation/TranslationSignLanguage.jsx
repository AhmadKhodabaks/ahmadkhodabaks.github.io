const SignLanguageTranslator = ({ inputText }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const translateText = inputText.toLowerCase().replace(/[^a-z]/g, "");

  const signLanguageImages = translateText.split("").map((letter, index) => {
    if (!letters.includes(letter)) {
      return null;
    }
    return (
      <img
        key={index}
        src={`/img/${letter}.png`}
        alt={`Sign language for letter ${letter}`}
      />
    );
  });

  return (
    <div>
      <p>{signLanguageImages}</p>
    </div>
  );
};
export default SignLanguageTranslator;  