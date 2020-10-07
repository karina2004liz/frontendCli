const API_USERS = "http://localhost:3000/users";

const register = (name, phone, email, password) => {
  const data = {
    email,
    password,
    name,
    phone,
  };

  const formBody = toFormData(data);

  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
    body: formBody,
  };

  return fetch(API_USERS + "/register", headers);
};

const login = (email, password) => {
  const data = {
    email,
    password,
  };
  const formBody = toFormData(data);

  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
    body: formBody,
  };

  return fetch(API_USERS + "/authenticate", headers)
    .then(handleResponse)
    .then((data) => {
      console.log(data.data);
      if (data.data.token) {
        localStorage.setItem("user", JSON.stringify(data.data));
      }

      return data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

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

    return data;
  });
}

function toFormData(data) {
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return (formBody = formBody.join("&"));
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
