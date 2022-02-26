export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.data.token,'USER')
    if (user && user.data.token) {
      return { Authorization: 'Bearer ' + user.data.token };
    } else {
      return {};
    }
  }