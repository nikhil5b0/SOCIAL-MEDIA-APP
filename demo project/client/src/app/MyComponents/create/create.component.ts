import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  regForm: FormGroup;
  storyForm: FormGroup
  avatar: any = '';
  name: any = '';
  userId: any = '';
  userId1: any = '';
  posts: any[] = [];
  showCommentInput: boolean = false;
  content: string = '';
  comments: any[] = [];
  likes: any[] = [];
  followersData: any[] = [];
  stories: any[] = []
  showComments = false
  user: any = {}

  post: any = {
    _id: 1,
    commentInput: ''
  };

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      content: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      mediaUrl: new FormControl(null, Validators.required)
    })


    this.storyForm = new FormGroup({
      title:new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      mediaUrl: new FormControl(null, Validators.required)
    })
    const token = localStorage.getItem("token")
    if (!token) {
      this.route.navigate(['/login'])
    }
    const userId1= localStorage.getItem("userId")
    this.http.get<any>(`http://localhost:5100/user/${userId1}`).subscribe((res)=>{
      this.user = res
    })

    this.http.get<any[]>('http://localhost:5100/comments').subscribe((res) => {
      this.comments = res
    })

    this.http.get<any[]>('http://localhost:5100/likes').subscribe((res) => {
      this.likes = res
    })

    this.http.get<any[]>('http://localhost:5100/follow').subscribe((res) => {
      this.followersData = res
    })

    this.http.get<any[]>('http://localhost:5100/stories').subscribe((res) => {
      this.stories = res
      
    })



    const avatar = localStorage.getItem('userAvatar')
    this.avatar = avatar
    const name = localStorage.getItem('userName')
    this.name = name
    const userId = localStorage.getItem("userId")
    this.userId = userId

    this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe((res) => {
      this.posts = res;
    });


  }

  
  onShowComments(){
    this.showComments = !this.showComments
  }

  onSubmit(details = { mediaUrl: String, content: String,description:String }): void {
    const post = {
      userId: this.userId,
      mediaUrl: details.mediaUrl,
      content: details.content,
      description:details.description,
      mediaType: 'Image',
    }
    this.http.post('http://localhost:5100/posts', post)
      .subscribe(
        response => {
          alert("Your post had posted Successfully!")
          console.log('Post successful:', response);
          this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe((res) => {
            this.posts = res;
          });
        },
        error => {
          alert("Falied to post!")
          console.error('Error posting:', error);
        }
      );
  }



  uploadStory(details: { title: string, mediaUrl: string, description: string }): void {
    const story = {
      userId: this.userId,
      title: details.title,
      description: details.description,
      imageUrl: details.mediaUrl,
    };
  
    this.http.post('http://localhost:5100/stories', story).subscribe(
      response => {
        alert('Your story had uploaded successfully!!');
        console.log('Uploaded successfully:', response);
        this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe(res => {
          this.posts = res;
        });
      },
      error => {
        alert('Uploading story is Failed!!');
        console.error('Error posting:', error);
      }
    );
  }
}
