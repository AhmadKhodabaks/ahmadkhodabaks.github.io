const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const createHeaders = () => {
  return {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };
};

export const postData = async (queryStr, data, method = "GET") => {
  const url = apiUrl + queryStr;
  const options = {
    method,
    headers: createHeaders(),
  };

  if (method === "POST" || method === "PATCH") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Could not complete request.");
    }
    const responseData = await response.json();
    return [null, responseData];
  } catch (error) {
    return [error.message, []];
  }
};
