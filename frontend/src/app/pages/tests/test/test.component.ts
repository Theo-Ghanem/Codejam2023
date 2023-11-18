import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadEvent, FileUploadModule} from "primeng/fileupload";
import {CardModule} from "primeng/card";
import {TimelineModule} from "primeng/timeline";
import {EventItem} from '../../../model/event-item';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FileUploadModule, CardModule, TimelineModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  events: EventItem[] = [];
  ngOnInit() {
    this.events = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
  }

  onUpload(event: FileUploadEvent) {

  }


}
