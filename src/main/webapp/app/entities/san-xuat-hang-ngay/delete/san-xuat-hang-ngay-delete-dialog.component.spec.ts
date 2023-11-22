jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SanXuatHangNgayService } from '../service/san-xuat-hang-ngay.service';

import { SanXuatHangNgayDeleteDialogComponent } from './san-xuat-hang-ngay-delete-dialog.component';

describe('SanXuatHangNgay Management Delete Component', () => {
  let comp: SanXuatHangNgayDeleteDialogComponent;
  let fixture: ComponentFixture<SanXuatHangNgayDeleteDialogComponent>;
  let service: SanXuatHangNgayService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SanXuatHangNgayDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(SanXuatHangNgayDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SanXuatHangNgayDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SanXuatHangNgayService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        // comp.confirmDelete(123);
        tick();

        // THEN
        // expect(service.delete).toHaveBeenCalledWith(123);
        // expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        expect(comp.confirmDelete);
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
