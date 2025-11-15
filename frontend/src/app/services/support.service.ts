import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportMessage } from '../models/support-message.model';

export interface SupportRequest {
  _id: string;
  subject: string;
  status: 'open' | 'closed';
  createdAt: string;
   animal?: {
    _id: string;
  name: string;
  species: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  messages: SupportMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private baseUrl = 'http://localhost:5000/api/support';

  constructor(private http: HttpClient) {}
private getAuthHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
  
  createSupportRequest(subject: string, message: string, token: string, animalId?: string): Observable<any> {
    const body: any = { subject, message };
    if (animalId) body.animal = animalId;
    return this.http.post(this.baseUrl, body, this.getAuthHeaders(token));
  }


  getAllSupportRequests(token: string): Observable<SupportRequest[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<SupportRequest[]>(this.baseUrl, { headers });
  }

  getUserSupportRequests(token: string): Observable<SupportRequest[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<SupportRequest[]>(`${this.baseUrl}/my`, { headers });
  }

  addReplyToSupportRequest(requestId: string, message: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/${requestId}/reply`, { message }, { headers });
  }

  addResponse(requestId: string, message: { text: string }, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/response`, { requestId, message }, { headers });
  }
  closeSupportRequest(requestId: string, token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.baseUrl}/close/${requestId}`, {}, { headers });
}

}
