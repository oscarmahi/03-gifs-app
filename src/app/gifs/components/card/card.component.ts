import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit{

  @Input()
  public gif!: Gif;   // se pone la admiracion para indicarle q nunca va a ser null y no de error

  constructor() { }

  ngOnInit(): void {
    // if ( this.gif === null ) throw new Error('Method not implemented.');
    if ( !this.gif ) throw new Error('Method not implemented.');
  }


}
