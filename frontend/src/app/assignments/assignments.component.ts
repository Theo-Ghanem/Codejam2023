import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {NgForOf} from "@angular/common";
import {GradedItem} from "../model/graded-item";


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

    ngOnInit() {
        this.assignments = [
            {name: 'Assignment 1', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 2', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 3', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 4', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 5', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 6', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 7', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {name: 'Assignment 8', type: 'assignments', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100}
        ];
    }

}
