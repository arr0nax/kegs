import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="fullKegs">Full Kegs</option>
    <option value="emptyKegs">Empty Kegs</option>
    <option value="allKegs">All Kegs</option>
  </select>
  <div *ngFor="let keg of kegs | fullness:filterByFullness">
  <ul (click)="selectKeg(keg)">
    <li> Name: {{keg.name}} </li>
    <li>Brand: {{keg.brand}} </li>
    <li [class]='cost(keg)'>Price: {{keg.price}} </li>
    <li [class]='strength(keg)'>alcoholContent: {{keg.alcoholContent}}</li>
    <li [class]='runningOut(keg)'>pints left: {{keg.pints}}</li>
  </ul>
  <button (click)="soldPint(keg)">sold a pint!</button>
  </div>
  `
})

export class KegListComponent {
  @Input() kegs: Keg[];
  @Output() clickSender = new EventEmitter();

  filterByFullness: string = "fullKegs";

  selectKeg(keg: Keg) {
    this.clickSender.emit(keg);
  }


  onChange(option){
    this.filterByFullness = option;

  strength(keg) {
    var ac = parseInt(keg.alcoholContent);
    if(ac > 5.5) {
      return 'bg-success';
    } else {
      return 'bg-danger';
    }
  }

  cost(keg) {
    var cost = parseInt(keg.price.replace(/\D/g,''));
    console.log(cost);
    if(cost <= 150) {
      return 'bg-success';
    } else {
      return 'bg-danger';
    }
  }

  soldPint(keg: Keg) {
    keg.pints = keg.pints-1;
  }

  runningOut(keg) {
    if(keg.pints < 11) {
      return 'bg-danger';
    } else {
      return '';
    }
  }

}
