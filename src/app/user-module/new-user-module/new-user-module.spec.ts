import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserModule } from './new-user-module';

describe('NewUserModule', () => {
  let component: NewUserModule;
  let fixture: ComponentFixture<NewUserModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
