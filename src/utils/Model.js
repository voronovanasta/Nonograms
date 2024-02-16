import { Config } from "./gameConfig";
import { getPattern } from "./getPattern";
import { get,set,ref} from "firebase/database";
import { db } from "../Firebase";
const levelsArr = ['light', 'middle', 'hard'];
const patternArr =[
    ['tree', 'rhombus', 'ruLetterD', 'dinosour', 'fan'],
    ['snowman', 'turnip', 'cat', 'kettle', 'plum'],
    ['coffee', 'elephant', 'lion', 'candle', 'frog']
  ];


export class Model {
constructor(){
this.view = null
this.patternCellsCount = 0;
this.idTimer = null;
this.sec = 0;
this.minutes = 0;
this.clickCount = 0;
this.highScoreTable = [];
this.cells = [];
this.levelNumber = 0;
this.pattern = null;
this.patternNumber = 0;
this.patterName = 'tree'
this.isMute = false;
    }

    init (view) {
    this.view = view;
    this.updatePattern();
    this.view.checkMute()
    
    this.view.createFieldCanvas();
    this.view.updateCanvasSettings(this.levelNumber)
    this.defineCells();
    this.darkThemeOn()
    this.drawField()
    //this.view.switchTheme()
    this.view.drawLeftClues(this.calculateClues().leftClues, levelsArr[this.levelNumber])
    this.view.drawTopClues(this.calculateClues().topClues, levelsArr[this.levelNumber])
    this.view.createTimer(this.minutes, this.sec)
    this.updateConfig();
    this.createSettings();
    this.calculateWinCondition();
    this.view.createResultMessage();
    this.view.createScoreTable();
    
   
    }


    defineCells() {
      this.cells = []
      console.log(this.pattern);
      console.log(Config.fieldRowCount)
      for (let r = 0; r < this.pattern.length; r++) {
        this.cells[r] = [];
        for (let c = 0; c < this.pattern.length; c++) {
          this.cells[r][c] = {
            x: 0,
            y: 0,
            value: this.pattern[r][c],
            isPainted: false,
            isCrossed: false,
          };
        }
      }
      console.log(this.cells)
    }

    drawField (){
      for (let r = 0; r < this.pattern.length; r++) {
        for (let c = 0; c < this.pattern.length; c++) {
          const cellX = c * (Config.cellWidth) + 0.5;
          const cellY = r * (Config.cellHeight) + 0.5;
          this.cells[r][c].x = cellX;
          this.cells[r][c].y = cellY;
        }
      }
      this.view.drawField()
    }

    calculateClues() {
         let leftClues = [];
         let topClues = [];
       
         for (let r = 0; r < this.pattern.length; r++) {
           let leftClueCount = 0;
           let subarr = [];
           for (let c = 0; c < this.pattern[r].length; c++) {
             leftClueCount += this.pattern[r][c];
             if (this.pattern[r][c] === 0 && leftClueCount > 0) {
               subarr.push(leftClueCount);
               leftClueCount = 0;
             }
             if (this.pattern[r].length - 1 === c && leftClueCount > 0) {
               subarr.push(leftClueCount);
             }
           }
           leftClues.push(subarr);
         }
       
         for (let c = 0; c < Config.fieldColumnCount; c++) {
           let topClueCount = 0;
           let subarr = [];
           for (let r = 0; r < this.pattern.length; r++) {
             topClueCount += this.pattern[r][c];
             if (this.pattern[r][c] === 0 && topClueCount > 0) {
               subarr.push(topClueCount);
               topClueCount = 0;
             }
             if (this.pattern.length - 1 === r && topClueCount > 0) {
               subarr.push(topClueCount);
             }
           }
           topClues.push(subarr);
         }
       
         return {
           leftClues: leftClues,
           topClues: topClues,
         };
       }

    calculateWinCondition (){
        let correctFilledCells = 0;
        for(let i = 0; i < this.cells.length; i++){
          for(let j = 0; j < this.cells[i].length; j++){
              if(this.cells[i][j].value == 1) {
                correctFilledCells++;
              }
            }
          }
      return correctFilledCells;
      }

    resetGame(){
        this.view.resetGame(this.cells)
        this.stopTimer();
        this.resetTimer()
      }

    updateMute(){
      if(this.isMute){
          this.isMute = false
      }
      else{
          this.isMute = true;
      }
      this.view.updateConfig()
      this.view.checkMute(this.isMute)
  }

