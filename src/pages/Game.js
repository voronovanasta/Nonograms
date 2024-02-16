import { Play } from "../Play";
const Game = () => {
  const content = document.getElementById('content');
  Play().init(content)
};

export default Game;
