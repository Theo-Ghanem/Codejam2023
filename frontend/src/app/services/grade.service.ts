import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  // getPosts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}` + testId);
  // }

  getGrade(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tests`);
  }

  // addPost(post: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/posts`, post);
  // }

  // updatePost(id: number, post: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post);
  // }

  // deletePost(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/posts/${id}`);
  // }
}