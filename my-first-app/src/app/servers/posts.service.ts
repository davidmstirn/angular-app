import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "../post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http.post<{ name: string }>(
      "https://ng-complete-guide-fc1b2-default-rtdb.firebaseio.com/posts.json",
      postData,
      {
        observe: "response"
      }).subscribe(res =>{
      console.log(res);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let params = new HttpParams();
    params = params.append("print", "pretty");
    params = params.append("custom", "key");

    return this.http.get<{ [key: string]: Post }>("https://ng-complete-guide-fc1b2-default-rtdb.firebaseio.com/posts.json",
      {
        headers: new HttpHeaders({"Custom-Header": "Hello"}),
        params,
        responseType: "json"
        }
      )
      .pipe(
        map((value, index) => {
        const postsArray: Post[] = [];
        for(const key in value) {
          if(value.hasOwnProperty(key)) {
            postsArray.push({...value[key], id: key})
          }
        }
        return postsArray;
      }),
        catchError(err => {
          console.log(err)
          return throwError(err);
        })
      )
  }

  deleteAllPosts() {
    return this.http.delete(
      "https://ng-complete-guide-fc1b2-default-rtdb.firebaseio.com/posts.json",
      {
        observe: "events"
      })
      .pipe(tap(event => {
        console.log(event);
        if(event.type === HttpEventType.Sent) {
          console.log("Sent");
        } else if (event.type === HttpEventType.Response) {
          console.log("Received: " + event.body);
        }
      }));
  }
}
