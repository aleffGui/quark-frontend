import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() isUpdate: Boolean = false;
  @Input() label: String = '';

  public loading = false;
  public userForm: FormGroup;
  public users: User[] = [];
  public user?: User
  public idUser:any = null;
  constructor
  (
    private fb: FormBuilder, private userService: UserService, private toastr: ToastrService,
    private router: Router, private actRoute: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]], // Defina o valor inicial como uma string vazia ('')
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      userName: ['', Validators.required],
      role: [null, Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if(this.isUpdate) {
      this.loading = true;
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('passwordConfirm')?.clearValidators();
      this.idUser = this.actRoute.snapshot.paramMap.get('id');
      this.userService.findById(this.idUser).subscribe((response) => {
        if(response) {
          this.loading = false;
          this.user = response;
          this.userForm.patchValue({
            firstName: this.user!.firstName,
            lastName: this.user!.lastName,
            userName: this.user!.userName,
            role: this.user!.role,
          });
        }
      }, err => {
        this.toastr.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom-center'})
        this.router.navigate(['/usuarios'])
      })
    }
  }

  validateForm() {
    if(this.userForm.get('passwordConfirm')?.value !== this.userForm.get('password')?.value) {
      this.toastr.error('Senhas não coincidem.', '', {positionClass: 'toast-bottom-center'})
    } else {
      if(this.userForm.invalid) {
        for (const controlName in this.userForm.controls) {
          if (this.userForm.controls[controlName].invalid) {
            this.userForm.controls[controlName].markAsTouched();
          }
        }
        return;
      }
      this.userForm.removeControl('passwordConfirm');
      this.isUpdate ? this.updateUser() : this.saveUser()
    }
  }
  
  saveUser() {
    this.loading = true;
    this.userService.insert(this.userForm.value).subscribe(response => {
        this.toastr.success("Dados salvos com sucesso", '', {positionClass: 'toast-bottom-center'});
        this.router.navigate(['/usuarios']);
        this.loading = false;
    }, error => {
      if(error.error.message) {
        this.toastr.error(`${error.error.message}`, '', {positionClass: 'toast-bottom-center'})
      } else {
        this.toastr.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom-center'})
      }
      this.loading = false;
    })
  }
  updateUser() {
    this.loading = true;
    this.userService.update(this.idUser, this.userForm.value).subscribe((response) => {
    this.toastr.success("Dados atualizados com sucesso", '', {positionClass: 'toast-bottom-center'})
        this.router.navigate(['/usuarios']);
        this.loading = false;
    }, error => {
      if(error.error.message) {
        this.toastr.error(`${error.error.message}`, '', {positionClass: 'toast-bottom-center'})
      } else {
        this.toastr.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom-center'})
      }
      this.loading = false;
    })
  }
}

