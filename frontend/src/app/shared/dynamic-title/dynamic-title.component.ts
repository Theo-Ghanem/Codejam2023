import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-dynamic-title',
  templateUrl: './dynamic-title.component.html',
  styleUrls: ['./dynamic-title.component.css'],
  imports:[
    InputTextModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})


export class DynamicTitleComponent{
  title = "Title";
  showInput = false;

  onSubmit(valueString: any){
    if(valueString){
      this.title = valueString.target.value;
      this.showInput = false;
    }
  }

  showTitleInput(){
    this.showInput = true;
  }
}
