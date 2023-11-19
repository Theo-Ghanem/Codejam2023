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
    file: null,
    timelineItems: [],
  };

  constructor(private apiService: ApiService, private router: Router) {}


  navToTest() {
    this.router.navigate(["tests", this.selectedTest.id]);
  }
  ngOnInit() {
        this.apiService.getItems(null).then(data => this.tests = data.filter(t => t.type === 'tests'));
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
