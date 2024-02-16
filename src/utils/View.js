import { Config } from "./gameConfig";

const levelsArr = ['light', 'middle', 'hard'];
const patternArr =[
    ['tree', 'rhombus', 'ruLetterD', 'dinosour', 'fan'],
    ['snowman', 'turnip', 'cat', 'kettle', 'plum'],
    ['coffee', 'elephant', 'lion', 'candle', 'frog']
  ];
export class View {
    constructor(){
        this.container = null
        this.canvas = null
        this.ctx = null;
        this.fieldRowCount = 5;
        this.fieldColumnCount = 5;
        this.cellWidth = 45;
        this.cellHeight = 45;
        this.width = null;
        this.height = null;
        this.canvasWrapper = null;
        this.primeColor = "#000000";
        this.fillColor = "#000000";
        this.settings = null;
        this.rightAudio = null;
        this.leftAudio = null;
       

    }

    init (container){
        this.container = container;
        this.width = this.fieldColumnCount * this.cellWidth;
        this.height = this.fieldRowCount * this.cellHeight;
        this.updateConfig();
        this.createMenu();
        this.rightAudio = new Audio();
        this.rightAudio.src = './assets/audio/left.mp3'
        this.leftAudio = new Audio('./assets/audio/left.mp3');
       
        //this.checkMute(Config.mute)

    }

    updateConfig (){
      Config.fieldRowCount = this.fieldRowCount;
      Config.fieldColumnCount =  this.fieldColumnCount;
      Config.cellWidth = this.cellWidth;
      Config.cellHeight = this.cellHeight;
      Config.width = this.width
      Config.height = this.height;
      Config.canvas = this.canvas;
      
    }

    updateCanvasSettings(levelNumber){
      switch(levelNumber){
        case 0:
        this.cellWidth = 45;
        this.cellHeight = 45;
        this.fieldRowCount = 5;
        this.fieldColumnCount = 5;
        this.width = this.fieldColumnCount * this.cellWidth;
        this.height = this.fieldRowCount * this.cellHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        break;
        case 1: 
        this.cellWidth = 35;
        this.cellHeight = 35;
        this.fieldRowCount = 10;
        this.fieldColumnCount = 10;
        this.width = this.fieldColumnCount * this.cellWidth;
        this.height = this.fieldRowCount * this.cellHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        break;
        case 2: 
        this.cellWidth = 25;
        this.cellHeight = 25;
        this.fieldRowCount = 15;
        this.fieldColumnCount = 15;
        this.width = this.fieldColumnCount * this.cellWidth;
        this.height = this.fieldRowCount * this.cellHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        break;
    }
}

createMenu (){
  console.log('menu')
  const solutionBtn = document.createElement("button");
  solutionBtn.type = "button";
  solutionBtn.id = "solution";
  solutionBtn.className = "button solution-btn";
  solutionBtn.textContent = "Solution";
  
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.id = "save";
  saveBtn.className = "button save-btn";
  saveBtn.textContent = "Save";
  
  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.id = "reset";
  resetBtn.className = "button reset-btn";
  resetBtn.textContent = "Reset";
  
  const themeMode = document.createElement('a');
  themeMode.innerHTML = '<span class="material-symbols-outlined " id = "theme-mode">dark_mode</span>';
  themeMode.id = 'theme';
  themeMode.href = '';

  const settings = document.createElement('a');
  settings.innerHTML = '<span class="material-symbols-outlined game-settings"  id = "settings">settings</span>';
  settings.href = '';

  

  const mute = document.createElement('a');
  mute.className = 'mute'
  mute.innerHTML = '<span class="material-symbols-outlined" id = "mute">no_sound</span>';
  mute.href = '';

  const scoreTableLink = document.createElement("a");
  const scoreIcoContainer = document.createElement('span');
  const tableTitle = document.createElement('span');
  tableTitle.className = 'table-title';
  scoreIcoContainer.className = 'score-ico'
  scoreTableLink.href = ''
  tableTitle.id = "table";
  scoreTableLink.classList.add("table-link");
  tableTitle.textContent = "Scores";
  
  scoreTableLink.append(tableTitle, scoreIcoContainer)

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'logout'
  logoutBtn.innerHTML = '<span class="material-symbols-outlined" id = "logoutBtn">logout</span>';

  const menu = document.createElement('div');
  menu.className = 'menu';

  const menuLinks = document.createElement('div');
  menuLinks.className = 'menu-links';
  
  const gameBtnsContainer = document.createElement('div');
  gameBtnsContainer.className = 'game-btns-container';

  gameBtnsContainer.append(solutionBtn, saveBtn, resetBtn);
  menuLinks.append(settings, themeMode, mute)
  menu.append(menuLinks, scoreTableLink, gameBtnsContainer, logoutBtn);
  this.container.append(menu);
    
};
checkMute(isMute){
  if(isMute){
      this.container.querySelector('.mute span').textContent = `volume_up`;
  }
  else{
      this.container.querySelector('.mute span').textContent = 'no_sound';

  }
}

switchTheme (){
  if(localStorage.getItem('theme') === 'night') {
          document.querySelector('html').classList.add('dark')
          this.ctx.clearRect(0,0,this.width,this.height);
          console.log(this.primeColor)
          this.drawField();
          this.container.querySelector('#field').classList.remove('disable-click');
          this.container.querySelector('#theme span').textContent = `light_mode` ;
   }
   else {
     document.querySelector('html').classList.remove('dark');
     this.container.querySelector('#theme span').textContent = 'dark_mode';
     this.ctx.clearRect(0,0,this.width, this.height);
     console.log(this.primeColor)
     this.drawField();

   }
}

