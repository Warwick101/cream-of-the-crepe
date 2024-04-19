import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagerEditComponent } from './menu-manager-edit.component';

describe('MenuManagerEditComponent', () => {
  let component: MenuManagerEditComponent;
  let fixture: ComponentFixture<MenuManagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManagerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
