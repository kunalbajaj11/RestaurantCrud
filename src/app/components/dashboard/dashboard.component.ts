import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataServiceService } from 'src/app/shared/data-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataService: DataServiceService) { }

  formGroup: FormGroup;
  dataSource: any;
  referenceId: any;
  showBlank: boolean = true;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getAllRestuarants();
  }

  addRestraunt () {
    let {name, email, mobile, address, services} = this.formGroup.value;

    this.dataService.postRestuarant({name, email, mobile, address, services}).subscribe(res => {
      alert(res);
    });

    this.formGroup.reset();
    this.getAllRestuarants();
  }

  getAllRestuarants () {
    this.dataService.getRestuarant().subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
    })
  }

  deleteRestuarant (item) {
    this.dataService.deleteRestuarant(item.id).subscribe(res => {
      this.getAllRestuarants();
    })
  }

  editRestuarant (item) {
    this.formGroup.controls['name'].setValue(item.name);
    this.formGroup.controls['email'].setValue(item.email);
    this.formGroup.controls['mobile'].setValue(item.mobile);
    this.formGroup.controls['address'].setValue(item.address);
    this.formGroup.controls['services'].setValue(item.services);
    this.referenceId = item.id;
  }

  updateRestraunt () {
    let {name, email, mobile, address, services} = this.formGroup.value;

    this.dataService.updateRestuarant(this.referenceId, {name, email, mobile, address, services}).subscribe(res => {
      this.getAllRestuarants();
      this.formGroup.reset();
    });
  }
}
