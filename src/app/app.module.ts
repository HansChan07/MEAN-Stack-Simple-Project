import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { PostsService } from './posts.service';

import { PostsComponent } from './posts/posts.component';
import { SearchComponent } from './search/search.component';
import { PostAdComponent } from './postad/postad.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'postad',
    component: PostAdComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    SearchComponent,
    PostAdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

