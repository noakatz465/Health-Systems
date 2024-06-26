import { Component } from '@angular/core';
import { MemberModel, Vaccination } from '../../models/memberModel';
import { ApiService } from 'src/app/api.service';
import { vaccineManufacturerModel } from 'src/app/models/vaccineManufacturerModel';

@Component({
  selector: 'app-membersList',
  templateUrl: './membersList.component.html',
  styleUrls: ['./membersList.component.scss']
})
export class MembersListComponent {
  members: MemberModel[] = [];
  vaccines: vaccineManufacturerModel[] = [];
  vaccinesArray!: any[];
  newMember: MemberModel = {
    firstName: "",
    lastName: "",
    idNumber: "",
    address: {
      city: "",
      street: "",
      number: ""
    },
    dateOfBirth: null,
    phone: "",
    mobile: "",
    vaccinations: [],
    positiveTestDate: null,
    recoveryDate: null,
    image: null
  };

  add: boolean = false
  vaccinationsArray: Vaccination[] = []
  unvaccinatedMembersCount: number=0;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllMemebers().subscribe(result => {this.members = result
      this.calculateUnvaccinatedMembers()
    })
    this.api.getAllVaccineManufacturers().subscribe(result => {
      this.vaccines = result;
      this.vaccinesArray = this.vaccines.map(vaccine => vaccine.name)
      console.log(this.vaccinesArray + "vaccinesArray");
      console.log(this.vaccines);
    })
  }
  
  onDialogClose(){
    this.vaccinationsArray = [] 
  }

  calculateUnvaccinatedMembers() {
    this.unvaccinatedMembersCount = 0; // איפוס מספר החברים שאינם מחוסנים
    this.members.forEach(member => { // עבור כל חבר ברשימה
        if (member.vaccinations.length === 0) { // אם אורך מערך החיסונים שווה לאפס
            this.unvaccinatedMembersCount++; // הוסף אחד למספר החברים שאינם מחוסנים
        }
    });
  }
  deleteMember(memberId: string) {
    this.members = this.members.filter(member => member.idNumber !== memberId);
    this.calculateUnvaccinatedMembers()
  }
  addForm() {
    this.add = !this.add
    console.log(this.vaccines);    
    if (this.add) {
      this.vaccinesArray = this.vaccines.map(vaccine => vaccine.name)
      for (let i = 0; i < 4; i++) {
        this.vaccinationsArray.push({ dateReceived: null, manufacturer: "" })
      }
      console.log(this.vaccinationsArray.length);

      this.newMember = {
        firstName: " ",
        lastName: "",
        idNumber: "",
        address: {
          city: "",
          street: "",
          number: ""
        },
        dateOfBirth: null,
        phone: "",
        mobile: "",
        vaccinations: [],
        positiveTestDate: null,
        recoveryDate: null,
        image: null
      } // Reset newMember when showing the form
    }
  }
  addMember() {
    for (let i = 0; i < this.vaccinationsArray.length; i++) {
      if (this.vaccinationsArray[i].manufacturer != "")
        this.newMember.vaccinations.push(this.vaccinationsArray[i]);
    }
    this.api.addMember(this.newMember).subscribe(
      (result) => {
        console.log('Member added successfully');
        this.members.push(result);
        this.add = false;
        this.calculateUnvaccinatedMembers()
      });
  }
}
