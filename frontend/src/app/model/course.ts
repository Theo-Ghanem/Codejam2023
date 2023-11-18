import {GradedItem} from "./graded-item";

export class Course {
    name: string = '';
    finalGrade: number = 0;
    credits: number = 3;
    syllabus?: File;
    grades: GradedItem[] = [];
}
