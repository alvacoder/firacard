import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent implements OnInit {
  dummyText = `This document can be printed for reference by using the print command in the settings of any browser.
  Owner and Data Controller
  Attic Hall Ltd
  Denton Crescent
  Braintree, Essex, CM77 8ZZ
  Owner contact email: support@Firacard.com
  Types of Data collected
  Among the types of Personal Data that Firacard collects, by itself or through third parties, there are: Cookies; Usage Data; email address; first name; last name; Universally unique identifier (UUID); unique device identifiers for advertising (Google Advertiser ID or IDFA, for example).
  Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.
  Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using Firacard.
  Unless specified otherwise, all Data requested by Firacard is mandatory and failure to provide this Data may make it impossible for Firacard to provide its services. In cases where Firacard specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service.
  Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.
  Any use of Cookies – or of other tracking tools – by Firacard or by the owners of third-party services used by Firacard serves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy, if available.
  Users are responsible for any third-party Personal Data obtained, published or shared through Firacard and confirm that they have the third party's consent to provide the Data to the Owner.
  
 `
  constructor() { }

  ngOnInit(): void {
  }

}
