import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html'
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  //si no pongo la admiracion me da error pq puede ser nulo, con la ! le aseguro q siempre va a tener un valor


  constructor( private gifsService: GifsService ) { }

  // searchTag( newTag: string ): void {
  public searchTag(): void {

    const newTag = this.tagInput.nativeElement.value;

    // console.log( {newTag} );

    this.gifsService.searchTag( newTag );

    this.tagInput.nativeElement.value = '';
  }

}
