import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TopicItem } from "../model/topic-item";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) {} // getPosts(): Observable<any[]> { //   return this.http.get<any[]>(`${this.apiUrl}` + testId); // }

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
  } // addPost(post: any): Observable<any> { //   return this.http.post<any>(`${this.apiUrl}/posts`, post); // } // updatePost(id: number, post: any): Observable<any> { //   return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post); // } // deletePost(id: number): Observable<any> { //   return this.http.delete<any>(`${this.apiUrl}/posts/${id}`); // }
}
