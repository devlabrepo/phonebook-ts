import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  counterElement: number = 0;

  constructor() { }

  ngOnInit() {
  }

  createElement(event) {

    console.log(event);

    let posX = event.layerX;
    let posY = event.layerY;
    let newDiv = document.createElement("div");

    newDiv.setAttribute("id", "block" + this.counterElement);
    newDiv.setAttribute("draggable", "true");
    newDiv.setAttribute("name", "block");
    newDiv.style.setProperty("border-radius", "10px");
    newDiv.style.setProperty("position", "absolute");
    newDiv.style.setProperty("width", 10 + "px");
    newDiv.style.setProperty("height", 10 + "px");
    newDiv.style.setProperty("left", (posX - 5) + "px");
    newDiv.style.setProperty("top", (posY - 5) + "px");
    newDiv.style.setProperty("background-color", "rgb(184, 180, 180)");
    newDiv.style.setProperty("z-index", "3");
    document.getElementById("board").appendChild(newDiv);

    this.counterElement++;
 
  
  }

  getOffsetElement(event) {
    let rect = document.getElementById(event.target.id).getBoundingClientRect();
    console.log(rect.left + window.scrollX, rect.right + window.scrollY);
    return {
      left: rect.left + window.scrollX,
      top: rect.right + window.scrollY
    };
  }

}
