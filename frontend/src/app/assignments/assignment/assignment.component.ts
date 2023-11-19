import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSendEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TimelineModule } from 'primeng/timeline';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import { CalendarModule } from 'primeng/calendar';
import { InplaceModule } from 'primeng/inplace';
import { AssignmentItem } from '../../model/assignment-topic';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { GradedItem } from 'app/model/graded-item';
import { Course } from 'app/model/course';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ApiService } from 'app/services/api.service';


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
    FileUploadModule,
    CardModule, DropdownModule,
    TimelineModule,
    InputTextModule,
    DividerModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    CalendarModule, ProgressSpinnerModule
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
  showPopupAssignees:boolean = false;
  showAddAssignees:boolean = false;
  newAssignee:any = "";
  topicProgress:number = 0;
  editModeOn:boolean = false;
  selectedTopic: AssignmentItem = new AssignmentItem();
  title:string = "Title";
  showInput:boolean = false;
  gradedItem: GradedItem = new GradedItem();
  aCourse: Course = new Course();
  isLoading = false;
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
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.aCourse = {id: 0, name: 'ECSE 427', finalGrade: 0, credits: 3, syllabus: null};
    this.gradedItem = {id: 0, name: 'Assignment 1', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees : ["math", "bob", "mathieu", "sehr"], course: this.aCourse, timelineItems: []},
    this.topics = [
      // { title: 'Topic 1', icon: 'pi pi-book', completed: false, assignees:[]},
      // { title: 'Topic 2', icon: 'pi pi-book', completed: false, assignees:[]},
      // { title: 'Topic 3', icon: 'pi pi-book', completed: false, assignees:[]},
      // { title: 'Topic 4', icon: 'pi pi-book', completed: false, assignees:[]},
      // { title: 'Add' , icon: 'pi pi-plus',  completed: true}
    ];
    //this.topicsNoAdd = this.topics.filter(item => item.title!=='Add');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
    for (let t of this.gradedItem.timelineItems) {
      if(t.completed && t.title !== 'Add'){
        completedTopic++;
      }
    }
    this.topicProgress = Math.round(100 * (completedTopic/this.topicsNoAdd.length));
  }

  async onUpload(event: FileSendEvent, gradedItem: GradedItem) {
    const item = event.formData.get('demo[]')
    console.log(gradedItem)
    if (item instanceof File){
      gradedItem.file = item.name;
    }
    console.log("i am here" + gradedItem.name);
    // await this.delay(30000);
    console.log("sending get");
    this.apiService.getTasks(gradedItem.file).then((data: any) => {
        // console.log(data);
        gradedItem.timelineItems = JSON.parse(data['assignments']) as AssignmentItem[];
        for (let t of gradedItem.timelineItems as AssignmentItem[]){
          console.log("in here");
          // console.log(t.get("assignees"));
          t = t as AssignmentItem;
          // if (t instanceof AssignmentItem){
            console.log("here now");
            console.log(t.assignees);
            for (let j of t.assignees){
              if (gradedItem.assignees.length < 4){
                console.log("adding assignees");
                gradedItem.assignees.push("mathieu");
                gradedItem.assignees.push("sehr");
                gradedItem.assignees.push("gabby");
              }
              console.log("j" + j);
              if (j == "Person 1"){
                console.log("working")
                const index = t.assignees.indexOf(j);
                t.assignees[index] = gradedItem.assignees[0];
              }
              if (j == "Person 2"){
                const index = t.assignees.indexOf(j);
                t.assignees[index] = gradedItem.assignees[1];
              }
              if (j == "Person 3"){
                const index = t.assignees.indexOf(j);
                t.assignees[index] = gradedItem.assignees[2];
              }
              if (j == "Person 4"){
                const index = t.assignees.indexOf(j);
                t.assignees[index] = gradedItem.assignees[3];
              }
            // }
          }


        }
        console.log(gradedItem.timelineItems)
        this.topicsNoAdd = gradedItem.timelineItems;
        //this.topics = gradedItem.timelineItems.concat() 
      });

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
