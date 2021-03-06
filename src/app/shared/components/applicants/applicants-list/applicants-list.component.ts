import { Component, OnInit, Input } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import { ApplicantBasicInfo } from '../../../models/applicant-basic-info';
import { ApplicantListService } from '../../../services/applicants/applicant-list.service';
import { SelectedApplicantBasicInfoService } from '../../../services/applicants/selected-applicant-basic-info.service';
import { CurrentSelectedCandidate } from '../../../models/current-selected-candidate';
import { CurrentSelectedCandidateService } from '../../../services/current-selected-candidate.service';
import { CurrentSlectedCandidateListService } from '../../../services/current-slected-candidate-list.service';
import { Filter, CandidateFilter } from '../../../models/searchfilter';
import { SelectedCandidatePageService } from '../../../services/pages/selected-candidate-page.service';
import { CandidatePageInfo } from '../../../models/pages/candidate-page-info';
import { CurrentSelectedCandidatePageService } from '../../../services/current-selected-candidate-page.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css']
})
export class ApplicantsListComponent implements OnInit {

  constructor( 
  private router: Router,
  private route:ActivatedRoute,
  private ApplicantListService : ApplicantListService,
  private ApplicantBasicInfoService : SelectedApplicantBasicInfoService,
  private CurrentSlectedCandidateListService: CurrentSlectedCandidateListService,
  private CurrentSelectedCandidatePageService:CurrentSelectedCandidatePageService
  ) { }
  ApplicantsList: ApplicantBasicInfo[];
  SelectedCandidateBasicInfo : ApplicantBasicInfo;
  CurrentSelectedCandidate:CurrentSelectedCandidate=new CurrentSelectedCandidate("");
  CurrentPageNo:number=1;
  TotalCandidates:number=0;
  MaxPage:number=0;
  
  cPageInfo:CandidatePageInfo= new CandidatePageInfo;
   
  PageSize: number = +environment.CandidatePageListSize;
 
  SelectedCandidateID:string;
  ngOnInit() {
    this.GetCandidatePageInfo()
    
    this.CurrentPageNo=+this.cPageInfo.PageFitler.PageNo;
    this.ApplicantListService.cast.subscribe(ApplicantsList=>this.ApplicantsList=ApplicantsList)
    this.ApplicantBasicInfoService.cast.subscribe(
      SelectedCandidateBasicInfo=>
      {
      this.SelectedCandidateBasicInfo=SelectedCandidateBasicInfo
      this.SelectedCandidateID=this.SelectedCandidateBasicInfo.CandidateID
    
      }

    );
    this.GetCandidatePageInfo();
    this.CurrentSelectedCandidatePageService.cast.subscribe(CurrentPageNo=>this.CurrentPageNo=CurrentPageNo);
    this.CurrentSelectedCandidatePageService.casTotalCandidates.subscribe(
      
      TotalCandidates=>{
        this.TotalCandidates=TotalCandidates;
        this.MaxPage= Math.ceil(this.TotalCandidates/this.PageSize);
      }
    );
  }

  GetCandidatePageInfo(){
    let a : SelectedCandidatePageService = new SelectedCandidatePageService
    this.cPageInfo= a.GetCandidatePageInfo();
}



setCandidatePageInfo(){
  let a : SelectedCandidatePageService = new SelectedCandidatePageService
   a.SetCandidatePageInfo(this.cPageInfo);
}

 GoToPreviousPage(){

  this.GetCandidatePageInfo()
  this.cPageInfo.PageFitler.PageNo = (+this.cPageInfo.PageFitler.PageNo -1).toString();
  this.CurrentPageNo=+this.cPageInfo.PageFitler.PageNo
  this.setCandidatePageInfo()
  //alert(this.cPageInfo.PageFitler.Filter.Keywords)
  this.CurrentSlectedCandidateListService.LoadCandidates(this.cPageInfo.PageFitler)

  let CurrentURL:string=this.router.url.toString().toLowerCase()
  if(CurrentURL.indexOf("candidatesx")>=0){
    this.router.navigateByUrl('/candidatesx/overview');
  } else 
  {
    this.router.navigateByUrl('/candidates/overview');
  }
  

}


  GoToNextPage(){ 
    this.GetCandidatePageInfo()
    this.cPageInfo.PageFitler.PageNo = (+this.cPageInfo.PageFitler.PageNo +1).toString();
    this.CurrentPageNo=+this.cPageInfo.PageFitler.PageNo
    this.setCandidatePageInfo()

   // alert(this.cPageInfo.PageFitler.Filter.Keywords)

   this.CurrentSlectedCandidateListService.LoadCandidates(this.cPageInfo.PageFitler)
   let CurrentURL:string=this.router.url.toString().toLowerCase()
   if(CurrentURL.indexOf("candidatesx")>=0){
     this.router.navigateByUrl('/candidatesx/overview');
   } else 
   {
     this.router.navigateByUrl('/candidates/overview');
   }
        
 }


  

}
