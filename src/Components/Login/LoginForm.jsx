import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/user';
import { storageSave } from '../../utils/storage';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEY_USER } from '../../const/storageKeys';

const isSpecialChar = (username) => {
  // Check if the username contains only letters, numbers, and underscores
  const isValid = /^[a-zA-Z0-9_]+$/.test(username);
  if (!isValid) {
    return "Username must contain only letters, numbers, and underscores";
  }

  // If all checks pass, return true
  return true;
}

const usernameConfiguration = {
  required: {
    value: true,
    message: "Username is required"
  },
  minLength: {
    value: 3,
    message: "Username must be 3 characters long"
  },
  maxLength: {
    value: 20,
    message: "Username must be 20 characters long"
  },
  validate: {
    isSpecialChar,
  }
}

/*********************************/
/***Main Functional Component.***/
/*******************************/
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, setUser } = useUser();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (user !== null) {
      navigate('/profile');
    }
  }, [user, navigate])

  // This will execute the handleSubmit function from the useForm library.
  const onSubmit = async ({ username }) => {
    setLoading(true);
    const [error, userResponse] = await loginUser(username);
    // This will record the error due to API not being able to log in.
    if (error !== null) {
      setApiError(error);
    }
    if (userResponse !== null) {
      storageSave(STORAGE_KEY_USER, userResponse);
      setUser(userResponse);
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Enter username</h2>
      <form onSubmit={handleSubmit(onSubmit)}> {/* onSubmit is triggered with argument 'handleSubmit', handleSubmit triggers with argument 'onSubmit', handleSubmit uses validation checking on whatever 'onSubmit' passes, it'll return to the initial onSubmit triggeration and return whatever has been defined in that function*/}
        <fieldset>
          <label htmlFor="username">Username: </label>
          <input type="text" placeholder="johndoe" name="username" {...register('username', usernameConfiguration)} />
          {errors.username && <p>{errors.username.message}</p>}
        </fieldset>
        <button type="submit" disabled={loading}>Submit</button>
        {loading && <p>please wait...</p>}
        {apiError && <p>{apiError}</p>}
      </form>
    </>
  )
}

export default LoginForm