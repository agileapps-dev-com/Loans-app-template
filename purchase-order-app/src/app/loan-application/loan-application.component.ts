import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  isLinear = true;
  shouldPreview = false;
  loanInfoFormGroup: FormGroup;
  applicantInfoFormGroup: FormGroup;

  @ViewChild('loanInformationFormRef') loanInformationFormRef: ElementRef;
  @ViewChild('applicantInfoFormRef') applicantInfoFormRef: ElementRef;

  @ViewChild('preLoanInformationFormRef') preLoanInformationFormRef: ElementRef;
  @ViewChild('preApplicantInfoFormRef') preApplicantInfoFormRef: ElementRef;
  @ViewChild('loanApplicationStepper') loanApplicationStepper: MatStepper;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loanInfoFormGroup = this._formBuilder.group({
      loanInfCtrl: [false, Validators.requiredTrue]
    });
    this.applicantInfoFormGroup = this._formBuilder.group({
      applicantInfCtrl: [false, Validators.requiredTrue]
    });
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
    switch (stepChange.selectedStep.label) {
      case "Loan Info":
        
        break;
    
      default:
        break;
    }
  }

  validateLoanInfoFormAndNavigate() {
    const isValidForm = this.validateLoanInfoForm();
    if (isValidForm) {
      this.loanApplicationStepper.next();
    }
  }
  validateApplicantInfoFormAndNavigate() {
    const isValidForm = this.validateApplciantInfoForm();
    if (isValidForm) {
      this.loanApplicationStepper.next();
    }
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

  private validateLoanInfoForm() {
    const loanInfoFormDomElement = this.loanInformationFormRef.nativeElement;
    const isValidLoanInfo = loanInfoFormDomElement.isValid();
    this.loanInfoFormGroup.setValue({
      loanInfCtrl: isValidLoanInfo
    });
    return isValidLoanInfo;
  }
  private validateApplciantInfoForm() {
    const applicantfoFormDomElement = this.applicantInfoFormRef.nativeElement;
    const isValidApplicantfoInfo = applicantfoFormDomElement.isValid();
    this.applicantInfoFormGroup.setValue({
      applicantInfCtrl: isValidApplicantfoInfo
    });
    return isValidApplicantfoInfo;
  }


}
