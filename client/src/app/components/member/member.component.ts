import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemberModel, Vaccination } from '../../models/memberModel';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {
  @Input() member!: MemberModel;
  @Input() vaccines!: any[];
  @Output() delete = new EventEmitter<string>();
  @Output() afterEdit = new EventEmitter<void>();
  show: boolean = false;
  showForEdit: boolean = false;
  vaccinationsArray: Vaccination[] = []
  imageFile: File | null = null;


  constructor(private api: ApiService) { }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
        this.member.image = URL.createObjectURL(this.imageFile);
    }  }

  deleteImage() {
    this.member.image = null;
    this.imageFile = null;
}

  showHideDetails() {
    this.show = !this.show
  }
  onDialogClose(){
    this.vaccinationsArray = [] 
  }
  edit() {
    this.showForEdit = !this.showForEdit;
    if (this.showForEdit) {
      this.show = false;
      for (let i = 0; i < 4 - this.member.vaccinations.length; i++) {
        this.vaccinationsArray.push({ dateReceived: null, manufacturer: "" })
      }
    }
    if (!this.showForEdit)
      this.vaccinationsArray = []
  }
  deleteMember() {
    this.api.deleteMember(this.member.idNumber).subscribe(
      () => {
        console.log('Member deleted successfully');
        this.delete.emit(this.member.idNumber)
      })
  }
  saveEdit() {
    for (let i = 0; i < this.vaccinationsArray.length; i++) {
      if (this.vaccinationsArray[i].manufacturer != "")
        this.member.vaccinations.push(this.vaccinationsArray[i]);
    }
    if (this.imageFile) {
      this.member.image = URL.createObjectURL(this.imageFile);
  }
    this.api.editMember(this.member).subscribe(
      (response) => {
        console.log('Member updated successfully:', response);
        this.showForEdit = false;
        this.vaccinationsArray = []
        this.afterEdit.emit()
      });
  }
}
