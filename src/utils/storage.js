export default {
  set: (value) => localStorage.setItem('accountManager', value),
  get: () => JSON.parse(localStorage.getItem('accountManager')),
  clear: () => localStorage.removeItem('accountManager')
}
