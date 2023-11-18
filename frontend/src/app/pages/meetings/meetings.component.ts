import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MeetingComponent } from './meeting/meeting.component';

@Component({
  standalone: true,
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
  imports: [TableModule]
})
export class MeetingsComponent implements OnInit {
  meetings!: MeetingComponent[];

  ngOnInit() {
    this.meetings = [
        {date: 'TODAY', happened: false},
        {date: 'YESTERDAY', happened: true},
        {date: 'TOMORROS', happened: false}
    ];
}
}
