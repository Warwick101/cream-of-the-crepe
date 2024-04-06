import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagerViewComponent } from './menu-manager-view.component';

describe('MenuManagerViewComponent', () => {
  let component: MenuManagerViewComponent;
  let fixture: ComponentFixture<MenuManagerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManagerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
