/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostadComponent } from './postad.component';

describe('PostadComponent', () => {
  let component: PostadComponent;
  let fixture: ComponentFixture<PostadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
