import { getPattern } from "./getPattern";
export class Controller {
    constructor(){
        this.container = null
        this.model = null
    }

    init (container, model) {
        this.container = container;
        this.model = model;
        this.field = this.container.querySelector('#field')
        this.eventHandler();
        this.burgerHandler();
        this.root = document.querySelector('#root')

    }


    eventHandler() {
        // themeMode.addEventListener('click', (e)=>{
        //     e.preventDefault();
        //     this.model.darkThemeOn();
        // })
        // mute.addEventListener('click', (e)=>{
        //     e.preventDefault();
        //     this.model.updateMute();

        // })
        this.container.querySelector('#field').addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
             return false;
        });
  

        this.container.querySelector('#field').addEventListener("mouseup", (e) => {
           this.model.updateClickCount();
           this.model.fillCell(e);
           let levelIndex = this.container.querySelector("#levels").options.selectedIndex;
            this.model.levelNumber = levelIndex
            let patternIndex = this.container.querySelector('#items').options.selectedIndex;
            let patternName = this.container.querySelector('#items').options[patternIndex].text;
            this.model.patterName = patternName
           this.model.checkWinCondition();
        })

        this.container.addEventListener("click", (e) => {
            switch (e.target.id) {
              case "solution":
                this.container.querySelector('#save').setAttribute('disabled', 'disabled')
                this.model.clickCount = 0;
                this.model.drawSolution();
                this.model.stopTimer();
                this.model.resetTimer();
                this.container.querySelector('#field').classList.add('disable-click')
                break;
                case "settings":
                    e.preventDefault()
                    this.model.showSettings();
                break;
                case "ok-btn" :
                    this.model.hideSettings();
                break;
              case "save":
                this.field.classList.add('disable-click');
                this.model.saveGame();
                break;
              case "load":
                this.field.classList.remove('disable-click');
                this.model.checkSavedGame()
                this.model.downloadSavedGame();
                this.model.updateClickCount()
                break;
              case "reset":
                this.container.querySelector('#save').removeAttribute('disabled')
                this.field.classList.remove('disable-click')
                this.model.resetGame();
                this.model.clickCount = 0;
                this.model.patternCellsCount = 0;
                break;
                case "result-btn":
                    e.preventDefault()
                    this.model.hideResultMessage();
                    this.model.resetTimer();
                break;
              case "random":
                this.model.clickCount = 0;
                this.field.classList.remove('disable-click')
                this.model.randomGame();
                break;
              case "table":
                    e.preventDefault();
                    this.model.loadScoreTable();
                   this.model.showScoreTable();
                break;
              case 'table-btn':
                    this.model.hideScoreTable();
                    this.model.resetTimer();
                break;
             case 'theme-mode':
                e.preventDefault();
                this.model.darkThemeOn();
            }
        });

        this.container.addEventListener('change',(e)=>{
            switch(e.target.id){
                case "levels":
                    let levelIndex = e.target.options.selectedIndex;
                    let levelName = e.target.options[levelIndex].text;
                    this.model.updateItemsSelect(levelIndex);
                    let patternIndex = this.container.querySelector('#items').options.selectedIndex;
                    let patternName = this.container.querySelector('#items').options[patternIndex].text;
                    let selectedPattern = getPattern(levelName, patternIndex);
                    this.model.updateModel(selectedPattern, levelIndex, patternName);
                    this.model.resetTimer();
                break;
                case "items":{
                    let levelIndex = this.container.querySelector("#levels").options.selectedIndex;
                    let levelName = this.container.querySelector("#levels").options[levelIndex].text;
                    let patternIndex = e.target.options.selectedIndex;
                    let patternName = e.target.options[patternIndex].text;
                    let selectedPattern = getPattern(levelName, patternIndex);
                    this.model.updateModel(selectedPattern, levelIndex, patternName);
                    this.model.resetTimer();
                }
                break;
                       
            }
        })
    }

    burgerHandler() {
        const menu = this.container.querySelector('.menu');
        document.querySelector('#root').addEventListener('click',(e)=>{
            console.log(e.target);
            e.preventDefault()
            switch(e.target.id){
                case "burger":
          menu.classList.add('menu_active');
          document.querySelector('.close_nav').classList.add('nav_close-open');
          document.querySelector('#popup').classList.add('popup-transparent');
                break;
                case 'close':
                    menu.classList.remove('menu_active');
                    document.querySelector('#burger').classList.remove('header_burger-hide')
                    document.querySelector('.close_nav').classList.remove('nav_close-open');
            break;
                case 'popup':
                    menu.classList.remove('nav_active');
                    document.querySelector('#popup').classList.remove('popup-transparent');
            break;

            }
        }
        )
       }

}