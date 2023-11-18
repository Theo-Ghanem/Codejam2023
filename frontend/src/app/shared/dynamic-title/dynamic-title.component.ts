import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-dynamic-title',
  templateUrl: './dynamic-title.component.html',
  styleUrls: ['./dynamic-title.component.css'],
  imports:[
    InputTextModule,
    FormsModule,
    CommonModule
  ]
})
export class DynamicTitleComponent {
    title = "Title";
    showInput = false;

    changeTitleInput(){
      this.showInput = true;
    }

    onEnter(value: string) {
      this.title = value;
    }
}
