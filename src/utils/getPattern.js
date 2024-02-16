 import { HARD } from "./hard";
 import { MIDDLE } from "./middle";
 import { LIGHT } from "./light";

 export function getPattern(levelName, patternNumber) {
  console.log(levelName)
  console.log(patternNumber)
   switch (levelName){
    case "light": return LIGHT[patternNumber].matrix;
    case "middle": return MIDDLE[patternNumber].matrix;
    case "hard": return HARD[patternNumber].matrix;
   }
}
