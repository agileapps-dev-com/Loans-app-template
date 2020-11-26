import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  isLinear = false;
  shouldPreview = false;
  @ViewChild('loanInformationFormRef') loanInformationFormRef: ElementRef;
  @ViewChild('applicantInfoFormRef') applicantInfoFormRef: ElementRef;

  @ViewChild('preLoanInformationFormRef') preLoanInformationFormRef: ElementRef;
  @ViewChild('preApplicantInfoFormRef') preApplicantInfoFormRef: ElementRef;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  loanInformationFormOnloadHandler(eventData) {
    this.hideRecordFormHeader(this.loanInformationFormRef);
  }

  applicantInformationFormOnloadHandler(eventData) {
    this.hideRecordFormHeader(this.applicantInfoFormRef);
  }
  preLoanInformationFormOnloadHandler(eventData) {
    this.hideRecordFormHeader(this.preLoanInformationFormRef);
    this.previewLoanInfo();
  }

  preApplicantInformationFormOnloadHandler(eventData) {
    this.hideRecordFormHeader(this.preApplicantInfoFormRef);
    this.previewApplicantInfo();
  }



  stepSelectionChange(stepChange: StepperSelectionEvent) {
    this.shouldPreview = stepChange.selectedStep.label === "Preview & Submit";
    
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
  private previewLoanInfo() {
    const loanInfoFormDomElement = this.loanInformationFormRef.nativeElement;
    const previewLoaninfoFormDomElement = this.preLoanInformationFormRef.nativeElement;
    const formData = loanInfoFormDomElement.getRecordData();
    previewLoaninfoFormDomElement.setRecordData(formData);
    console.log(loanInfoFormDomElement, previewLoaninfoFormDomElement, formData);

  }
  private previewApplicantInfo() {
    const applicantInfoDomElement = this.applicantInfoFormRef.nativeElement;
    const previewApplicantInfoFormDomElement = this.preApplicantInfoFormRef.nativeElement;
    const formData = applicantInfoDomElement.getRecordData();
    previewApplicantInfoFormDomElement.setRecordData(formData);
  }


}
