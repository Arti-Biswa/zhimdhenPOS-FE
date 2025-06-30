import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient){
    const storedUser=localStorage.getItem('user');
    this.currentUserSubject =new BehaviorSubject<User|null>(
      storedUser?JSON.parse(storedUser):null
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }


}
