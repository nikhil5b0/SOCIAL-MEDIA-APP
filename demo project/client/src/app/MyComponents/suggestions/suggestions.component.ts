import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent {
  users:any[]=[];
  name: any = '';
  avatar:any='';
  userId: any = '';
  followingId:any='';
  followersData: any[] = [];

  following: any[] = []

  user: any = {}
  constructor(private http: HttpClient, private route: Router){
    this.http.get<any[]>(`http://localhost:5100/register`).subscribe((res) => {
      this.users = res;
    });
    const name = localStorage.getItem('userName')
    this.name = name
    const avatar = localStorage.getItem('userAvatar')
    this.avatar = avatar

    const userId = localStorage.getItem("userId")
    this.userId=userId
    this.http.get<any>(`http://localhost:5100/user/${userId}`).subscribe((res)=>{
      this.user = res
    })




    
  }



  followUser(user: any) {
    const userDetails = {
      userId: this.userId,
      followingId: user._id
    }
    this.http.post(`http://localhost:5100/follow`, userDetails).subscribe((res) => {
      alert(`You are following ${user.username}`)
    })

    this.http.get<any[]>('http://localhost:5100/follow').subscribe((res) => {
      this.followersData = res
    })
  }



  

  unfollowUser(user: any): void {
    const data = {
      followingId: user._id
    };

    this.http.delete<any>('http://localhost:5100/follow', { body: data })
      .subscribe(
        response => {
          alert(`You unfollowed ${user.username}`);
          this.refreshFollowersData();
          this.http.put(`http://localhost:5100/user/${this.userId}/follow`, this.userId).subscribe((res) => {
          })
        },
        error => {
          console.error(error);
        }
      );
      const followingId = user._id;
      const followerId = localStorage.getItem('userId');
        this.http.put(`http://localhost:5100/follow/${followingId}/${followerId}`,this.followingId).subscribe((res)=>{
  
        });
   }
  refreshFollowersData(): void {
    this.http.get<any[]>('http://localhost:5100/follow').subscribe((res) => {
      this.followersData = res;
    });
  }

}
