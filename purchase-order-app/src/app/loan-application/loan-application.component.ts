import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  isLinear = false;
  @ViewChild('loanInformationFormRef') loanInformationFormRef: ElementRef;
  @ViewChild('applicantInfoFormRef') applicantInfoFormRef: ElementRef;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  loanInformationFormOnloadHandler(eventData) {
     this.hideRecordFormHeader(this.loanInformationFormRef);
  }

  applicantInformationFormOnloadHandler(eventData) {
    this.hideRecordFormHeader(this.applicantInfoFormRef);
 }

  /**
   * Hide the default tabs from ace-record-form
   * @param formRef 
   * @param hideHeaderTabs 
   */
  private hideRecordFormHeader(formRef: ElementRef, hideHeaderTabs = true) {
    const headerDomElement = formRef.nativeElement.querySelector('mat-tab-header');
    headerDomElement.style.display = hideHeaderTabs ? 'none' : "inherit";
  }

}
