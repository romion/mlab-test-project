import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CrudService } from '../shared/services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private crudService: CrudService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
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
        this.crudService.create(value).subscribe(res => {
            console.log(res);
            this.router.navigate(['index']);
        });
      });
    }
  }

}
