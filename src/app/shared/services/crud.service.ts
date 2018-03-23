import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudService {

  private readonly apiKey = 'cy_uL4UHZHewIZGufclJnjOlGep5ow8N';
  private readonly usersUrl = `https://api.mlab.com/api/1/databases/crud-test-romion/collections/user`;

  constructor(private http: HttpClient) { }

  create(user: any) {
    const uri = `${this.usersUrl}?apiKey=${this.apiKey}`;
    return this.http.post<any>(uri, user);
  }

  get() {
    const uri = `${this.usersUrl}?apiKey=${this.apiKey}`;
    return this
      .http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  edit(id) {
    const uri = `${this.usersUrl}/${id}?apiKey=${this.apiKey}`;
    return this
      .http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  update(user: any, id: string) {
    const uri = `${this.usersUrl}?apiKey=${this.apiKey}&q=${this.getObjectId(id)}`;
    return this.http.put<any>(`${uri}/`, user);
  }

  delete(id) {
    const uri = `${this.usersUrl}/${id}?apiKey=${this.apiKey}`;
    return this.http.delete(uri);
  }

  getObjectId(id: string) {
    return JSON.stringify({'_id': {'$oid': id}});
  }

}
