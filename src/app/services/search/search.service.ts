import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public showForm: boolean;

  public toggle(): void {

    this.showForm = !this.showForm;

  }
}
