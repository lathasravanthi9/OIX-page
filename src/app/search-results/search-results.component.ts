import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  
  imports: [
    BrowserModule,
    FormsModule
  ],
  
})

/** @title Responsive sidenav */
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnDestroy, OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  name = '';
  arr: any[];
  paramsArray: any[];
  params: any;
  text = ''; //default input state
  post;
  
  values = '';

  elementClicked: string;
  searchboxID: any;
  searchBoxDropdown: any;
  titleSpan: any;
  contentSpan: any;
  letterSpan: any;
  productSpan: any;
  searchfilterul: any;
  searchfilterlist: any;
  listElementValue: any;
  liArray: any;

  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.arr = [];
    this.liArray = [];
  }

  @ViewChild("box", { static: true }) searchField: ElementRef;
  
  ngOnInit() {

    this.cacheDom();
    this.bindEvents();

    var placeHolder = ['  SEARCH for keyword : "IBM Cloud"', 
                       '  SEARCH for letter number : "ENUSLP19-0245"',
                       '  SEARCH for Document Number : "319-105"'];
    var n = 0;
    var loopLength = placeHolder.length;
  
    setInterval(function() {
      if (n < loopLength) {
        var newPlaceholder = placeHolder[n];
        n++;
        $("[placeHolder]").attr("placeholder", newPlaceholder);
      } else {
        $("[placeHolder]").attr("placeholder", placeHolder[0]);
        n = 0;
      }
    }, 3000);
    
  }
  
  cacheDom() {
    this.searchboxID = $("#MPPEFSCH");
    this.searchBoxDropdown = $("#search_filter");
    this.titleSpan = $("#title");
    this.contentSpan = $("#content");
    this.letterSpan = $("#letternum");
    this.productSpan = $("#productnum");
    this.searchfilterul = $("#search_filter_ul");
    this.searchfilterlist = $("#search_filter_ul li");
    this.listElementValue = $("#MPPEFFTR");
  }


  bindEvents() {        
    $(document).click(function(e) {
      if (e.target.id !== 'MPPEFSCH') {
        $("#search_filter").hide();
      }
    });

    this.searchBoxDropdown.hide();

    $(this.searchfilterlist).hover(function () {
      $(this).toggleClass("selected").siblings().removeClass("selected");
    });    
  }

  change(e){
    var listItems =  this.searchfilterlist;

    var key = e.keyCode,
        selected = listItems.filter('.selected'),
        current;

    if ( key != 40 && key != 38 ) return;

    listItems.removeClass('selected');

    if ( key == 40 ){ // Down key
        if ( ! selected.length || selected.is(':last-child') ) {
            current = listItems.eq(0);
        } else {
            current = selected.next();
        }
    }
    else if ( key == 38 ) { // Up key
        if ( ! selected.length || selected.is(':first-child') ) {
            current = listItems.last();
        } else {
            current = selected.prev();
        }
    }
  
    current.addClass('selected') ;
  }

  one(e){
    this.searchBoxDropdown.show();
  }

  eventHandler(e){
   if(e.keyCode == 13) {
    var searchText = this.searchboxID.val();  //get search value typed 
    var count = 0;
    searchText = searchText.replace(/\s/g, "");  
    //alert("e for click"+e);
    if (typeof e === 'undefined' && window.event) {
      e = window.event;
    }

    console.log($("#search_filter_ul li").hasClass("selected"));
    
    // To pass value of the selected filter to MPPEFFTR on enterkey press
    if ($("#search_filter_ul li").hasClass("selected") && e.keyCode === 13 ) {
      // variable that stores the attribute value of the selected list ele
      var id = $('#search_filter_ul li.selected').attr('value');
      console.log("searchtext:"+searchText+id);
      this.listElementValue.val(id);
      alert("value selected:"+id);
      this.liArray.push(id);
      // $("#search_filter").hide();
      this.searchBoxDropdown.hide();
    }
    //To set MPPEFFTR value to contents by default, if enterkey is pressed without selecting any filter
    else if (e.keyCode === 13) {
      $("#MPPEFFTR").val("CONTENTS");
      this.listElementValue.val("CONTENTS");
      this.liArray.push("MPPEFFTR");
      console.log(this.listElementValue.val("CONTENTS"));
      // searchpageSubmit.loadHitlist();
    }
  }
  }

  onKey(event: any) { 

    // this.values = (<HTMLInputElement>event.target).value;
    
    var keyCode = event.which;
    // console.log(keyCode);
    // To get the search text the user typed in search box
    var searchText = this.searchboxID.val();
    // Show dropdown filter if any key other than Enter key(13)is pressed
    if ((searchText.length > 0) && (keyCode !== 13)) {
      this.searchBoxDropdown.show();
    } else {
    // To hide the search filter dropdown
    this.searchBoxDropdown.hide();
    }

  }

  clear() {
      this.post = this.text;
      this.text = ''; // again changing the input to blank
      this.values = '';
  }

  liSelect(e){
    var searchText = this.searchboxID.val();  //get search value typed 
    searchText = searchText.replace(/\s/g, "");  
    //alert("e for click"+e);
    if (typeof e === 'undefined' && window.event) {
      e = window.event;
    }

    console.log($("#search_filter_ul li").hasClass("selected"));
    
    // To pass value of the selected filter to MPPEFFTR on enterkey press
    if ($("#search_filter_ul li").hasClass("selected")){
      // variable that stores the attribute value of the selected list ele
      var id = $('#search_filter_ul li.selected').attr('value');
      
      console.log("searchtext:"+searchText);
      console.log("searchID"+id);

      this.listElementValue.val(id);
      this.liArray.push(id);
      alert("value selected:"+id);
      this.searchBoxDropdown.hide();
      this.searchField.nativeElement.focus(); 
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}

