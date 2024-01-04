import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './select-autocomplete.component.html',
  styleUrl: './select-autocomplete.component.css'
})
export class SelectAutocompleteComponent {
  @Input({required: true}) items!: any[];
  @Input({required: true}) filterBy!: string;
  @Input({required: true}) title!: string;
  @Input({required: true}) shouldReset!: boolean;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('optionsList') optionsList!: ElementRef<HTMLDivElement>;
  @ViewChild('autoComplete') autoComplete!: ElementRef<HTMLDivElement>;

  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  faTimesCircle = faTimesCircle;

  visible = false;
  selected = 0;
  selectedItem = null;
  itemHeight = 39;
  query = '';

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
     if (this.autoComplete && !this.autoComplete.nativeElement.contains(event.target)) {
      this.visible = false;
     }
  }

  matches(): any[]{
    this.changeEvent.emit(this.query);
    if(this.query == ''){
        return this.items;
    }
    let a = this.items.filter((item) => item[this.filterBy].toLowerCase().includes(this.query.toLowerCase()));
    return a;
  };

  toggleVisible() {
    this.visible = !this.visible;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  itemClicked(index: number) {
    this.selected = index;
    this.selectItem();
  }

  selectItem() {
      if (!this.matches().length) {
        return;
      }
      this.selectedItem = this.matches()[this.selected];
      this.visible = false;
      this.selectedEvent.emit(this.selectedItem);
      if (this.shouldReset) {
        this.query = '';
        this.selected = 0;
        this.selectedItem = null;
      }
  }

  up() {
    if (this.selected == 0) {
      return;
    }
    this.selected -= 1;
    this.scrollToItem();
  }

  down() {
    if (this.selected > this.matches().length - 2) {
      return;
    }
    this.selected += 1;
    this.scrollToItem();
  }

  keyDownChange(event: any){
    switch(event.key){
      case "ArrowDown":
        this.down();
        break;
      case "ArrowUp":
        this.up();
        break;
      case "Enter":
        this.selectItem();
        break;
    }
  }

  scrollToItem() {
    this.optionsList.nativeElement.scrollTop = this.selected * this.itemHeight;
  }

  resetSelectedItem(){
    this.selectedItem = null;
  }
}
