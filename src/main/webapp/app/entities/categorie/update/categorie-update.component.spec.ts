import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CategorieFormService } from './categorie-form.service';
import { CategorieService } from '../service/categorie.service';
import { ICategorie } from '../categorie.model';

import { CategorieUpdateComponent } from './categorie-update.component';

describe('Categorie Management Update Component', () => {
  let comp: CategorieUpdateComponent;
  let fixture: ComponentFixture<CategorieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let categorieFormService: CategorieFormService;
  let categorieService: CategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CategorieUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CategorieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategorieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    categorieFormService = TestBed.inject(CategorieFormService);
    categorieService = TestBed.inject(CategorieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const categorie: ICategorie = { id: 456 };

      activatedRoute.data = of({ categorie });
      comp.ngOnInit();

      expect(comp.categorie).toEqual(categorie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategorie>>();
      const categorie = { id: 123 };
      jest.spyOn(categorieFormService, 'getCategorie').mockReturnValue(categorie);
      jest.spyOn(categorieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categorie }));
      saveSubject.complete();

      // THEN
      expect(categorieFormService.getCategorie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(categorieService.update).toHaveBeenCalledWith(expect.objectContaining(categorie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategorie>>();
      const categorie = { id: 123 };
      jest.spyOn(categorieFormService, 'getCategorie').mockReturnValue({ id: null });
      jest.spyOn(categorieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categorie }));
      saveSubject.complete();

      // THEN
      expect(categorieFormService.getCategorie).toHaveBeenCalled();
      expect(categorieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategorie>>();
      const categorie = { id: 123 };
      jest.spyOn(categorieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(categorieService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
