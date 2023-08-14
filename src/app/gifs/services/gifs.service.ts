import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SearchResponse, Images, Gif } from '../interfaces/gifs.interfaces';


@Injectable({ providedIn: 'root' })                     // con esto nme evito tener q poner lo del providers:[] en el app.module
export class GifsService{

  public gifList: Gif[]=[];

  private _tagsHistory: string[] = [];
  private apiGiphyKey:  string = 'fK3GuR03GKgAl2S5bcDwSX813GABR5ck';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs service Ready...');
   }

  get tagsHistory(): string[]{
    return this._tagsHistory;
  }

  /**
   * Miro a ver si existe el tag, y si es así, lo borro y lo inserto al inicio. Limito a 10 los elementos
   * @param tag
   */
  private organizeHistory( tag: string ){
    tag = tag.toLowerCase();
    if ( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag != tag);
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice( 0 ,10 );
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if (!localStorage.getItem('history')){    // esto es para ver si existe esa entrada en las cookies
      return;
    }
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);     // la admiracion se pone para decirle q siempre va a venir data, q nunca va a ser null

    if (this._tagsHistory.length === 0){return};
    this.searchTag(this._tagsHistory[0]);   // así cargo los gifs del primero q está en la lista

  }

  public searchTag( tag: string ): void{
    if ( tag.length === 0 ){                              // si la longitud de lo q me escribe es 0, no lo añado a la lista
       return
     }
     this.organizeHistory( tag );

     const params = new HttpParams()
      .set('api_key', this.apiGiphyKey)
      .set('limit', 10)
      .set('q', tag);

     this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;

        // console.log( {gifs: this.gifList} );
      } );

     // esta sería la forma de hacerlo en Javascript
    //  const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=fK3GuR03GKgAl2S5bcDwSX813GABR5ck&q=valorant&limit=10');
    //  const data = await resp.json();
    //  console.log(data);



    // this._tagsHistory.unshift( tag );
    // console.log(this.tagsHistory);
  }

}
