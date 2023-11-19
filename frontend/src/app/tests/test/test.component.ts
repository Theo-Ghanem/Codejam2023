import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {FileUploadHandlerEvent, FileUploadModule} from "primeng/fileupload";
import {CardModule} from "primeng/card";
import {TimelineModule} from "primeng/timeline";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {AccordionModule} from "primeng/accordion";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import { TopicItem } from 'app/model/topic-item';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FileUploadModule, MenuModule, CardModule, TimelineModule, FormsModule, InputTextModule, DividerModule, AccordionModule, ButtonModule, CheckboxModule, DialogModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('timelineAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, height: '0px' }), // New elements start from transparent and 0 height
          stagger('50ms', animate('300ms ease-out', style({ opacity: 1, height: '*' }))) // Animate to full opacity and variable height
        ], { optional: true }),
        query(':leave', animate('300ms ease-in', style({ opacity: 0, height: 0 })), { optional: true }) // If you need to handle removals
      ])
    ])
  ]
})
export class TestComponent implements OnInit{
  topics: TopicItem[] = [];
  grade: number = 50;
  weight: number = 50;
  completedColor: string = '#34a224';
  incompleteColor: string = '#FF9800';
  showPopup: boolean = false;
  editModeOn:boolean = false;
  selectedTopic: TopicItem = new TopicItem();
  editMenu: MenuItem[] = [
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
            this.editModeOn = true;
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            this.removeTopic(this.selectedTopic);
        }
    }
];

  ngOnInit() {
    this.topics = [
      { title: 'Lecture 1', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 2', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 3', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 4', icon: 'pi pi-book', completed: false},
      { title: 'Add', icon: 'pi pi-plus', completed: true}
    ];
  }

  addTopic(topic: TopicItem) {
    if (topic.title == 'Add') {
      this.topics.splice(this.topics.length - 1, 0, { title: 'Lecture ' + this.topics.length, icon: 'pi pi-book', completed: false});
    }
  }

  removeTopic(topic: TopicItem) {
    if (topic.title != 'Add') {
      this.topics.splice(this.topics.indexOf(topic), 1);
    }
  }

  showNotes(topic: TopicItem) {
    this.showPopup = true;
    this.selectedTopic = topic;
  }

  onUpload(event: FileUploadHandlerEvent) {
    this.selectedTopic.file = event.files[0];
  }

  openEditMenu(event: any, menu: any) {
    event.stopPropagation();
    menu.toggle(event);
  }
}
