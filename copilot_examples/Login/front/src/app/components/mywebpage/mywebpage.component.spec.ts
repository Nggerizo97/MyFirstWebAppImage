import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MywebpageComponent } from './mywebpage.component';

describe('MywebpageComponent', () => {
  let component: MywebpageComponent;
  let fixture: ComponentFixture<MywebpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MywebpageComponent]
    });
    fixture = TestBed.createComponent(MywebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
