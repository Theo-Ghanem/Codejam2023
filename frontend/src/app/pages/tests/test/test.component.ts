import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {FileUploadHandlerEvent, FileUploadModule} from "primeng/fileupload";
import {CardModule} from "primeng/card";
import {TimelineModule} from "primeng/timeline";
import {TopicItem} from '../../../model/topic-item';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {AccordionModule} from "primeng/accordion";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FileUploadModule, CardModule, TimelineModule, FormsModule, InputTextModule, DividerModule, AccordionModule, ButtonModule, CheckboxModule, DialogModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit{
  topics: TopicItem[] = [];
  grade: number = 50;
  weight: number = 50;
  completedColor: string = '#34a224';
  incompleteColor: string = '#FF9800';
  showPopup: boolean = false;
  notes: string | undefined = '';
  ngOnInit() {
    this.topics = [
      { title: 'Lecture 1', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 2', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 3', icon: 'pi pi-book', completed: false},
      { title: 'Lecture 4', icon: 'pi pi-book', completed: false},
      { title: 'Add', icon: 'pi pi-plus', completed: true}
    ];
  }

  addTopic(topic: TopicItem) {
    if (topic.title == 'Add') {
      this.topics.splice(this.topics.length - 1, 0, { title: 'Lecture ' + this.topics.length, icon: 'pi pi-book', completed: false});
    }
  }

  removeTopic(topic: TopicItem) {
    if (topic.title != 'Add') {
      this.topics.splice(this.topics.indexOf(topic), 1);
    }
  }

  showNotes(topic: TopicItem) {
    this.showPopup = true;
    this.notes = topic.notes;
  }

  onUpload(event: FileUploadHandlerEvent) {
  }
}
