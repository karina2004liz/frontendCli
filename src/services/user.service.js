import authHeader from "./auth-header";

const API_URL = "http://localhost:3000";

const getParkings = () => {
  console.log(authHeader());

  const auth = authHeader();

  console.log(auth);

  return fetch(API_URL + "/getparking", { method: "POST", headers: auth }).then(
    handleResponse
  );
};

const getUsers = () => {
  const auth = authHeader();

  console.log(auth);

  return fetch(API_URL + "/users/all", { method: "POST", headers: auth }).then(
    handleResponse
  );
};

const getAllTransactionsByUser = (idUser) => {
  const data = {
    idUser,
  };
  const auth = authHeader();

  const formBody = toFormData(data);
  console.log(formBody);

  return fetch(API_URL + "/pay/getByUser", {
    method: "POST",
    body: formBody,
    headers: auth,
  }).then(handleResponse);
};

const getTransactions = () => {
  const auth = authHeader();

  console.log(auth);

  return fetch(API_URL + "/pay/getAllPays", {
    method: "POST",
    headers: auth,
  }).then(handleResponse);
};

const getAllbyDates = (firstDate, secondDate) => {
  const data = {
    firstDate,
    secondDate,
  };
  const auth = authHeader();
  const formBody = toFormData(data);
  console.log(formBody);

  return fetch(API_URL + "/pay/getByDates", {
    method: "POST",
    body: formBody,
    headers: auth,
  }).then(handleResponse);
};

const getAllbyParking = (idParking) => {
  const data = {
    idParking,
  };
  const auth = authHeader();
  const formBody = toFormData(data);
  console.log(formBody);

  return fetch(API_URL + "/pay/getByParking", {
    method: "POST",
    body: formBody,
    headers: auth,
  }).then(handleResponse);
};

const getAllByDatesAndParking = (firstDate, secondDate, idParking) => {
  const data = {
    firstDate,
    secondDate,
    idParking,
  };
  const auth = authHeader();
  const formBody = toFormData(data);
  console.log(formBody);

  return fetch(API_URL + "/pay/getByDateAndParking", {
    method: "POST",
    body: formBody,
    headers: auth,
  }).then(handleResponse);
};

const logout = () => {
  localStorage.removeItem("user");
};

function toFormData(data) {
  var formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return (formBody = formBody.join("&"));
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (response.status !== 200) {
      if (response.status === 401 || response.status === 500) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload("/");
        //!Activar la redireccion!!
      }

      const error = (data && data.message) || response.statusText;
      console.log(error);
      return Promise.reject(error);
    }

    if (data.message === "jwt expired") {
      logout();
      window.location.reload("/");
    } else {
      return data;
    }
  });
}

export default {
  getUsers,
  getAllTransactionsByUser,
  getTransactions,
  getAllbyDates,
  getAllbyParking,
  getAllByDatesAndParking,
  getParkings,
};
