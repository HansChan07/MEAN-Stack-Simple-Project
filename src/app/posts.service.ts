import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/map';
// declare axios for making http requests
const axios = require('axios');

@Injectable()
export class PostsService {

  constructor(private router: Router,
    private http: Http) {
    this.http = http;
  }

  requestUrl: String;
  responseData: any;
  handleError: any;

  // Get all posts from the API
  getAllPosts() {
    // return this.http.get('/api/posts')
    //   .map(res => res.json());
    return this.http.get('/api/getad')
      .map(res => res.json());
  }

  // Post Ad to the API
  postAdData(url: String, postData: any, file: File) {

    // console.log("=========send post===========");
    console.log(url);

    var headers = new Headers();
    headers.append('Content-Type', 'application/form-data');
    let options = new RequestOptions({headers: headers});

    var returnResponse = new Promise((resolve, reject) => {
      axios.post(url, postData, options).then(function(response) {
        // console.log(response);
        returnResponse = response;
        return response;
      })
      .catch(function(error) {
        // console.log(error);
        returnResponse =error;
        return error;
      });
    });
    return returnResponse;
  }
}
