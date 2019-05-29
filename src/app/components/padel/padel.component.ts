import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-padel',
  templateUrl: './padel.component.html',
  styleUrls: ['./padel.component.css']
})
export class PadelComponent implements OnInit {

  resevasPadel: any[] = [];
  horas: number[] = [9, 10, 11, 12, 13, 14, 15, 16 , 17, 18, 19, 20, 21, 22];

  constructor() { }

  ngOnInit() {
  }

}
