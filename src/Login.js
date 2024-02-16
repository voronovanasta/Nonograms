import { LoginPage } from "./pages/LoginPage";
import App from './App';
import './Login.css';
import { Config } from "./utils/gameConfig";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { auth } from "./Firebase";
export const Login = () => {

    class LoginView {
        constructor(){
            this.container = null;
            this.root = null
        }

        init (container) {
          this.container = container;
          this.showRegisterForm();
        };

        showRegisterForm () {
          this.container.innerHTML = LoginPage.register;
       }
    
        showLoginForm () {
          console.log('here')
          console.log(this.container)
          console.log(LoginPage.login)
          this.container.innerHTML = LoginPage.login;
        };
    
        // loginError (error) {
        //     this.container.querySelector("#error").innerHTML = `${error}`;
        // };
    
        showGame () {
            this.container.innerHTML = '';
            
            App(this.container);
        };
    
        hideGame () {
            this.showLoginForm();
          
        };
    }
    
    class LoginModel {

        constructor(){
            this.view = null
        }

        init(view) {
          this.view = view;
          this.userData = JSON.parse(sessionStorage.getItem("my_firebase_user"));
          if (this.userData) {
            this.view.showGame();
          }
        }

        login (userEmail, userPass) {
          if (userEmail && userPass) {
            signInWithEmailAndPassword(auth, userEmail, userPass)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userId = user.uid;
                Config.userId = userId;
                sessionStorage.setItem("my_firebase_user", JSON.stringify(userId));
                this.view.showGame();
              })
        //       
            }
          }

        register (userEmail, userPass) {
            if (userEmail && userPass) {
             
              createUserWithEmailAndPassword(auth, userEmail, userPass)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  if (user) {
                    // User is signed in.
                    this.view.showLoginForm()
      
                  } else {
                    // No user is signed in.
                    this.view.hideGame();
                    sessionStorage.removeItem("my_firebase_user");
                  }
                })
                .catch(function (error) {
                  console.log("Error: " + error.message);
      
                });
            }
          };
      
          logout () {
            auth.signOut().then(() => {
              this.view.hideGame();
              sessionStorage.removeItem("my_firebase_user");
              Config.useId =null;
            });
          };
      
        }
    
      class LoginController {

        constructor (){
            this.model = null
            this.container = null
        }
    
        init (container, model) {
          this.model = model;
          this.container = container;
    
          this.addEventListeners();
        };
    
        addEventListeners (){
          document.addEventListener("click", (e) => {
            if (e.target && e.target.id === "regBtn") {
              e.preventDefault();
              e.stopPropagation();
              this.model.register(
                this.container.querySelector("#regMail").value,
                this.container.querySelector("#regPassword").value
              );
            }
    
            if (e.target && e.target.id === "loginBtn") {
              e.preventDefault();
              e.stopPropagation();
              this.model.login(
                this.container.querySelector("#logMail").value,
                this.container.querySelector("#logPassword").value
              );
            }
    
            if (e.target.id === "logoutBtn") {
              console.log('logout')
              //e.preventDefault();
              //e.stopPropagation();
              this.model.logout();
            }
          });
        };
      }
    
      return {
        init (root) {
          const myAppView = new LoginView();
          const myAppModel = new LoginModel();
          const myAppController = new LoginController();
    
          myAppView.init(root);
          myAppModel.init(myAppView);
          myAppController.init(root, myAppModel);
        }
      };

    }