import "../styles/header.css"
export const Header = () => {
  return `<header class="header">
  <div class="wrapper">
    <a href="" target="_blank" >
      <span class="logo"></span>
    </a>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav_item">
          <a href="/" class="nav_link menu__link" id = "game">
          Game
          </a>
        </li>
        <li class="nav_item">
          <a href="/about" class="nav_link menu__link" id = "about">
          About
          </a>
        </li>
        <li class="nav_item">
          <a href="/how" class="nav_link menu__link" id = "rules">Rules</a>
        </li>
      </ul>
    </nav>
    <div class="popup" id = 'popup'></div>
    <div class="header_burger" >
    <svg id = 'burger' width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#665F55"/><path d="M14 18H30" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 26H30" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <div class="close_nav" >
  <svg id = 'close' width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#665F55"/>
     <path d="M16.3438 16.3431L27.6575 27.6568" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M16.3438 27.6568L27.6575 16.3431" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
  </div>
  </div>
</header>`
}