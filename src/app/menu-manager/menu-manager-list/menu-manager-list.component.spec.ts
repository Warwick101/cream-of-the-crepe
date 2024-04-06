import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagerListComponent } from './menu-manager-list.component';

describe('MenuManagerListComponent', () => {
  let component: MenuManagerListComponent;
  let fixture: ComponentFixture<MenuManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManagerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
