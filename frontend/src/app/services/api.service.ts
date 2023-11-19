import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TopicItem } from "../model/topic-item";
import { GradedItem } from "app/model/graded-item";
import { AssignmentItem } from "app/model/assignment-topic";



@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl = "http://127.0.0.1:5000";

  tasks: AssignmentItem[] = []
  tasksSet: boolean = false;

  constructor(private http: HttpClient) {} // getPosts(): Observable<any[]> { //   return this.http.get<any[]>(`${this.apiUrl}` + testId); // }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getGrade(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tests`);
  } // addTopic(requestBody: TopicItem): Observable<any>  { //   console.log("trying to post"); //   return this.http.post<true>(`${this.apiUrl}/tests`, requestBody);

  async getQuestions(data: any) {
    console.log(data);

    const response = await fetch(`${this.apiUrl}/topic`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }
  async getTasks(data: any) {
    console.log(data);

    const response = await fetch(`${this.apiUrl}/assignment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
        await this.delay(5000);
      this.getTasks(data);
    }

    console.log("RESP");

    return await response.json();
  }
  async createItem(data: GradedItem) {
    console.log(data);

    const response = await fetch(`${this.apiUrl}/grades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async getItems(data:any) {
    console.log(data); //should be null

    const response = await fetch(`${this.apiUrl}/grades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async deleteItem(data: number) {
    console.log(data);

    const response = await fetch(`${this.apiUrl}/grades`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({id: data}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async update(data: GradedItem) {
    console.log(data);

    const response = await fetch(`${this.apiUrl}/grades`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

}
