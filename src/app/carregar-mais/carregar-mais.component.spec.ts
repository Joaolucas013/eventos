import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregarMaisComponent } from './carregar-mais.component';

describe('CarregarMaisComponent', () => {
  let component: CarregarMaisComponent;
  let fixture: ComponentFixture<CarregarMaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarregarMaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarregarMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
