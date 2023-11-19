export class GradedItem {
  id: number = 0;
  name: string = '';
  type: 'assignments' | 'tests' = 'assignments';
  dueDate: Date = new Date();
  weight: number = 1;
  grade: number = 100;
}
