import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface AdoptionRequest {
  _id: string;
  animal: {
    _id: string;
    name: string;
    species?: string;
  };
  user: {
    _id: string;
    username: string;
    email: string;
  };
  message: string;
  status: string;
  meetingDate?: string;
  createdAt?: string;
  name?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private apiUrl = 'http://localhost:5000/api/adoptions'; 

  constructor(private http: HttpClient) {}

  submitAdoptionRequest(
  animalId: string,
  message: string,
  name: string,
  email: string,
  token: string,
  meetingDate?: string
  
): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const body: any = { animalId, message, name, email };
  if (meetingDate) {
    body.meetingDate = meetingDate;
  }
  return this.http.post(this.apiUrl, body, { headers });
}


  getAllAdoptionRequests(token: string) {
  return this.http.get<AdoptionRequest[]>(`${this.apiUrl}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

updateAdoptionStatus(id: string, updateData: any, token: string) {
  return this.http.put(`${this.apiUrl}/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
getMyAdoptionRequests(token: string): Observable<AdoptionRequest[]> {
  return this.http.get<AdoptionRequest[]>(`${this.apiUrl}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

}
