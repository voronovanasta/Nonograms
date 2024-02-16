const Rules = () => {
  return `<div>
  <h2>Rules</h2>
  <p><Game rules:<br> Nonograms is a puzzle game to reveal a hidden picture by looking at the number clues.The clues are given at the top and left side of the grid. Each number in these clue defines a block of black cell. A number indicates an unbroken line of black cells, and they are in the same order as the lines. These puzzles are often black and white—describing a binary image—but they can also be colored.
  </p>
  </div>`

// const themeMode = document.querySelector('#theme');
// themeMode.addEventListener('click', (e)=>{
//           e.preventDefault();
//           updateTheme();
//           darkThemeOn();
// })
// darkThemeOn();

// function updateTheme (){
//   if(localStorage.getItem('theme') === 'dark'){
//     localStorage.removeItem('theme')
//   }
//   else {
//     localStorage.setItem('theme', 'dark')
//   }
// }

// function darkThemeOn (){
//   if(localStorage.getItem('theme') === 'dark'){
//     document.querySelector('html').classList.remove('dark')
//     document.querySelector('.theme-mode span').textContent = `settings_night_sight` ;
//   }
//   else{
//     document.querySelector('html').classList.add('dark');
//     document.querySelector('.theme-mode span').textContent = 'light_mode';
//   }
// }
return container
}
export default Rules;
