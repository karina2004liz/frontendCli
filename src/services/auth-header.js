export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      return { 'x-access-token': user.token ,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    } else {
      return {};
    }
  }

  