import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) { }

  public get tagHistory(): string[]{
    return this.gifsService.tagsHistory;
  }

  public searchTag(tag: string): void{
    this.gifsService.searchTag(tag);
  }

  // public arrayGifs: string[] = this.gifsService.tagsHistory;

}