import { postData } from "./index";

const checkForUser = async (username) => {
  const [error, data] = await postData(`?username=${username}`, null, "GET");
  return [error, data];
};

const createUser = async (username) => {
  const [error, data] = await postData("",{ username, translations: [] },"POST");
  return [error, data];
};

export const findUserById = async (userId) => {
  const [error, data] = await postData(`/${userId}`, null, "GET");
  return [error, data];
};

/*********************************/
/***Main Functional Component.***/
/*******************************/
export async function loginUser(username) {
  const [checkError, user] = await checkForUser(username);
  if (checkError !== null) {
    return [checkError, null];
  }
  if (user.length > 0) {
    return [null, user.pop()];
  }
  return await createUser(username);
}
