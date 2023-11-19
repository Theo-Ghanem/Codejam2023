import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {AccordionModule} from "primeng/accordion";
import {AvatarModule} from "primeng/avatar";
import {DialogModule} from "primeng/dialog";
import {PaginatorModule} from "primeng/paginator";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {Course} from "../model/course";
import {lookupGPA} from "../model/gpa";
import { GradedItem } from 'app/model/graded-item';
import {ApiService} from "../services/api.service";
import {TableModule} from "primeng/table";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, CardModule, TableModule, ButtonModule, AccordionModule, AvatarModule, DialogModule, PaginatorModule, MenuModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
    name: string = 'John Doe';
    email: string = 'john.doe@mail.com';
    courses: Course[] = [];
    gpa: number = 0;
    selectedCourse: Course = new Course();
    selectedItem:GradedItem = new GradedItem();
    gradedItems: GradedItem[] = [];
    showPopup: boolean = false;
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
                this.removeCourse(this.selectedCourse);
            }
        }
    ];

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.getItems(null).then((data: any) => {
            this.gradedItems = data;
        });
    }

    navToItem(){
        // if(){
        //     this.router.navigate(['/assignments', this.selectedAssignment.id])
        // }
        // else(){

        // }
        
    }

    addCourse() {
        let course = new Course();
        course.name = 'New Course';
        course.finalGrade = 0;
        this.courses.push(course);
    }

    removeCourse(course: Course) {
        let index = this.courses.indexOf(course);
        this.courses.splice(index, 1);
    }

    selectCourse(course: Course) {
        this.selectedCourse = course;
        this.showPopup = true;
    }

    openEditMenu(event: any, menu: any) {
        console.log("entered");
        event.stopPropagation();
        menu.toggle(event);
    }

    calculateFinalGrade(course: Course, gradedItems: GradedItem[]) {
        let totalWeight = 0;
        let totalGrade = 0;
        for (let item of gradedItems) {
            totalWeight += item.grade;
            totalGrade += item.grade * item.weight;
        }
        course.finalGrade = totalGrade / totalWeight;
    }

    calculateGPA() {
        let totalWeight = 0;
        let totalGrade = 0;
        for (let course of this.courses) {
            totalWeight += course.credits;
            totalGrade += lookupGPA(course.finalGrade) * course.credits;
        }
        this.gpa = totalGrade / totalWeight;
    }


}
