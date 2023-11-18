import {GradedItem} from "./graded-item";

export class Course {
    name?: string;
    finalGrade?: number;
    syllabus?: File;
    grades?: GradedItem[];
}
