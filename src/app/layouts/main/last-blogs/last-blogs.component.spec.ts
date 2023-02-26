import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastBlogsComponent } from './last-blogs.component';

describe('LastBlogsComponent', () => {
  let component: LastBlogsComponent;
  let fixture: ComponentFixture<LastBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastBlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
