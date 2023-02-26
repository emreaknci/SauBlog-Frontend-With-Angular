import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNickNameComponent } from './change-nick-name.component';

describe('ChangeNickNameComponent', () => {
  let component: ChangeNickNameComponent;
  let fixture: ComponentFixture<ChangeNickNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeNickNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeNickNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
