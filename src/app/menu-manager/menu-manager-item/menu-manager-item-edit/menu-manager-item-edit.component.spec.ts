import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagerItemEditComponent } from './menu-manager-item-edit.component';

describe('MenuManagerItemEditComponent', () => {
  let component: MenuManagerItemEditComponent;
  let fixture: ComponentFixture<MenuManagerItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuManagerItemEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagerItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
