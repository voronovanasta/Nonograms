import Game from './pages/Game.js';
import About from './pages/About.js';
import Rules from './pages/Rules.js';

const routes = {
  '/': Game,
  '/about': About,
  '/how': Rules,
};

const setActiveLink = (path = '/') => {
  document.querySelectorAll('.menu__link').forEach((link) => {
    link.classList.toggle('active', path === link.href);
  });
};

const Router = (containerId) => {
  const path = window.location.pathname;
  console.log(path)
  const component = routes[path] || Game;
  
  setTimeout(()=>{
    if(path === '/'){
      document.getElementById(containerId).innerHTML = '';
      component()
    }
    else{
      document.getElementById(containerId).innerHTML = component();
    }
    
  }, 300)
  setActiveLink(path);
};

export default Router;


