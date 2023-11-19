import {Component, OnInit} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Router} from "@angular/router";
import {GradedItem} from "../model/graded-item";

@Component({
    standalone: true,
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    imports: [
        AccordionModule,
        SharedModule,
        TableModule
    ],
    styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
    tests: GradedItem[] = [];
    selectedTest!: GradedItem;
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.tests = [
            {id: 0, name: 'Test 1', type: 'tests', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {id: 0, name: 'Test 2', type: 'tests', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {id: 0, name: 'Test 3', type: 'tests', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
            {id: 0, name: 'Test 4', type: 'tests', dueDate: new Date(2021, 3, 1), weight: 10, grade: 100},
        ];
    }

    navToTest() {
        this.router.navigate(['tests', this.selectedTest.id])
    }


}
