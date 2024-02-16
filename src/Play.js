import { Controller } from "./utils/Controller";
import { Model } from "./utils/Model";
import { View } from "./utils/View";

export const Play= ()=>{
  const model = new Model();
  const view = new View();
  const controller = new Controller();
  return{
    init(root){
      view.init(root);
      model.init(view);
      controller.init(root, model)
    }
  }
}
