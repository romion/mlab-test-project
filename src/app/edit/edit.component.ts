import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CrudService } from '../shared/services/crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user_id: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private crudService: CrudService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.crudService.edit(params['id']).subscribe(res => {
        this.user_id = res['_id'].$oid;
        this.form.patchValue(res);
        // console.log(res);
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      birthday: ['', Validators.required ]
    });
  }

  submitForm({ value, valid }: { value: Event, valid: boolean }): void {
    console.log(value);
    if (valid) {
      this.route.params.subscribe(params => {
        this.crudService.update(value, this.user_id).subscribe(res => {
          if (res.n) {
            this.router.navigate(['index']);
          } else {
            console.log('Something goes wrong!');
          }
        });
      });
    }
  }

}
