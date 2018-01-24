import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seating-order',
  inputs: ['childMessage'],
  template: `
<div>{{childMessage}}</div>
  `,
  //templateUrl: './seating-order.component.html',
  styleUrls: ['./seating-order.component.scss']
})


export class SeatingOrderComponent implements OnInit {

  //@Input() childMessage: string;

  constructor() { }

  ngOnInit() {
  }




  

}
