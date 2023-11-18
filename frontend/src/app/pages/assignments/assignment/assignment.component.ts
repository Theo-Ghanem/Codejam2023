import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTitleComponent } from 'src/app/shared/dynamic-title/dynamic-title.component';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    CommonModule,
    DynamicTitleComponent,
    NgIf,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],

})
export class AssignmentComponent {

}