    createFieldCanvas (){
        this.canvasWrapper = document.createElement("div");
        this.canvasWrapper.className = "canvas-wrapper";
        this.canvas = document.createElement("canvas");
        this.canvas.className = "canvas canvas-field";
        this.canvas.id = "field";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.canvasWrapper.append(this.canvas);
        this.container.prepend(this.canvasWrapper)
    }
    drawField (){
            this.ctx.clearRect(0, 0, this.width, this.height)
            for (let r = 0; r < this.fieldRowCount; r++) {
              for (let c = 0; c < this.fieldColumnCount; c++) {
                const cellX = c * (this.cellWidth) + 0.5;
                const cellY = r * (this.cellHeight) + 0.5;
                this.ctx.beginPath();
                this.ctx.rect(cellX, cellY, this.cellWidth, this.cellHeight);
                this.ctx.strokeStyle = this.primeColor;
                this.ctx.stroke();
                this.ctx.closePath();
              }
            }

            if(this.fieldRowCount===10){
              this.ctx.beginPath();
              this.ctx.lineWidth = 1.5;
              this.ctx.strokeStyle = this.primeColor
              this.ctx.moveTo(0, this.canvas.height/2);
              this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
              this.ctx.stroke();
              this.ctx.closePath();

              this.ctx.beginPath();
              this.ctx.lineWidth = 1.5;
              this.ctx.strokeStyle = this.primeColor
              this.ctx.moveTo(this.canvas.width/2, 0);
              this.ctx.lineTo(this.canvas.width/2, this.canvas.height);
              this.ctx.stroke();
              this.ctx.closePath();
            }

            if(this.fieldRowCount === 15){
              this.ctx.beginPath();
              this.ctx.lineWidth = 1.5;
              this.ctx.strokeStyle = this.primeColor;
              this.ctx.moveTo(0, this.canvas.height/3);
              this.ctx.lineTo(this.canvas.width, this.canvas.height/3);
              this.ctx.stroke();
              this.ctx.closePath();

              this.ctx.beginPath();
              this.ctx.lineWidth = 1.5;
              this.ctx.strokeStyle = this.primeColor
              this.ctx.moveTo(this.canvas.width/3, 0);
              this.ctx.lineTo(this.canvas.width/3, this.canvas.height);
              this.ctx.stroke();
              this.ctx.closePath();

              this.ctx.beginPath();
              this.ctx.lineWidth = 1.5;
              this.ctx.strokeStyle = this.primeColor
              this.ctx.moveTo(0, this.canvas.height/3 * 2);
              this.ctx.lineTo(this.canvas.width, this.canvas.height/3 * 2);
              this.ctx.stroke();
              this.ctx.closePath();

              this.ctx.beginPath();
              this.ctx.lineWidth = 1.5;
              this.ctx.strokeStyle = this.primeColor
              this.ctx.moveTo(this.canvas.width/3 * 2, 0);
              this.ctx.lineTo(this.canvas.width/3 * 2, this.canvas.height);
              this.ctx.stroke();
              this.ctx.closePath();
            }
    }

