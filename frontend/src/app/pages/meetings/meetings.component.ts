import { Component, HostListener, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MeetingComponent } from './meeting/meeting.component'
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
  imports: [TableModule, ButtonModule]
})
export class MeetingsComponent implements OnInit {
  meetings!: MeetingComponent[];
  selectedMeeting!: MeetingComponent;
  test!: String;
  popup!: Window | null;
  popupUrl!: String;
  
  // const [getMeeting: any, setMeeting: any] = useState({
  //   date: "";
  //   name: "";
  //   happening: true;

  // });

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   });
  // }, []);

  constructor(private router: Router){

  }

  ngOnInit() {
    this.meetings = [
        {date: new Date(2023, 11, 17), name: "Codejam Prep",happened: false},
        {date: new Date(2023, 11, 16), name: "Factory Meeting", happened: true},
        {date: new Date(2023, 11, 18), name: "Win CodeJam", happened: false}
    ];
}

onRowSelect(event: any) {
  // this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  this.router.navigate(['/meetings/' + event.data.name]);
  this.test = event.data.name;
  console.log(event.data.name)
}

  addMeeting() {
    this.popup = window.open("https://www.when2meet.com/", "Set your availability");
    console.log("Opened");
    if (this.popup != null){
      console.log("HEre");
      this.popup.onbeforeunload;
    }
    this.popup?.addEventListener('beforeunload', (event: { returnValue: string; }) => {
      event.returnValue = `You have unsaved changes, leave anyway?`;
      console.log("hi");
    });
    console.log(this.popup?.onbeforeunload)
    console.log("going");

  }

//   @HostListener('window:beforeunload', ['$event'])
//   unloadHandler(event: { data: any; }) {
//     console.log("trying" + event.data);
//     this.saveURL()
// }

  saveURL(){
    if (this.popup != null){
      this.popupUrl = this.popup.location.href;
      console.log(this.popupUrl)
    }
  }
}

