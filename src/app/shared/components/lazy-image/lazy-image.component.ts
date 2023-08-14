import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit{

  @Input()
  public urlPasada!: string;

  @Input()
  public altPasada: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if ( !this.urlPasada ){
      throw new Error('URL property is required.');
    }
  }

  public onLoad(){
    console.log('Image loaded');
    this.hasLoaded = true;
  }
}
