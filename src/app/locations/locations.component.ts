import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { LocationModel } from './locations.model';
import { catchError } from 'rxjs/internal/operators/catchError';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  
  formValue!: FormGroup;
  locationModel : LocationModel = new LocationModel();
  locationData !:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService){}

  ngOnInit() :void{
     this.formValue = this.formbuilder.group({
      name :[''],
      type :[''],
      description :[''],
      famousfor :[''],
      time :['']
     })

     this.getLocationDetails();
  }

  clickAdd()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postLocationDetails()
  {
    this.locationModel.name=this.formValue.value.name;
    this.locationModel.type=this.formValue.value.type;
    this.locationModel.description=this.formValue.value.description;
    this.locationModel.famousfor=this.formValue.value.famousfor;
    this.locationModel.time=this.formValue.value.time;

    this.api.postLocation(this.locationModel)
    .subscribe(res=>{
      console.log(res);
      alert("Location added");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getLocationDetails();
    },
    catchError((error: any) => {
      console.error('Error:', error);
      throw error;
    }))
  }

  getLocationDetails()
  {
    this.api.getLocation()
    .subscribe(res=>
      {
         this.locationData = res;
      })
  }

  deleteLocations(i : any)
  {
    this.api.deleteLocation(i.id)
    .subscribe(res=>
      {
        alert("Location deleted");
        this.getLocationDetails();//for refreshing automatically
      })
  }

  onEdit(i:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.locationModel.id = i.id;
    this.formValue.controls['name'].setValue(i.name);
    this.formValue.controls['type'].setValue(i.type);
    this.formValue.controls['description'].setValue(i.description);
    this.formValue.controls['famousfor'].setValue(i.famousfor);
    this.formValue.controls['time'].setValue(i.time);
  }
  
  updateLocation()
  {
    this.locationModel.name=this.formValue.value.name;
    this.locationModel.type=this.formValue.value.type;
    this.locationModel.description=this.formValue.value.description;
    this.locationModel.famousfor=this.formValue.value.famousfor;
    this.locationModel.time=this.formValue.value.time;
    
    this.api.updateLocation(this.locationModel,this.locationModel.id)
    .subscribe(res =>{
      alert("Updated location");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getLocationDetails();  //to close the form
    })
  }
}