     drawAbout (){
      const aboutContainer = document.createElement('div');
      const aboutBtn = document.createElement('button');
      const title = document.createElement('h2')
      title.textContent = 'About Nonograms'
      aboutBtn.id = 'about-btn';
      aboutBtn.className = 'button'
      aboutBtn.textContent = 'Ok!'
      aboutContainer.append(title, aboutBtn);
      this.container.append(aboutContainer)

    }

     createSettings(levelIndex){
      console.log(levelIndex)
      const settingsModal = document.createElement('div');
      settingsModal.className = 'settings-modal modal-closed';

      const selectContainer = document.createElement('div');
      selectContainer.className = 'select-container';
    
      const title = document.createElement('h2');
      title.textContent = "Settings"
      const loadBtn = document.createElement("button");
      loadBtn.type = "button";
      loadBtn.id = "load";
      loadBtn.className = "button load-btn";
      loadBtn.textContent = "Continue saved game";
    
      const randomBtn = document.createElement("button");
      randomBtn.type = "button";
      randomBtn.id = "random";
      randomBtn.className = "button random-btn";
      randomBtn.textContent = "Random game";
    
      const okBtn = document.createElement('button');
      okBtn.id = 'ok-btn'
      okBtn.textContent = 'Ok!';
      okBtn.className = 'button';
    
      const levelsLabel = createlevelsSelect();
      const itemsLabel = createItemsSelect();
    
      function createlevelsSelect (){
        console.log(levelIndex)
        const levels = ['light', 'middle', 'hard'];
        const levelsSelect = document.createElement('select');
        levelsSelect.className = 'select';
        levelsSelect.name = 'levels';
        levelsSelect.id = 'levels';
        const levelsLabel = document.createElement('label');
        levelsLabel.textContent = "Choose a Level: "
        levelsLabel.for = 'levels'
        for(let i = 0; i < levels.length; i++){
          let option = document.createElement('option');
          option.value = levels[i]
          option.text = levels[i]
          if(i === levelIndex) {
            option.selected = true;
          }
    
          levelsSelect.append(option);
         }
        levelsLabel.append(levelsSelect)
        return levelsLabel
      }
    
      function createItemsSelect (){
      const itemsSelect = document.createElement('select');
      itemsSelect.className = 'select'
      itemsSelect.name = 'items';
      itemsSelect.id = 'items';
      const itemsLabel = document.createElement('label');
      itemsLabel.textContent = "Choose a picture: "
      itemsLabel.for = 'items';
      console.log(levelIndex)
      console.log(patternArr[levelIndex])
      for(let i = 0; i < patternArr[levelIndex].length; i++){
        let option = document.createElement('option');
        option.value = patternArr[levelIndex][i];
        option.text = patternArr[levelIndex][i];
        itemsSelect.append(option);
        if(option === patternArr[levelIndex][i]){
          option.selected = true;
        }
      }
      itemsLabel.append(itemsSelect)
      return itemsLabel
      }
      selectContainer.append (levelsLabel, itemsLabel)
      settingsModal.append(title, loadBtn, randomBtn, selectContainer, okBtn);
      this.settings=settingsModal;
      this.container.append(settingsModal)
    }

    showSettings (){
      this.settings.classList.remove('modal-closed')
    }

     hideSettings (){
      this.settings.classList.add('modal-closed')
    }

