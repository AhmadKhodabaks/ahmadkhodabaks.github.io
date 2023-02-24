const validateKey = (key) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid storage key provided.");
  }
};

export const storageSave = (key, value) => {
  validateKey(key);
  if (!value) {
    throw new Error("storageSave: No value provided for " + key);
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const storageRead = (key) => {
  validateKey(key);
  const data = localStorage.getItem(key);
  // JSON usually returns string data, so here we are converting it into an object.
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const storageDelete = (key) => {
  localStorage.removeItem(key);
};
