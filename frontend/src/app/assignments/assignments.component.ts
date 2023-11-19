import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { GradedItem } from "../model/graded-item";
import { Router } from "@angular/router";
import { ApiService } from "app/services/api.service";
import { FileSendEvent } from "primeng/fileupload";
import { MenuItem } from "primeng/api";
import { AssignmentItem } from "app/model/assignment-topic";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";

@Component({
  standalone: true,
  selector: "app-assignments",
  templateUrl: "./assignments.component.html",
  styleUrls: ["./assignments.component.css"],
  imports: [
    CommonModule,
    AccordionModule,
    TableModule,
    MenuModule,
    ButtonModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AssignmentsComponent implements OnInit {
  assignments: GradedItem[] = [];
  selectedAssignment!: GradedItem;
  editModeOn: boolean = false;
  selectedFile: string;
  editMenu: MenuItem[] = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        this.editModeOn = true;
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        this.removeAssignment(this.selectedAssignment);
      },
    },
  ];
  constructor(private apiService: ApiService, private router: Router) {}

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit() {
    this.assignments = [
      {
        id: 0,
        name: "Assignment 1",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 1,
        name: "Assignment 2",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 2,
        name: "Assignment 3",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 3,
        name: "Assignment 4",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 4,
        name: "Assignment 5",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 5,
        name: "Assignment 6",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 6,
        name: "Assignment 7",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
      {
        id: 7,
        name: "Assignment 8",
        type: "assignments",
        dueDate: new Date(2021, 3, 1),
        weight: 10,
        grade: 100,
        file: "",
        assignees: ["math", "bob"],
        course: null,
        timelineItems: [],
      },
    ];
  }

  showTasks(gradedItem: GradedItem) {
    console.log("filenaem is " + this.selectedFile + gradedItem.file);
    gradedItem.file = this.selectedFile;
    this.apiService.getTasks(gradedItem.file).then((data: any) => {
      console.log(data);
      gradedItem.timelineItems = JSON.parse(data["assignments"]) as AssignmentItem[];
      //INSERT LOGIC HERE TO SET GRADE DETAILS BASED ON DATA OUTPUT DICTIONARY
    });
    //this.showPopup = true; <-- do what you want here
  }

  onUpload(event: FileSendEvent, ass: GradedItem) {
    console.log("i am here" + ass.name);
    console.log(event);
    console.log(event.formData);
    const item = event.formData.get("demo[]");
    if (item instanceof File) {
      console.log(item);
      this.selectedFile = item.name;
    }
    console.log("sending get");
    // this.apiService.getTasks(ass.file).then((data: any) => {
    //     console.log(data);
    //     ass.timelineItems = JSON.parse(data['assignments']) as AssignmentItem[];
    //   });
  }

  navToAssignment() {
    this.router.navigate(["/assignments", this.selectedAssignment.id]);
  }
  openEditMenu(event: any, menu: any) {
    event.stopPropagation();
    menu.toggle(event);
  }

  addAssignment(assignment: GradedItem) {
    this.apiService.createItem(assignment).then((newAssignment) => {
      this.assignments.push(newAssignment);
    });
  }

  removeAssignment(assignment: GradedItem) {
    this.apiService.deleteItem(assignment.id).then(() => {
      this.assignments = this.assignments.filter((a) => a.id !== assignment.id);
    });
  }

  editAssignment(assignment: GradedItem) {
    this.apiService.update(assignment).then((updatedAssignment) => {
      const index = this.assignments.findIndex(
        (a) => a.id === updatedAssignment.id
      );
      if (index !== -1) {
        this.assignments[index] = updatedAssignment;
      }
    });
  }
}
