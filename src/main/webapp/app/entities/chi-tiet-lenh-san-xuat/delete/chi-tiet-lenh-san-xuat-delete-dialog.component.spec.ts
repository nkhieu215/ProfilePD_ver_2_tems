jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';

import { ChiTietLenhSanXuatDeleteDialogComponent } from './chi-tiet-lenh-san-xuat-delete-dialog.component';

describe('ChiTietLenhSanXuat Management Delete Component', () => {
  let comp: ChiTietLenhSanXuatDeleteDialogComponent;
  let fixture: ComponentFixture<ChiTietLenhSanXuatDeleteDialogComponent>;
  let service: ChiTietLenhSanXuatService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChiTietLenhSanXuatDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(ChiTietLenhSanXuatDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChiTietLenhSanXuatDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ChiTietLenhSanXuatService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
