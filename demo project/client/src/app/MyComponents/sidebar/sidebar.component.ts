


import { Component } from '@angular/core';
// import { faBars, faTachometerAlt, faShoppingBag, faShoppingCart, faTags, faMoneyBill,faComment,faUsers } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public isSidebarHidden = false;
  user: any = {}
  followers: any[] = []
  following: any[] = []
  posts: any[] = []
  avatar: any = ''
  public data = [
    {
      path: '/feeds',
      icon: 'fa fa-feed',
      name: 'Feed'
    },
    {
      path: '/friends',
      icon: 'fa fa-users',
      name: 'Friends'
    },
    {
      path: '/create',
      icon: 'fa fa-plus',
      name: 'Add Story/Post'

    }
  ];
  

  constructor(private http:HttpClient) {
    const avatar = localStorage.getItem('userAvatar')
    this.avatar = avatar


    const userId = localStorage.getItem("userId")
    this.http.get<any>(`http://localhost:5100/user/${userId}`).subscribe((res)=>{
      this.user = res
    })

    this.http.get<any[]>(`http://localhost:5100/followers/${userId}`).subscribe((res)=>{
      this.followers = res
    })

    this.http.get<any[]>(`http://localhost:5100/following/${userId}`).subscribe((res)=>{
      this.following = res
    })

    this.http.get<any[]>(`http://localhost:5100/post/${userId}`).subscribe((res)=>{
      this.posts = res
      console.log(res)
    })
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}

