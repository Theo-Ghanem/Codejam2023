import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
import { MenuItem, SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { Router } from "@angular/router";
import { GradedItem } from "../model/graded-item";
import { MenuModule } from "primeng/menu";
import { ApiService } from "app/services/api.service";
import { ButtonModule } from "primeng/button";

@Component({
  standalone: true,
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  imports: [
    AccordionModule,
    SharedModule,
    TableModule,
    MenuModule,
    ButtonModule,
  ],
  styleUrls: ["./tests.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class TestsComponent implements OnInit {
  tests: GradedItem[] = [];
  selectedTest!: GradedItem;
  editModeOn: boolean = false;
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
        this.removeTest(this.selectedTest);
      },
    },
  ];
  defaultTest: GradedItem = {
    id: 0,
    name: "Default Test",
    type: "tests",
    dueDate: new Date(),
    weight: 0,
    grade: 0,
    assignees: [],
    course: null,
    file: null,
    timelineItems: [],
  };

  constructor(private apiService: ApiService, private router: Router) {}

    ngOnInit() {
      this.apiService.getItems(null).then(data => {
        let array: GradedItem[] = [];
        // iterate through object entries of data.items
        for (let [key, value] of Object.entries(data.items)) {
          let v = value as string;
          let gradedItem = JSON.parse(v) as GradedItem;
          gradedItem.id = parseInt(key);
          gradedItem.dueDate = new Date(gradedItem.dueDate);
          array.push(gradedItem)
        }
        this.tests = array.filter(a => a.type === 'tests');
      });

      this.tests.push({
            id: 1,
            name: 'Assignment 1',
            type: 'tests',
            dueDate: new Date(2021, 3, 1),
            weight: 10,
            grade: 100,
            file: "assignment1.json",
            assignees : ["math", "bob", "mathieu", "sehr"],
            course: null,
            timelineItems: []
          }
      );
      this.tests.push({
            id: 2,
            name: 'Assignment 2',
            type: 'tests',
            dueDate: new Date(2021, 4, 1),
            weight: 10,
            grade: 100,
            file: "assignment1.json",
            assignees : ["math", "theo", "mathieu", "sehr"],
            course: null,
            timelineItems: []
          }
      );
    }

  navToTest() {
    this.router.navigate(["tests", this.selectedTest.id]);
  }

  openEditMenu(event: any, menu: any) {
    event.stopPropagation();
    menu.toggle(event);
  }

  addTest() {
    // Create a copy of the default test
    let newTest = { ...this.defaultTest };

    // Generate a unique id for the new test
    newTest.id =
      this.tests.length > 0 ? Math.max(...this.tests.map((a) => a.id)) + 1 : 1;

    this.apiService.createItem(newTest).then((test) => {
      this.tests.push(test.addedItem);
      this.router.navigate(["/tests", newTest.id]);
    });
  }

  removeTest(test: GradedItem) {
    this.apiService.deleteItem(test.id).then(() => {
      this.tests = this.tests.filter((t) => t.id !== test.id);
    });
  }

  editTest(test: GradedItem) {
    this.apiService.update(test).then((updatedTest) => {
      const index = this.tests.findIndex((t) => t.id === updatedTest.id);
      if (index !== -1) {
        this.tests[index] = updatedTest;
      }
    });
  }
}
