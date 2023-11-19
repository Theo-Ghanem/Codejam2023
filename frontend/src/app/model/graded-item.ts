import { AssignmentItem } from "./assignment-topic";
import { Course } from "./course";
import { TopicItem } from "./topic-item";

export class GradedItem {
  id: number  = 0;
  name: string = '';
  type: 'assignments' | 'tests' = 'assignments';
  dueDate: Date = new Date();
  weight: number = 1;
  grade: number = 100;
  file:string = "";
  assignees:string[] = [];
  course?: Course;
  timelineItems: TopicItem[] | AssignmentItem[] = [];
}