    updateConfig (){
     
        Config.level = this.levelNumber;
        Config.pattern = this.item;
        Config.primeColor = this.primeColor;
        Config.fillColor = this.fillColor;
        Config.cells = this.cells;
        Config.mute = this.mute;
        this.view.updateConfig()
    }

    updatePattern(){
      this.pattern = getPattern(levelsArr[this.levelNumber], this.patternNumber)

    }

    darkThemeOn(){
      if(localStorage.getItem('theme') === 'night') {
          localStorage.removeItem('theme'); 
          this.view.primeColor = "#000000";
          this.view.fillColor = "#000000";
          this.updateConfig();
          this.view.switchTheme()

       }
       else {
         localStorage.setItem('theme', 'night');
         this.view.primeColor = '#DCDCDC';
         this.view.fillColor = '#DCDCDC';
         this.updateConfig()
         this.view.switchTheme()
       }
      
       
  }
  
  createSettings(){
    this.view.createSettings(this.levelNumber);
  }

  showSettings(){
    console.log('modal')
    this.view.showSettings();
  }

  hideSettings(){
    this.view.hideSettings()
  }

  drawSolution(){
    this.resetGame()
    this.view.drawSolution(this.cells)
  }
  
  startTimer (){
    if(this.sec === 60){
     this.minutes++;
     this.sec = 0;
    }
   this.view.showTimer(this.sec, this.minutes)
    this.sec++;
    this.idTimer = setTimeout(()=>{this.startTimer()}, 1000);
  }
  
  stopTimer(){
    clearTimeout(this.idTimer);
  }
  
  resetTimer (){
    this.minutes = 0;
    this.sec = 0;
    this.view.showTimer(this.sec, this.minutes)
  }

  saveGame() {
    const savedGame = {
      'timerState': null,
      'level': null,
      'levelName': levelsArr[this.levelNumber],
      'patternNumber': null,
      'paintedCells': null,
      'patternCellsCount':null,
    }

    let level = levelsArr[this.levelNumber];
    let passedTime = this.minutes * 60 + this.sec;
    savedGame.timerState = passedTime;
    savedGame.level = level;
    savedGame.pattern = this.patternNumber;
    savedGame.paintedCells = this.cells;
    savedGame.patternCellsCount = this.patternCellsCount;
    savedGame.patternNumber = this.patternNumber;


    const refDb = ref(db, 'users/' +  Config.userId + "/" + `savedGame`);
    set(refDb, savedGame);
    console.log(savedGame)
  }

 checkSavedGame (){
 const savedGame = ref(db, 'users/' +  Config.userId + "/" + `savedGame`);
 get(savedGame).then((snapshot) => {
   const data = snapshot.val();
   console.log(data);
   this.downloadSavedGame(data);
 });
}

  downloadSavedGame (data){
    if(data){
      this.patternCellsCount = data.patternCellsCount;
      let levelName = data.levelName;
      this.levelNumber = levelsArr.indexOf(levelName);
      this.patternNumber = data.patternNumber;
      this.patterName = patternArr[this.levelNumber][this.patternNumber]
      let savedCells = data.paintedCells;
      this.pattern = getPattern(levelName, this.patternNumber);
      this.minutes = parseInt(data.timerState / 60);
      this.sec  = data.timerState % 60;
      this.view.updateSelectedLevel(levelName);
      this.view.updateItemsSelect(patternArr[this.levelNumber]);
      this.view.updateSelectedItem(this.patterName)

      this.view.updateCanvasSettings(this.levelNumber);
      this.updateModel(this.pattern, this.levelNumber);

      for (let r = 0; r < this.pattern.length; r++) {
        for (let c = 0; c < this.pattern.length; c++) {
          if (savedCells[r][c].isPainted) {
            this.cells[r][c].isPainted = true
          }
          else if(savedCells[r][c].isCrossed){
            this.cells[r][c].isCrossed = true;
          }
        }
      }
      this.view.drawSavedGame(savedCells)
    }
  }

  updateClickCount () {
    if(this.clickCount === 0){
      this.startTimer()
      this.clickCount = 1;
    }
  }

  updateModel (selectedPattern, levelIndex, patternName){
   // canvas.classList.remove('disable-click')
   this.pattern = selectedPattern;
   this.levelNumber =levelIndex;
   this.patterName = patternName;
   this.updateConfig();
   this.view.updateCanvasSettings(this.levelNumber)
    this.defineCells();
    this.calculateClues();
    this.drawField();
   
    this.view.drawLeftClues(this.calculateClues().leftClues, levelsArr[this.levelNumber])
    this.view.drawTopClues(this.calculateClues().topClues, levelsArr[this.levelNumber])
    this.calculateWinCondition();
  }

