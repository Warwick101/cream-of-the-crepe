import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagerCreateComponent } from './menu-manager-create.component';

describe('MenuManagerCreateComponent', () => {
  let component: MenuManagerCreateComponent;
  let fixture: ComponentFixture<MenuManagerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManagerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
