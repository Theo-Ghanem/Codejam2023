import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {NgForOf} from "@angular/common";
import {GradedItem} from "../model/graded-item";
import { ApiService } from 'app/services/api.service';
import { FileSendEvent } from 'primeng/fileupload';


@Component({
    standalone: true,
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css'],
    imports: [
        AccordionModule,
        TableModule,
        NgForOf
    ],
    encapsulation: ViewEncapsulation.None
})
export class AssignmentsComponent implements OnInit {
    assignments: GradedItem[] = [];

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.assignments = [
            {name: 'Assignment 1', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 2', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 3', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 4', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 5', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 6', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 7', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]},
            {name: 'Assignment 8', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100, file: "", assignees: ["Gabby", "Sehr"]}
        ];
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

}