  fillCell(e){
    let button = e.button;
    this.view.fillCell(e, this.cells);
    for (let r = 0; r < this.cells.length; r++) {
      for (let c = 0; c < this.cells[r].length; c++) {
        let clientX = e.clientX - Config.canvas.offsetLeft;
        let clientY = e.clientY - Config.canvas.offsetTop;

        if (
          clientX > this.cells[r][c].x &&
          clientX < this.cells[r][c].x + Config.cellWidth &&
          clientY > this.cells[r][c].y &&
          clientY < this.cells[r][c].y + Config.cellHeight
        ) {
          if (!this.cells[r][c].isPainted && button === 0) {
            this.cells[r][c].isPainted = true;

            if(this.cells[r][c].value === 1) {
              this.patternCellsCount++
            }
            else{
              this.patternCellsCount--;
            }
          } else if (this.cells[r][c].isPainted && button === 0) {

            this.cells[r][c].isPainted = false;
             if(this.cells[r][c].value === 1) {
              this.patternCellsCount--
            }
            else{
              this.patternCellsCount++;
            }
          } else if (!this.cells[r][c].isCrossed && button === 2) {

             if(this.cells[r][c].value === 1 && this.cells[r][c].isPainted) {
              this.patternCellsCount--;
            };
            this.cells[r][c].isCrossed = true;
            this.cells[r][c].isPainted = false;
          } else if (this.cells[r][c].isCrossed && button === 2) {
            this.cells[r][c].isCrossed = false;
          }
        }
      }
    }

  }

  checkWinCondition (){
    if(this.patternCellsCount === this.calculateWinCondition()) {
      this.stopTimer();
      this.patternCellsCount = 0;
      this.clickCount = 0;
      this.showResultMessage();

      let level = levelsArr[this.levelNumber];
      let passedTime = this.minutes * 60 + this.sec;
      console.log(this.patterName)
      this.updateScoreTable(passedTime, level, this.patterName)
    }
  }
  showResultMessage (){
    let passedTime = this.minutes * 60 + this.sec;
    this.view.showResultMessage(passedTime - 1)
  }

  hideResultMessage (){
    this.view.hideResultMessage()
  }

  updateItemsSelect(levelIndex){
    this.levelNumber = levelIndex;
    this.view.updateCanvasSettings(this.levelNumber);
    this.updateConfig()
    let patternArrOfLevel = patternArr[levelIndex];
    this.view.updateItemsSelect(patternArrOfLevel)
  }

   getRandomNum(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNum =  Math.floor(Math.random() * (max - min + 1)) + min; 
    return randomNum;
   }
  
   randomGame(){ 
    let randomLevel = this.getRandomNum(0, 2);
    let randomPattern = this.getRandomNum(0, 4);
    let patternName = patternArr[randomPattern]

    this.view.showRandomGame(randomLevel, randomPattern)
    this.view.updateItemsSelect(patternArr[randomLevel])
    this.view.updateCanvasSettings(randomLevel);

    let selectedPatternArr = getPattern(levelsArr[randomLevel], randomPattern);
    this.updateModel(selectedPatternArr, randomLevel, patternName);
    this.stopTimer();
    this.resetTimer()
  }

  hideScoreTable (){
    this.view.hideScoreTable()
  }

  showScoreTable(){
    this.view.showScoreTable()
  }

  updateScoreTable (time, level, pattern){
    const scoreData = {
      'time': time,
      'level': level,
      'pattern': pattern,
    }
    const refDb = ref(db, 'users/' +  Config.userId + "/" + 'list/' + `${time}`);
    set(refDb, scoreData);
   }

  loadScoreTable (){
   const scoresList = ref(db, 'users/' +  Config.userId + "/" + 'list/');
   get(scoresList).then((snapshot) => {
     const data = snapshot.val();
     console.log(data)
     this.getScoreTable(data);
   });
 }

  getScoreTable(data){
    if(data){
      let scoresList = Object.values(data)
      scoresList.sort((a, b) => a.time - b.time);
        this.view.fillScoresList(scoresList);
    }
    else {
      alert("Sorry, there are no records about your wins so far. It seems you haven't played yet! Don't miss your chance!!!")
    }
   
   }


}