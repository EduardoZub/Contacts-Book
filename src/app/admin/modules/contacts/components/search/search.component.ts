import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() title: string = 'Search';
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  public value: string = '';

  constructor() { }

  public applySearchField(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(this.value);
  }

  public onClearSearchField(): void {
    this.value = '';
    this.searchChanged.emit(this.value);
  }

}
