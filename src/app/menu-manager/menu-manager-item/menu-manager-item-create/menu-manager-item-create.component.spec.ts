import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagerItemCreateComponent } from './menu-manager-item-create.component';

describe('MenuManagerItemCreateComponent', () => {
  let component: MenuManagerItemCreateComponent;
  let fixture: ComponentFixture<MenuManagerItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManagerItemCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagerItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
