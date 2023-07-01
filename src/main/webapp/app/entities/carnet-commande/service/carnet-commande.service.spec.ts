import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICarnetCommande } from '../carnet-commande.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../carnet-commande.test-samples';

import { CarnetCommandeService } from './carnet-commande.service';

const requireRestSample: ICarnetCommande = {
  ...sampleWithRequiredData,
};

describe('CarnetCommande Service', () => {
  let service: CarnetCommandeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICarnetCommande | ICarnetCommande[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CarnetCommandeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CarnetCommande', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const carnetCommande = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(carnetCommande).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CarnetCommande', () => {
      const carnetCommande = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(carnetCommande).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CarnetCommande', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CarnetCommande', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CarnetCommande', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCarnetCommandeToCollectionIfMissing', () => {
      it('should add a CarnetCommande to an empty array', () => {
        const carnetCommande: ICarnetCommande = sampleWithRequiredData;
        expectedResult = service.addCarnetCommandeToCollectionIfMissing([], carnetCommande);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(carnetCommande);
      });

      it('should not add a CarnetCommande to an array that contains it', () => {
        const carnetCommande: ICarnetCommande = sampleWithRequiredData;
        const carnetCommandeCollection: ICarnetCommande[] = [
          {
            ...carnetCommande,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCarnetCommandeToCollectionIfMissing(carnetCommandeCollection, carnetCommande);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CarnetCommande to an array that doesn't contain it", () => {
        const carnetCommande: ICarnetCommande = sampleWithRequiredData;
        const carnetCommandeCollection: ICarnetCommande[] = [sampleWithPartialData];
        expectedResult = service.addCarnetCommandeToCollectionIfMissing(carnetCommandeCollection, carnetCommande);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(carnetCommande);
      });

      it('should add only unique CarnetCommande to an array', () => {
        const carnetCommandeArray: ICarnetCommande[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const carnetCommandeCollection: ICarnetCommande[] = [sampleWithRequiredData];
        expectedResult = service.addCarnetCommandeToCollectionIfMissing(carnetCommandeCollection, ...carnetCommandeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const carnetCommande: ICarnetCommande = sampleWithRequiredData;
        const carnetCommande2: ICarnetCommande = sampleWithPartialData;
        expectedResult = service.addCarnetCommandeToCollectionIfMissing([], carnetCommande, carnetCommande2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(carnetCommande);
        expect(expectedResult).toContain(carnetCommande2);
      });

      it('should accept null and undefined values', () => {
        const carnetCommande: ICarnetCommande = sampleWithRequiredData;
        expectedResult = service.addCarnetCommandeToCollectionIfMissing([], null, carnetCommande, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(carnetCommande);
      });

      it('should return initial array if no CarnetCommande is added', () => {
        const carnetCommandeCollection: ICarnetCommande[] = [sampleWithRequiredData];
        expectedResult = service.addCarnetCommandeToCollectionIfMissing(carnetCommandeCollection, undefined, null);
        expect(expectedResult).toEqual(carnetCommandeCollection);
      });
    });

    describe('compareCarnetCommande', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCarnetCommande(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCarnetCommande(entity1, entity2);
        const compareResult2 = service.compareCarnetCommande(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCarnetCommande(entity1, entity2);
        const compareResult2 = service.compareCarnetCommande(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCarnetCommande(entity1, entity2);
        const compareResult2 = service.compareCarnetCommande(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
