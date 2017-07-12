import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-postad',
  templateUrl: './postad.component.html',
  styleUrls: ['./postad.component.css']
})
export class PostAdComponent implements OnInit {
  model: any = {};
  error = '';
  
  // baseApiUrl: String = "http://localhost:3000/api/";
  baseApiUrl: String = "/api/";
  photoFile: File = null;

  public photoFileString: string;
  static photoStaticImage: string = "";
  static photoStaticImageName: string = "";

  adData: any = {};

  constructor(private router: Router, private postsService: PostsService) { }

  ngOnInit() {
    // Initialize the search box and autocomplete
      let searchBox: any = document.getElementById('search-box');
      let options = {
        types: [
            // return only geocoding results, rather than business results.
            'geocode',
        ],
        componentRestrictions: { country: 'my' }
      };

      // var autocomplete = new google.maps.places.Autocomplete(searchBox, options);

      // // Add listener to the place changed event
      // autocomplete.addListener('place_changed', () => {
      //     let place = autocomplete.getPlace();
      //     let lat = place.geometry.location.lat();
      //     let lng = place.geometry.location.lng();
      //     let address = place.formatted_address;
      //     // this.placeChanged(lat, lng, address);
      //     // console.log(address);
      // });
  }

  onSubmit(f: NgForm) {
    // console.log(f.value);
    // console.log(f.valid);


    this.adData.ad_title = (document.getElementById('ad_title') as HTMLInputElement).value;
    this.adData.ad_description = (document.getElementById('ad_title') as HTMLInputElement).value;
    this.adData.image_url = (document.getElementById('image_url') as HTMLInputElement).value;
    // this.adData.image_binary = this.photoFile;PostAdComponent.photoStaticImage
    this.adData.image_binary = PostAdComponent.photoStaticImage;
    this.adData.image_name = PostAdComponent.photoStaticImageName;
    this.adData.ad_category = (document.getElementById('ad_category') as HTMLInputElement).value;
    this.adData.ad_field10 = (document.getElementById('ad_field10') as HTMLInputElement).value;
    this.adData.ad_field11 = (document.getElementById('ad_field11') as HTMLInputElement).value;

    let body = new FormData();
    body.append('ad_title', this.adData.ad_title);
    body.append('ad_description', this.adData.ad_description);
    body.append('image_url', this.adData.image_url);
    body.append('image_binary', this.adData.image_binary);
    body.append('image_name', this.adData.image_name);

    body.append('ad_category', this.adData.ad_category);
    body.append('ad_field10', this.adData.ad_field10);
    body.append('ad_field11', this.adData.ad_field11);

    console.log("-----------start----------");
    // this.postsService.postAdData(this.baseApiUrl + 'postonead', body, this.photoFile);
    this.postsService.postAdData(this.baseApiUrl + 'postonead', body, this.photoFile).then(result => {
      // console.log(result);
      console.log(result);
    });
    console.log("------------end---------");

    f.reset();
    (document.getElementById('thumbnail') as HTMLImageElement).src = "#";
    (document.getElementById('insert_image') as HTMLInputElement).value = "";

    // this.postsService.postAdData(this.baseApiUrl + 'postonead', f.value, this.photoFile).then(result => {
    //   // console.log(result);
    //   console.log("sssss");
    // });
    // this.router.navigate(['/search']);
  }

// submitPost()
//     {        
//         console.log("submit Post click happend ");
//     }

   onChange(event: EventTarget) {
       let url;
       let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
       let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
       let files: FileList = target.files;
       let file = files[0];

       this.photoFile = file;

       var ss;

       PostAdComponent.photoStaticImage = "";
       if (files && file)
       {
           var reader = new FileReader();
           reader.onload = function(e: any) {
              //  (document.getElementById('thumbnail') as HTMLImageElement).src = "data:image/png;base64," + e.target.result;
              //  (document.getElementById('image_url') as HTMLInputElement).value = "http://sturmansapp.machinetalkers.com/upload/photos/" + file.name;

               PostAdComponent.photoStaticImage = btoa(e.target.result);
           }

          //  reader.readAsDataURL(file);
          reader.readAsBinaryString(file);

          var reader2 = new FileReader();
           reader2.onload = function(e: any) {
               (document.getElementById('thumbnail') as HTMLImageElement).src = e.target.result;
              //  (document.getElementById('image_url') as HTMLInputElement).value = "http://localhost:3000/upload/" + file.name;
               (document.getElementById('image_url') as HTMLInputElement).value = "" + file.name;
               PostAdComponent.photoStaticImageName = file.name;

              //  PostAdComponent.photoStaticImage = btoa(e.target.result);
           }

           reader2.readAsDataURL(file);
          // reader2.readAsBinaryString(file);

       }

   }

   onCancel() {
       this.router.navigate(['/login']);
   }
}
