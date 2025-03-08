window.randomId=()=>Math.random().toString(36).slice(2);
const emailRegex= RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
window.isEmail=email=>emailRegex.test(email);