    drawLeftClues(leftCluesArr, level) {

      if(this.container.querySelector('#left')){
        this.container.querySelector('#left').remove()
      }
      let columnCount = 0;
      for(let i = 0; i< leftCluesArr.length; i++){
        if(columnCount < leftCluesArr[i].length){
          columnCount = leftCluesArr[i].length;
        }
      }
    
      for(let i = 0; i < leftCluesArr.length; i++){
        while(leftCluesArr[i].length !== columnCount){
          leftCluesArr[i].unshift(0)   
       }
      }
    
      const leftTable = document.createElement('table');
      leftTable.className = `${level}-left-table table`;
      leftTable.id = 'left';
     
      this.canvasWrapper.append(leftTable);
    
      const tableBody = document.createElement('tbody');
      leftTable.append(tableBody);
    
      for(let r = 0; r< leftCluesArr.length; r++){
        let row = tableBody.insertRow()
        for(let c = 0; c < leftCluesArr[r].length; c++){
          let cell = row.insertCell();
          cell.className = `${level}-cell cell`;
          if(leftCluesArr[r][c] != 0){
            cell.textContent = leftCluesArr[r][c];
            cell.classList.add('clue')
          }
        }
    }
    
    if(leftCluesArr.length === 10){
      const rows = [...leftTable.rows];
      rows[4].className = 'thick-bottom line'
    }
    
    if(leftCluesArr.length === 15){
      const rows = [...leftTable.rows];
      rows[4].className = `${level}-cell cell thick-bottom line`
      rows[9].className = `${level}-cell cell thick-bottom line`
    }
    }

    drawTopClues(topCluesArr, level) {
      if(this.container.querySelector('#top')){
        this.container.querySelector('#top').remove()
      }
      let columnCount = 0;
      
      for(let i = 0; i< topCluesArr.length; i++){
        if(columnCount < topCluesArr[i].length){
          columnCount = topCluesArr[i].length
        }
      }
    
      for(let i = 0; i < topCluesArr.length; i++){
        
        while(topCluesArr[i].length !== columnCount){
          topCluesArr[i].unshift(0)   
       }
      }
      const topTable = document.createElement('table');
      topTable.className = `${level}-top-table table`;
      topTable.id = 'top';
      this.canvasWrapper.append(topTable);
    
      const tableBody = document.createElement('tbody');
      topTable.append(tableBody);
    
      for (let c = 0; c < columnCount; c++) {
        let row = tableBody.insertRow()
        for (let r = 0; r < topCluesArr.length; r++) {
          let cell = row.insertCell();
          cell.className = `${level}-cell cell`;
          if(topCluesArr[r][c] != 0){
            cell.textContent = topCluesArr[r][c];
            cell.classList.add('clue');
          }
        }
      }
    
      if(topCluesArr.length === 10){
        const rows = [...topTable.rows];
        for (let i = 0; i < rows.length; i++){
          const cells = rows[i].cells;
          cells[4].className = `${level}-cell cell thick-right line`;
          if(cells[4].textContent){
            cells[4].classList.add('clue');
          }
        }
        
      }
      
      if(topCluesArr.length === 15){
        const rows = [...topTable.rows];
        for (let i = 0; i < rows.length; i++){
          const cells = rows[i].cells;
          cells[4].className = `${level}-cell cell thick-right line`;
          cells[9].className = `${level}-cell cell thick-right line`;
    
          if(cells[4].textContent){
            cells[4].classList.add('clue');
          }
    
          if(cells[9].textContent){
            cells[9].classList.add('clue');
          }
        }
    
      }
    }

    drawSolution(cells) {
      for (let r = 0; r <  this.fieldRowCount; r++) {
        for (let c = 0; c <  this.fieldColumnCount; c++) {
          this.ctx.beginPath();
          this.ctx.rect(cells[r][c].x - 0.5, cells[r][c].y - 0.5,  this.cellWidth - 0.5,  this.cellHeight - 0.5);
          if (cells[r][c].value === 1) {
            cells[r][c].isPainted = true;
            this.ctx.fillStyle =  this.primeColor;
            this.ctx.fill();
            this.ctx.closePath();
          } 
        }
      }

      return cells
    }

