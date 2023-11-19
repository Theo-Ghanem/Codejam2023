import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {MenuItem, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Router} from "@angular/router";
import {GradedItem} from "../model/graded-item";
import { MenuModule } from 'primeng/menu';
import { ApiService } from 'app/services/api.service';

@Component({
    standalone: true,
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    imports: [
        AccordionModule,
        SharedModule,
        TableModule,
        MenuModule,
    ],
    styleUrls: ['./tests.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TestsComponent implements OnInit {
    tests: GradedItem[] = [];
    selectedTest!: GradedItem;
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
                this.removeTest(this.selectedTest);
            }
        }
    ];
    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit() {
        this.apiService.getItems(null).then(data => this.tests = data.filter(t => t.type === 'tests'));
    }

    navToTest() {
        this.router.navigate(['tests', this.selectedTest.id])
    }

    openEditMenu(event: any, menu: any) {
        event.stopPropagation();
        menu.toggle(event);
      }
  
      addTest(test: GradedItem) {
        this.apiService.createItem(test).then(newTest => {
          this.tests.push(newTest);
        });
      }
      
      removeTest(test: GradedItem) {
        this.apiService.deleteItem(test.id).then(() => {
          this.tests = this.tests.filter(t => t.id !== test.id);
        });
      }
      
      editTest(test: GradedItem) {
        this.apiService.update(test).then(updatedTest => {
          const index = this.tests.findIndex(t => t.id === updatedTest.id);
          if (index !== -1) {
            this.tests[index] = updatedTest;
          }
        });
      }
      openTestForm() {
        // write this to opena  new test thing
      }


}
