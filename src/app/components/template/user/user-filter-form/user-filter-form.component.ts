import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserReadAllComponent } from 'src/app/components/view/user/user-read-all/user-read-all.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-filter-form',
  templateUrl: './user-filter-form.component.html',
  styleUrls: ['./user-filter-form.component.css']
})
export class UserFilterFormComponent {

  filterUserForm: FormGroup;

  constructor( private fb: FormBuilder, private userService: UserService, private userReadAllComponent: UserReadAllComponent) {
    this.filterUserForm = this.fb.group({
      id: [''],
      firstNameOrLastName: [''],
      userName: [''],
      role: ['']
    });
  }
  filter() {
    const formValues = this.filterUserForm.value;

    const filterParams:any = {
      id: formValues.id,
      firstNameOrLastName: formValues.firstNameOrLastName,
      userName: formValues.userName,
      role: formValues.role
    };

    const filterString = Object.keys(filterParams)
      .filter(key => filterParams[key] !== null)
      .map(key => `${key}=${filterParams[key]}`)
      .join('&');
 
    this.userReadAllComponent.findAllUsersPaginated(filterString);
  }

  clearFilter() {
    this.filterUserForm.reset();
    this.userReadAllComponent.findAllUsersPaginated();
  }
}
