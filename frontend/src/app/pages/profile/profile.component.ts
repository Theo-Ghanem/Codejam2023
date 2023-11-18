import {Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from "primeng/card";
import {Course} from "../../model/course";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {
  name: string = 'John Doe';
  email: string = '';
  courses: Course[] = [];

  addCourse() {
    let course = new Course();
    course.name = 'New Course';
    course.finalGrade = 0;
    course.grades = [];
    this.courses.push(course);
  }
}
