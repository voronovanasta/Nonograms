export const LoginPage = (()=>{
  console.log('page')

  const Login = `<div id="login" class="start-section">
  <input id="logMail" type="email" placeholder="Email">
  <input id="logPassword" type="password" placeholder="Password">
  <button id="loginBtn" class="button">Login
        </button>
  <div id="error"></div>
</div>`;

 const Register = `<div id="register" class="start-section">
 <input id="regMail" class="input is-medium" type="email" placeholder="Email">
       <input id="regPassword"  type="password" placeholder="Password">
       <button id="regBtn" class="button">
         Register
       </button>
</div>`
  return {
    login : Login,
    register: Register,
  }

})();