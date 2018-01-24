import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit {


  answer="";

  
  constructor() { }


  addAnswer() :void {

    if(this.answer) {
      console.log(this.answer);
    }

  }

  ngOnInit() {
  }

}
