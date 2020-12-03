import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  isLinear = true;
  shouldPreview = false;
  showSuccessfullMessage = false;
  isSavingInProgress = false;
  loanInfoFormGroup: FormGroup;
  applicantInfoFormGroup: FormGroup;

  @ViewChild('loanInformationFormRef') loanInformationFormRef: ElementRef;
  @ViewChild('applicantInfoFormRef') applicantInfoFormRef: ElementRef;

  @ViewChild('preLoanInformationFormRef') preLoanInformationFormRef: ElementRef;
  @ViewChild('preApplicantInfoFormRef') preApplicantInfoFormRef: ElementRef;
  @ViewChild('loanApplicationStepper') loanApplicationStepper: MatStepper;

  constructor(@Inject(DOCUMENT) private document: Document, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetStepFormCtrls();
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
      case "Preview & Submit":
        this.showSuccessfullMessage = false;
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
  submitApplication() {
    this.isSavingInProgress = true;
    // #step 1: save loan info form. 
    this.saveLoanInfoForm();

    // #step 2: save applicant info form : implemented on (save) event on this.loanInformationFormRef
    // #step 3: display message & reset both forms and go to Loan info step
  }
  loanInfoFormSaveHandler(eventData) {
    const onSaveData = eventData['detail'];
    let loanRecordData = null;
    this.isSavingInProgress = false;
    // if success, proceed to set the link lookup save the applicant information
    if (onSaveData['status'] === "success") {
      loanRecordData = onSaveData['data']['record'];
      this.saveApplicantInfoForm(loanRecordData)
    }
  }
  applciantInfoFormSaveHandler(eventData) {
    const onSaveData = eventData['detail'];
    this.isSavingInProgress = false;
    if (onSaveData['status'] === "success") {
      this.showSuccessfullMessage = true;
      this.resetAllStepsGoToLoanInfo();
    } else {
      this.showSuccessfullMessage = false;
      this.focusStepApplicantInfo();
    }
  }

  switchTheme(varient: string): void {
    
    const linHrefElem: HTMLLinkElement = this.document.head.querySelector('#theme-src');
    
    switch (varient) {
      case "pink":
        linHrefElem.href = 'assets/theme/pink/theme.css';
        break;
      case "default":
        linHrefElem.href = 'assets/theme/default/theme.css';
        break;
      case "green-blue-gray":
        linHrefElem.href = 'assets/theme/green-blue-gray/theme.css';
        break;

      default:
        linHrefElem.href = 'assets/theme/pink-blue-gray/theme.css';
        break;
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
  private saveLoanInfoForm() {
    const loanInfoForm = this.loanInformationFormRef.nativeElement;
    if (loanInfoForm.isValid()) {
      loanInfoForm.saveRecord();
    } else {
      this.focusStepLoanInfo();
    }
  }
  private saveApplicantInfoForm(loanRecordInfo: {}) {
    const applicantInfoForm = this.applicantInfoFormRef.nativeElement;
    //set linking field value
    applicantInfoForm.setRecordData({
      "loanapplications_record": { "id": loanRecordInfo['id'], "name": loanRecordInfo['record_locator'] }
    })

    if (applicantInfoForm.isValid()) {
      applicantInfoForm.saveRecord();
      this.isSavingInProgress = true;
    } else {
      this.focusStepApplicantInfo();
    }
  }
  private focusStepLoanInfo() {
    // refer matStepper APis
    this.loanApplicationStepper.reset();
  }
  private focusStepApplicantInfo() {
    // refer matStepper APis
  }

  private resetAllStepsGoToLoanInfo() {
    const loanInfoForm = this.loanInformationFormRef.nativeElement;
    const applicantInfoForm = this.applicantInfoFormRef.nativeElement;
    // this.focusStepLoanInfo();
    this.resetStepFormCtrls();

    // loanInfoForm.resetRecord();
    // applicantInfoForm.resetRecord();
  }
  private resetStepFormCtrls() {
    this.loanInfoFormGroup = this._formBuilder.group({
      loanInfCtrl: [false, Validators.requiredTrue]
    });
    this.applicantInfoFormGroup = this._formBuilder.group({
      applicantInfCtrl: [false, Validators.requiredTrue]
    });
  }

}
