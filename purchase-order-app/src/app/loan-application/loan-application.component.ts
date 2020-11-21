import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  isLinear = false;
  @ViewChild('loanApplicationFormRef') loanApplicationFormRef: ElementRef;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  loanApplicationFormOnloadHandler(eventData) {
     this.hideRecordFormHeader(this.loanApplicationFormRef);
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
