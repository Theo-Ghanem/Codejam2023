import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {
  date!: Date;
  name!: String;
  happened!: boolean;


  // ngOnInit(){

  // }

  // openNew() {
  //   this.date = "today";
  //   this.happened = false;
  // }



}
