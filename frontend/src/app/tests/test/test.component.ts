import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {FileSendEvent, FileUploadHandlerEvent, FileUploadModule} from "primeng/fileupload";
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
import { GradedItem } from 'app/model/graded-item';
import { ApiService } from 'app/services/api.service';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ActivatedRoute, Route } from '@angular/router';
import { ScrollerModule } from 'primeng/scroller';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FileUploadModule, CardModule, CalendarModule, TimelineModule, NgFor, FormsModule, MenuModule, InputTextModule, DividerModule, AccordionModule, ButtonModule, CheckboxModule, DialogModule, ProgressSpinnerModule],
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
  completedColor: string = '#34a224';
  incompleteColor: string = '#FF9800';
  showPopup: boolean = false;
  selectedTopic: TopicItem = new TopicItem();
  editModeOn:boolean = false;
  gradedItem: GradedItem = new GradedItem();
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
  grades: number[] = [];
  grade?: number = 50;
  weight?: number = 50;
  uploadedFiles: string[] = []
  // grade = this.grades[0];
  // weight = this.grades[1];
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getGrade().subscribe((data: GradedItem) => {
      console.log(data);
      this.grade = data.grade;
      this.weight = data.weight;
    });

    this.topics = [
      { title: 'Lecture 1', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 2', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 3', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 4', icon: 'pi pi-book', completed: false},
      { title: 'Add', icon: 'pi pi-plus', completed: true}
    ];
    this.route.params.subscribe(params => {
      this.apiService.getItems(null).then((data: any) => {
       this.gradedItem = data.find((item: any) => item.id == params.id);
   });
 });
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
    console.log("filenaem is " + topic.file);
    this.apiService.getQuestions(topic.file).then((data: any) => {
      console.log(data);
      topic.notes = data['questions'];
    });
    this.showPopup = true;
    this.selectedTopic = topic;
  }

  onUpload(event: FileSendEvent, topic: TopicItem) {
    console.log("i am here" + topic.title);
    const item = event.formData.get('demo[]')
    if (item instanceof File){
      topic.file = item.name;
    }
    console.log(topic.file);
  }

  openEditMenu(event: any, menu: any) {
    event.stopPropagation();
    menu.toggle(event);
  }

  saveGrade() {

  }

  saveInfo(){

  }
  
}
