import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('https://ng-course-d2ec8-default-rtdb.firebaseio.com/posts.json', postData).subscribe((response) => {
      console.log(response);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http
      .get<{[key:string]:Post}>('https://ng-course-d2ec8-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((responseData)=>{
          const responseArray:Post[]=[]
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              responseArray.push({...responseData[key],id:key}); 
            }
          }
          return responseArray;
        })
      )
      .subscribe((response) => {
        this.loadedPosts=response;
      });
  }
}
