import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TimelineModule } from 'primeng/timeline';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

import { InplaceModule } from 'primeng/inplace';
import { AssignmentItem } from '../../model/assignment-topic';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    InputTextModule,
    FormsModule,
    InplaceModule,
    MenuModule,
    FileUploadModule, CardModule, DropdownModule, TimelineModule, InputTextModule, DividerModule, AccordionModule, ButtonModule, CheckboxModule, DialogModule
  ],
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
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
export class AssignmentComponent implements OnInit{
  topics: AssignmentItem[] = [];
  topicsNoAdd: AssignmentItem[] = [];
  completedColor: string = '#34a224';
  incompleteColor: string = '#FF9800';
  showPopup: boolean = false;
  grade:number = 0;
  weight:number = 0;
  showProgress: boolean = false;
  showPopupAssignees:boolean = false;
  showAddAssignees:boolean = false;
  newAssignee:any = "";
  topicProgress:number = 0;
  editModeOn:boolean = false;
  selectedTopic: AssignmentItem = new AssignmentItem();
  title:string = "Title";
  showInput:boolean = false;
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

  ngOnInit(): void {
    this.topics = [
      { title: 'Topic 1', icon: 'pi pi-book', completed: false, assignees:[]},
      { title: 'Topic 2', icon: 'pi pi-book', completed: false, assignees:[]},
      { title: 'Topic 3', icon: 'pi pi-book', completed: false, assignees:[]},
      { title: 'Topic 4', icon: 'pi pi-book', completed: false, assignees:[]},
      { title: 'Add' , icon: 'pi pi-plus',  completed: true}
    ];
    this.topicsNoAdd = this.topics.filter(item => item.title!=='Add');
  }

  addTopic(topic: AssignmentItem) {
    if (topic.title == 'Add') {
      this.topics.splice(this.topics.length - 1, 0, { title: 'Topic ' + this.topics.length, icon: 'pi pi-book', completed: false});
      this.topicsNoAdd.splice(this.topics.length - 1, 0, { title: 'Topic ' + this.topics.length, icon: 'pi pi-book', completed: false});
      this.updateProgress();
    }
  }

  openEditMenu(event: any, menu: any) {
    event.stopPropagation();
    menu.toggle(event);
  }

  removeTopic(topic: AssignmentItem) {
    if (topic.title != 'Add') {
      this.topics.splice(this.topics.indexOf(topic), 1);
      this.topicsNoAdd.splice(this.topicsNoAdd.indexOf(topic), 1);
      this.updateProgress();
    }
  }

  showNotes(topic: AssignmentItem) {
    this.showPopup = true;
    this.selectedTopic = topic;
  }

  showAssignees(topic: AssignmentItem) {
    this.showPopupAssignees = true;
    this.selectedTopic = topic;
  }

  addAssignee() {
    if(this.newAssignee){
      this.selectedTopic.assignees?.push(this.newAssignee);
      this.showAddAssignees = false;
      this.newAssignee="";
      this.selectedTopic= new AssignmentItem();
    }
  }

  removeAssignee() {
    if(this.newAssignee){
      const index = this.selectedTopic.assignees.indexOf(this.newAssignee, 0);
      if (index > -1) {
        this.selectedTopic.assignees = this.selectedTopic.assignees.splice((index+1), 1);
        this.newAssignee="";
     }
    }
  }

  updateProgress(){
    let completedTopic:number = 0;
    for (let t of this.topics) {
      if(t.completed && t.title !== 'Add'){
        completedTopic++;
      }
    }
    this.topicProgress = Math.round(100 * (completedTopic/this.topicsNoAdd.length));
  }

  onUpload(event: FileUploadHandlerEvent) {

  }

  onSubmit(valueString: any){
    if(valueString){
      this.title = valueString.target.value;
      this.showInput = false;
    }
  }

  showTitleInput(){
    this.showInput = true;
  }

  saveGrade(){

  }
}
