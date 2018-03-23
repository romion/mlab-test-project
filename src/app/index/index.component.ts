import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CrudService } from '../shared/services/crud.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  users: any;

  constructor(private crudService: CrudService, private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.crudService.get().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(id) {
    if (confirm('Are you sure?')) {
      this.crudService.delete(id).subscribe(res => {
        console.log('Deleted');
        this.getUsers();
      });
    };
  }

}