    refreshLines(){
      if(this.fieldRowCount===10){
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle =  this.primeColor
        this.ctx.moveTo(0, this.canvas.height/2); 
        this.ctx.lineTo(this.canvas.width, this.canvas.height/2); 
        this.ctx.stroke();
        this.ctx.closePath();
    
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = this.primeColor
        this.ctx.moveTo( this.canvas.width/2, 0); 
        this.ctx.lineTo( this.canvas.width/2,  this.canvas.height); 
        this.ctx.stroke();
        this.ctx.closePath();
      }
    
      if( this.fieldRowCount === 15){
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle =  this.primeColor
        this.ctx.moveTo(0,  this.canvas.height/3); 
        this.ctx.lineTo( this.canvas.width,  this.canvas.height/3); 
        this.ctx.stroke();
        this.ctx.closePath();
    
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle =  this.primeColor
        this.ctx.moveTo( this.canvas.width/3, 0); 
        this.ctx.lineTo( this.canvas.width/3,  this.canvas.height); 
        this.ctx.stroke();
        this.ctx.closePath();
    
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle =  this.primeColor
        this.ctx.moveTo(0,  this.canvas.height/3 * 2); 
        this.ctx.lineTo( this.canvas.width,  this.canvas.height/3 * 2); 
        this.ctx.stroke();
        this.ctx.closePath();
    
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle =  this.primeColor
        this.ctx.moveTo( this.canvas.width/3 * 2, 0); 
        this.ctx.lineTo( this.canvas.width/3 * 2,  this.canvas.height); 
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }

    resetGame(cells){
      for (let r = 0; r <  this.fieldRowCount; r++) {
        for (let c = 0; c <  this.fieldColumnCount; c++) {
          if ( cells[r][c].isPainted ) {
            
            this.ctx.clearRect(cells[r][c].x , cells[r][c].y  ,  this.cellWidth - 0.85 ,  this.cellHeight - 0.85 )
          } 

          if ( cells[r][c].isCrossed ) {
            
            this.ctx.clearRect(cells[r][c].x + 0.5 , cells[r][c].y + 0.5,  this.cellWidth - 0.5  ,  this.cellHeight - 0.5 )
          } 
        }
      }

      for (let r = 0; r < cells.length; r++) {
        for (let c = 0; c < cells[r].length; c++) {
                if(r === 4 || r ===5 || c === 4 || c === 5){
            this.refreshLines()
          }
            
          if (cells[r][c].isPainted) {
            cells[r][c].isPainted = false;
          } 
          else if (cells[r][c].isCrossed) {
            cells[r][c].isCrossed = false;
          }
          
        }
      }
     
    }

    createTimer(minutes, sec){
      const timer = document.createElement("span");
      timer.id = "timer";
      timer.classList.add("timer");
      timer.textContent = `${minutes.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
       this.canvasWrapper.prepend(timer)
    }

    showTimer (sec, minutes){
      this.container.querySelector('#timer').textContent = `${minutes.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
    }

    updateItemsSelect (pattern){
      const itemsSelect = this.container.querySelector('#items');
      for(let i = 0; i < pattern.length; i++){
        itemsSelect.options[i].text = pattern[i]
        itemsSelect.options[i].value = pattern[i]
      }
    }

    updateSelectedLevel(levelName){
      let levelOptions = this.container.querySelector('#levels').getElementsByTagName('option');
      for(let i = 0; i < levelOptions.length; i++){
        if(levelOptions[i].value === levelName) levelOptions[i].selected = true;
      }
    }

    updateSelectedItem (patternName){
      let itemsOptions = this.container.querySelector('#items').getElementsByTagName('option');
      for(let i = 0; i < itemsOptions.length; i++){
        if(itemsOptions[i].value === patternName) itemsOptions[i].selected = true;
      }
    }

    drawSavedGame (savedCells){
      for (let r = 0; r < this.fieldRowCount; r++) {
        for (let c = 0; c < this.fieldColumnCount; c++) {
          this.ctx.beginPath();
          this.ctx.rect(savedCells[r][c].x -0.5, savedCells[r][c].y -0.5, this.cellWidth -0.5, this.cellHeight -0.5);
          if (savedCells[r][c].isPainted) {
            this.ctx.fillStyle = this.primeColor;
            this.ctx.fill();
            this.ctx.closePath();
          }
          else if(savedCells[r][c].isCrossed){
              //border
              this.ctx.beginPath();
              this.ctx.rect(savedCells[r][c].x, savedCells[r][c].y, this.cellWidth, this.cellHeight);
              this.ctx.strokeStyle = this.primeColor;
              this.ctx.stroke();
              this.ctx.closePath();
    
              //cross
              this.ctx.beginPath();
              this.ctx.moveTo(savedCells[r][c].x + 5.2, savedCells[r][c].y + 5.2);
              this.ctx.lineTo(savedCells[r][c].x + this.cellWidth - 5.2, savedCells[r][c].y + this.cellHeight - 5.2);
              this.ctx.stroke();
    
              this.ctx.beginPath();
              this.ctx.moveTo(savedCells[r][c].x + 5.2, savedCells[r][c].y + this.cellHeight - 5.2);
              this.ctx.lineTo(savedCells[r][c].x + this.cellWidth -5.2, savedCells[r][c].y + 5.2);
              this.ctx.stroke();
          }
        }
      }
    }

    fillCell(e, cells) {
      let event = e;
      let button = e.button;
      console.log(cells)
       for (let r = 0; r < cells.length; r++) {
        for (let c = 0; c < cells[r].length; c++) {
          let clientX = event.clientX - this.canvas.offsetLeft;
          let clientY = event.clientY - this.canvas.offsetTop;
          if(r === 4 || r ===5 || c === 4 || c === 5){
            this.refreshLines()
          }
          if (
            clientX > cells[r][c].x &&
            clientX < cells[r][c].x + this.cellWidth &&
            clientY > cells[r][c].y &&
            clientY < cells[r][c].y + this.cellHeight
          ) {
            if (!cells[r][c].isPainted && button === 0) {
              this.ctx.clearRect(cells[r][c].x, cells[r][c].y, this.cellWidth - 0.5, this.cellHeight - 0.5);
              this.ctx.beginPath();
              this.ctx.rect(cells[r][c].x - 0.5, cells[r][c].y-0.5, this.cellWidth - 0.5, this.cellHeight - 0.5);
              this.ctx.fillStyle = this.fillColor;
              this.ctx.fill();
              this.ctx.closePath();
              //this.leftAudio.play();

            } else if (cells[r][c].isPainted && button === 0) {
              this.ctx.clearRect(cells[r][c].x, cells[r][c].y, this.cellWidth - 0.5, this.cellHeight - 0.5);
              //this.leftAudio.play();
              
            } else if (!cells[r][c].isCrossed && button === 2) {
              this.ctx.clearRect(cells[r][c].x + 0.5, cells[r][c].y + 0.5, this.cellWidth - 0.5, this.cellHeight - 0.5);
              this.rightAudio.play();
              //cross
              this.ctx.beginPath();
              this.ctx.moveTo(cells[r][c].x + 8.2, cells[r][c].y + 8.2);
              this.ctx.lineTo(cells[r][c].x + this.cellWidth - 8.2, cells[r][c].y + this.cellHeight - 8.2);
              this.ctx.stroke();
    
              this.ctx.beginPath();
              this.ctx.moveTo(cells[r][c].x + 8.2, cells[r][c].y + this.cellHeight - 8.2);
              this.ctx.lineTo(cells[r][c].x + this.cellWidth -8.2, cells[r][c].y + 8.2);
              this.ctx.stroke();
            } else if (cells[r][c].isCrossed && button === 2) {
              //this.rightAudio.play();
              this.ctx.clearRect(cells[r][c].x + 5.2, cells[r][c].y + 5.2, this.cellWidth - 5.2 , this.cellHeight - 5.2);
              this.ctx.beginPath();

              this.ctx.moveTo(cells[r][c].x , cells[r][c].y + this.cellHeight);
              this.ctx.lineTo(cells[r][c].x + this.cellWidth , cells[r][c].y + this.cellHeight );
              this.ctx.lineTo(cells[r][c].x + this.cellWidth , cells[r][c].y);
              this.ctx.stroke();
            }
          }
        }
      }
    }

    createResultMessage (){
      const overlay = document.createElement('div');
      const resultModal = document.createElement('button');
      const resultBtn = document.createElement('button');
      const message = document.createElement('p')
      message.id = 'message'
      message.textContent = ''
      resultBtn.id = 'result-btn'
      resultBtn.textContent = 'Ok!';
      resultBtn.className = 'button'
      overlay.className = 'modal-overlay modal-closed';
      resultModal.className = 'result-modal modal-closed';
      resultModal.append(message, resultBtn)
      this.container.append(overlay, resultModal)
    }

    showResultMessage (passedTime){
      const message = document.getElementById('message')
      message.textContent = `Great! You have solved the nonogram in ${passedTime} seconds!`;
      document.querySelector('.modal-overlay').classList.remove('modal-closed')
      document.querySelector('.result-modal ').classList.remove('modal-closed')
      
    }
 
    hideResultMessage (){
      document.querySelector('.modal-overlay').classList.add('modal-closed')
      document.querySelector('.result-modal').classList.add('modal-closed')
    }

    showRandomGame(randomLevel, randomPattern){
      let levels = this.container.querySelector('#levels').getElementsByTagName('option');
      levels[randomLevel].selected = true;
      let level = levels[randomLevel].text;
      let itemsOptions = this.container.querySelector('#items').getElementsByTagName('option');
      itemsOptions[randomPattern].selected = true;
      let pattern = itemsOptions[randomPattern].text;
    }

     createScoreTable(){
      const overlay = document.createElement('div');
      const tableModal = document.createElement('div');
      const tableBtn = document.createElement('button');
      const title = document.createElement('h2');
      title.textContent = 'GOOD JOB!'
      
      const table = document.createElement('table');
      table.id = 'scores'
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      const th1 = document.createElement('th');
      th1.textContent = 'Pattern';
      const th2 = document.createElement('th');
      th2.textContent = 'Level';
      const th3 = document.createElement('th');
      th3.textContent = 'Time';
      tr.append(th1, th2, th3)
      thead.append(tr)
     
      const tbody = document.createElement("tbody")
      tbody.id = "scores-table"
      table.append(thead, tbody)

      tableBtn.id = 'table-btn';
      tableBtn.className = 'button'
      tableBtn.textContent = 'Ok!'
      overlay.className = 'modal-overlay modal-closed';
      tableModal.className = 'table-modal modal-closed';
      tableModal.append(title, table, tableBtn)
      this.container.append(overlay, tableModal)
    
    }

    showScoreTable (){
      document.querySelector('.modal-overlay').classList.remove('modal-closed')
      document.querySelector('.table-modal ').classList.remove('modal-closed')
    }
    
    hideScoreTable(){
      document.querySelector('.modal-overlay').classList.add('modal-closed')
      document.querySelector('.table-modal').classList.add('modal-closed')
    }
    
    fillScoresList (scoresList) {
      let count = 0
      console.log(this.container.querySelector("tbody"))
      this.container.querySelector("#scores-table").remove();

      const tbody = document.createElement("tbody")
      tbody.id = "scores-table"
     
      for(let i = 0; i < scoresList.length; i++){
        count ++
        const tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        let level = scoresList[i].level;
        let pattern = scoresList[i].pattern;
        let time = scoresList[i].time;
        let minutes = parseInt(time / 60);
        let sec  = time % 60;
    
        td1.textContent = `${count}. ${pattern}`;
        td2.textContent = `${level}`;
        td3.textContent = `${minutes}min : ${sec}sec`;
        tr.append(td1, td2, td3)
        tbody.append(tr)
        
        }
        this.container.querySelector('#scores').append(tbody)
    }
    

}