import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCOCXOTS_Wf-HWaglNqUamyUpVihF4TQQY',
      authDomain: 'recipe-book-3154d.firebaseapp.com',
      databaseURL: 'https://recipe-book-3154d.firebaseio.com',
      projectId: 'recipe-book-3154d',
      storageBucket: 'recipe-book-3154d.appspot.com',
      messagingSenderId: '852397948214'
    });
  }
}
