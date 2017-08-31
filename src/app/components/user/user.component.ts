import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  hobbies:string[];
  posts:Post[];
  isEdit:boolean = false;

  constructor(private dataService:DataService) { 
  }

  ngOnInit() {
    this.name = 'John Doe';
    this.age = 30;
    this.email = 'jdoe@gmail.com';
    this.address = {
      street:'50 Main st',
      city:'Boston',
      state:'MA'
    };
    this.hobbies = ['Write code', 'Watch movies', 'Listen to music'];
    
    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  addHobby(hobby) {
    this.hobbies.unshift(hobby);
    return false;
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  deleteHobby(hobby) {
    for (let i = 0; i < this.hobbies.length; i++) {
      if(this.hobbies[i] == hobby) {
        this.hobbies.splice(i, 1);
      }
    }
  }
}

interface Address {
  street:string,
  city:string,
  state:string
}

interface Post {
  body:string,
  id:number,
  title:string,
  userId:number
}