import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CarnetCommandeDetailComponent } from './carnet-commande-detail.component';

describe('CarnetCommande Management Detail Component', () => {
  let comp: CarnetCommandeDetailComponent;
  let fixture: ComponentFixture<CarnetCommandeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarnetCommandeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ carnetCommande: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CarnetCommandeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CarnetCommandeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load carnetCommande on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.carnetCommande).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
