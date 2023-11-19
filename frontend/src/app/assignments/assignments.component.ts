import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {GradedItem} from "../model/graded-item";
import {Router} from "@angular/router";
import { ApiService } from 'app/services/api.service';
import { FileSendEvent } from 'primeng/fileupload';
import { MenuItem } from 'primeng/api';
import { AssignmentItem } from 'app/model/assignment-topic';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';


@Component({
    standalone: true,
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css'],
    imports: [
        CommonModule,
        AccordionModule,
        TableModule,
        MenuModule,
        ButtonModule
    ],
    encapsulation: ViewEncapsulation.None
})
export class AssignmentsComponent implements OnInit {
    assignments: GradedItem[] = [];
    selectedAssignment!: GradedItem;
    editModeOn:boolean = false;
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
              this.removeAssignment(this.selectedAssignment);
          }
      }
  ];
  defaultAssignment: GradedItem = {
    id: 0,
    name: 'New Assignment',
    type: 'assignments',
    dueDate: new Date(),
    weight: 0,
    grade: 0,
    assignees: [],
    course: null,
    file: null,
    timelineItems: []
  };
    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit() {
        this.apiService.getItems(null).then(data => {
            let array: GradedItem[] = [];
            // iterate through object entries of data.items
            for (let [key, value] of Object.entries(data.items)) {
                let v = value as string;
                array.push(JSON.parse(v) as GradedItem)
            }
            this.assignments = array.filter(a => a.type === 'assignments');
        });
    }

    showTasks(grade: GradedItem) {
    console.log("filenaem is " + grade.file);
        this.apiService.getQuestions(grade.file).then((data: any) => {
          console.log(data);
          //INSERT LOGIC HERE TO SET GRADE DETAILS BASED ON DATA OUTPUT DICTIONARY
        });
        //this.showPopup = true; <-- do what you want here
      }

    onUpload(event: FileSendEvent, ass: GradedItem) {
        console.log("i am here" + ass.name);
        const item = event.formData.get('demo[]')
        if (item instanceof File){
          ass.file = item.name;
        }
        console.log(ass.file);
      }

    navToAssignment() {
        this.router.navigate(['/assignments', this.selectedAssignment.id])
    }
    openEditMenu(event: any, menu: any) {
      event.stopPropagation();
      menu.toggle(event);
    }

    addAssignment() {
      // Create a copy of the default assignment
      let newAssignment = { ...this.defaultAssignment };
      
      // Generate a unique id for the new assignment
      newAssignment.id = this.assignments.length > 0 ? Math.max(...this.assignments.map(a => a.id)) + 1 : 1;
      
      this.apiService.createItem(newAssignment).then(assignment => {
        this.assignments.push(assignment.addedItem);
        this.router.navigate(['/assignments', newAssignment.id]);
      }
      );
     
    }
    
    removeAssignment(assignment: GradedItem) {
      this.apiService.deleteItem(assignment.id).then(() => {
        this.assignments = this.assignments.filter(a => a.id !== assignment.id);
      });

    }
    
    editAssignment(assignment: GradedItem) {
      this.apiService.update(assignment).then(updatedAssignment => {
        const index = this.assignments.findIndex(a => a.id === updatedAssignment.id);
        if (index !== -1) {
          this.assignments[index] = updatedAssignment;
        }
      });
    }



}
