import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
  isLoading=false
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


  deletepost(id: string): void {
    this.http.delete(`http://localhost:5100/posts/${id}`).subscribe((res) => {
      window.alert('Post is deleted')
      const userId = localStorage.getItem('userId')
      this.http.get<any[]>(`http://localhost:5100/posts/${userId}`).subscribe((res) => {
        this.posts = res;
      });
    });

  }

  deletecomment(id:string):void{
    this.http.delete(`http://localhost:5100/comments/${id}`).subscribe((res) => {
      window.alert('Comment is deleted')
      const userId = localStorage.getItem('userId')
      this.http.get<any[]>(`http://localhost:5100/comments`).subscribe((res) => {
        this.comments = res;
      });
    });

  }
  
  onShowComments(){
    this.showComments = !this.showComments
  }

 




  dislikePost(post: any): void {
    post.isLiked==post.isLiked;
    const dislikeData = {
      postId: post._id,
    };

    this.http.post(`http://localhost:5100/dislike/${dislikeData.postId}`, dislikeData)
      .subscribe(
        (res: any) => {
          alert("Disliked")
        },
        (error) => {
          console.error(error);
        }
      );

  }


  likePost(postId: any): void {
    // postId.isLiked = !postId.isLiked;

    this.http.put(`http://localhost:5100/posts/${postId}/likes`, {})
      .subscribe(
        (res: any) => {
          this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe((res) => {
            this.posts = res;
          });
        },
        (error) => {
          console.error(error);
          alert("Failed to like");
        }
      );

  }


  followUser(post: any) {
    const postDetails = {
      userId: this.userId,
      followingId: post.userId._id
    }
    this.http.post(`http://localhost:5100/follow`, postDetails).subscribe((res) => {
      alert(`You are following ${post.userId.username}`)
    })

    this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe((res) => {
            this.posts = res;
          });

    this.http.get<any[]>('http://localhost:5100/follow').subscribe((res) => {
      this.followersData = res
    })
  }


  unfollowUser(post: any): void {
    const data = {
      followingId: post.userId._id
    };

    this.http.delete<any>('http://localhost:5100/follow', { body: data })
      .subscribe(
        response => {
          alert(`You unfollowed ${post.userId.username}`);
          this.refreshFollowersData();
          this.http.put(`http://localhost:5100/user/${this.userId}/follow`, this.userId).subscribe((res) => {
          })

          this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe((res) => {
            this.posts = res;
          });
        },
        error => {
          console.error(error);
        }
      );
      const followingId = post.userId._id;
      const followerId = localStorage.getItem('userId');
        this.http.put(`http://localhost:5100/follow/${followingId}/${followerId}`,followingId).subscribe((res)=>{
  
        });
  }

  refreshFollowersData(): void {
    this.http.get<any[]>('http://localhost:5100/follow').subscribe((res) => {
      this.followersData = res;
    });
  }


  sendComment(postId: string, commentInput: string) {
    this.http.post('http://localhost:5100/comments', { userId: this.userId, postId, content: commentInput }).subscribe(
      (response) => {
        this.http.get<any[]>('http://localhost:5100/comments').subscribe((res) => {
          this.comments = res
          this.post.commentInput = '';
          this.http.get<any[]>(`http://localhost:5100/posts/${this.userId}`).subscribe((res) => {
            this.posts = res;
          });

        })
      },
      (error) => {
        console.error('Failed to post comment:', error);
      }
    );
  }

  clearCommentInput() {
    // Clear the comment input field
    this.post.commentInput = '';
  }
}
