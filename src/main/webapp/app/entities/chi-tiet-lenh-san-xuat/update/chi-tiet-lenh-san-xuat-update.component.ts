import { ApplicationConfigService } from './../../../core/config/application-config.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';
import { ILenhSanXuat, LenhSanXuat } from 'app/entities/lenh-san-xuat/lenh-san-xuat.model';
import { LenhSanXuatService } from 'app/entities/lenh-san-xuat/service/lenh-san-xuat.service';

@Component({
  selector: 'jhi-chi-tiet-lenh-san-xuat-update',
  templateUrl: './chi-tiet-lenh-san-xuat-update.component.html',
  styleUrls: ['./chi-tiet-lenh-san-xuat-update.component.css'],
})
export class ChiTietLenhSanXuatUpdateComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat');
  resourceUrlUpdate = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat/update');
  selectedAllResult?: boolean;
  selectedAll = 1;
  checkedList: any;
  @Input() selectedItems: { checked: string }[] = [];
  @Input() storageUnit = '';

  @Input() itemPerPage = 10;
  @Input() itemPerPage2 = 10;

  page?: number;
  page2?: number;

  showScanInput = false;

  sum = 0;

  isSaving = false;
  predicate!: string;
  ascending!: boolean;

  @Input() reelID = '';

  selectedStatus = '';

  changeStatus: {
    id: number;
    totalQuantity: string;
    trangThai: string;
  } = { id: 0, totalQuantity: '', trangThai: '' };

  chiTietLenhSanXuats: IChiTietLenhSanXuat[] = [];
  //tạo danh sách lệnh sản xuất ở trạng thái active
  chiTietLenhSanXuatActive: IChiTietLenhSanXuat[] = [];
  //tạo danh sách lệnh sản xuất không có trong danh sách
  chiTietLenhSanXuatNotList: IChiTietLenhSanXuat[] = [];
  // tạo biến lưu trữ giá trị scan
  @Input() scanResults = '';
  // tạo biến check sự tồn tại trong danh sách
  isExisted = false;
  scanValue: IChiTietLenhSanXuat = {
    id: 0,
    reelID: 'null',
    partNumber: 'null',
    vendor: 'null',
    lot: 'null',
    userData1: 'null',
    userData2: 'null',
    userData3: 'null',
    userData4: 'null',
    userData5: 0,
    initialQuantity: 0,
    msdLevel: '',
    msdInitialFloorTime: '',
    msdBagSealDate: '',
    marketUsage: '',
    quantityOverride: 0,
    shelfTime: '',
    spMaterialName: '',
    warningLimit: '',
    maximumLimit: '',
    comments: '',
    warmupTime: '',
    storageUnit: 'null',
    subStorageUnit: '',
    locationOverride: '',
    expirationDate: 'null',
    manufacturingDate: 'null',
    partClass: '',
    sapCode: 'null',
    trangThai: 'Inactive',
    checked: 1,
  };
  lenhSanXuatsSharedCollection: ILenhSanXuat[] = [];
  scanResult = this.fb.group({
    result: [],
  });

  countScan = 0;
  tienDoScan = 0;
  resultScanPerCent = '';

  editForm = this.fb.group({
    id: [],
    maLenhSanXuat: [null, [Validators.required]],
    sapCode: [],
    sapName: [],
    workOrderCode: [],
    version: [],
    storageCode: [],
    totalQuantity: [],
    createBy: [],
    entryTime: [],
    trangThai: [],
    comment: [],
  });

  initialQuantity: any;

  constructor(
    protected chiTietLenhSanXuatService: ChiTietLenhSanXuatService,
    protected lenhSanXuatService: LenhSanXuatService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected http: HttpClient
  ) {}

  ngOnInit(): void {
    // bắt sự kiện scan
    this.scanResult.valueChanges.subscribe(data => {
      console.log('data: ', data.length);
    });

    this.activatedRoute.data.subscribe(({ lenhSanXuat }) => {
      // console.log('test: ', lenhSanXuat);
      this.changeStatus.id = lenhSanXuat.id;
      this.changeStatus.totalQuantity = lenhSanXuat.totalQuantity;
      // console.log(this.changeStatus);
      this.http.get<any>(`${this.resourceUrl}/${lenhSanXuat.id as number}`).subscribe(res => {
        this.chiTietLenhSanXuats = res;
        console.log('res', res);
        console.log('lenhSanXuat', this.chiTietLenhSanXuats);
        //lấy danh sách chi tiết lsx ở trạng thái active
        this.chiTietLenhSanXuatActive = this.chiTietLenhSanXuats.filter(a => a.trangThai === 'Active');
        this.itemPerPage = this.chiTietLenhSanXuatActive.length;
        // sắp xếp danh sách
        this.chiTietLenhSanXuatActive.sort(function (a, b) {
          if (a.checked !== undefined && a.checked !== null && b.checked !== undefined && b.checked !== null) {
            return a.checked - b.checked;
          }
          return 0;
        });
        //lấy danh sách chi tiết lsx không có trong danh sách
        this.chiTietLenhSanXuatNotList = this.chiTietLenhSanXuats.filter(a => a.trangThai === 'not list');
        console.log('active list: ', this.chiTietLenhSanXuatActive);
        console.log('not list list: ', this.chiTietLenhSanXuatNotList);
        console.log('so luong tem active', this.chiTietLenhSanXuatActive.length);
      });
      this.updateForm(lenhSanXuat);
      console.log('id: ', this.editForm.get(['id'])!.value);
      // this.loadRelationshipsOptions();
    });
  }

  changeAllStorageUnit(): void {
    for (let i = 0; i < this.chiTietLenhSanXuats.length; i++) {
      this.chiTietLenhSanXuats[i].storageUnit = this.storageUnit;
    }
  }

  onCheckUnCheckSelectAll(): void {
    if (this.selectedAllResult === true) {
      this.selectedAll = 1;
      for (let i = 0; i < this.chiTietLenhSanXuatActive.length; i++) {
        if (this.chiTietLenhSanXuatActive[i].trangThai === 'Active') {
          this.chiTietLenhSanXuatActive[i].checked = this.selectedAll;
        } else {
          this.chiTietLenhSanXuatActive[i].checked = 0;
        }
      }
    } else {
      this.selectedAll = 0;
      for (let i = 0; i < this.chiTietLenhSanXuatActive.length; i++) {
        this.chiTietLenhSanXuatActive[i].checked = this.selectedAll;
      }
    }
    // // duyet qua mang chiTietLenhSanXuatActive va cap nhat checked cua moi ptu trong mang checkedList dua tren onSelected()
    // for (let i = 0; i < this.chiTietLenhSanXuatActive.length; i++) {
    //   this.chiTietLenhSanXuatActive[i].checked = this.selectedAll;
    // }
    // sau khi cap nhat checkedList goi ham getCheckItemList
    // this.getCheckItemList();
    console.log('chon', this.selectedAll);
  }

  onSelected(): void {
    // dem cac ptu da chon
    const numberOfSelectedItems: number = this.chiTietLenhSanXuatActive.reduce(function (accumulator: number, item: any) {
      return accumulator + (item.checked ? 1 : 0);
    }, 0);
    console.log('number', numberOfSelectedItems);
    // ktra ptu duoc chon
    // this.selectedAll = numberOfSelectedItems === this.chiTietLenhSanXuatActive.length ? 1 : 0;

    this.getCheckItemList();
  }

  // cap nhat vao mang checkedList cac ptu chiTietLenhSanXuatActive co thuoc tinh checked
  // duyet qua mang chiTietLenhSanXuatActive, neu 1 ptu duoc chon se them vao checkedList
  getCheckItemList(): void {
    this.checkedList = [];
    for (let i = 0; i < this.chiTietLenhSanXuatActive.length; i++) {
      if (this.chiTietLenhSanXuatActive[i].checked) {
        this.checkedList.push(this.chiTietLenhSanXuatActive[i]);
      }
    }
    console.log('checked', this.checkedList);
  }

  previousState(): void {
    window.history.back();
  }

  changeQuantity(): void {
    this.sum = 0;
    for (let i = 0; i < this.chiTietLenhSanXuats.length; i++) {
      if (this.chiTietLenhSanXuats[i].trangThai === 'Active') {
        const result = this.chiTietLenhSanXuats[i].initialQuantity;
        if (result) {
          this.sum += Number(result);
        }
      }
    }
    this.editForm.patchValue({
      totalQuantity: this.sum,
    });
  }

  pheDuyetTem(): void {
    this.changeStatus.trangThai = 'Đã phê duyệt';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
      alert('Phê duyệt thành công');
      this.previousState();
    });
  }

  khoHuyStatus(): void {
    this.changeStatus.trangThai = 'Kho huỷ';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
      alert('Huỷ thành công');
      this.previousState();
    });
  }

  khoTuChoiStatus(): void {
    this.changeStatus.trangThai = 'Từ chối';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
      alert('Từ chối thành công');
      this.previousState();
    });
  }

  save(): void {
    this.isSaving = true;
    const lenhSanXuat = this.createFromForm();
    if (lenhSanXuat.id !== undefined) {
      this.subscribeToSaveResponse(this.lenhSanXuatService.update(lenhSanXuat));
      this.http
        .put<any>(`${this.resourceUrlUpdate}/${this.editForm.get(['id'])!.value as number}`, this.chiTietLenhSanXuats)
        .subscribe(() => {
          console.log(this.chiTietLenhSanXuats);
          alert('cập nhật chi tiết lệnh sản xuất thành công!');
          this.previousState();
        });
    } else {
      this.subscribeToSaveResponse(this.lenhSanXuatService.create(lenhSanXuat));
    }
  }

  trackLenhSanXuatById(_index: number, item: ILenhSanXuat): number {
    return item.id!;
  }

  trackId(_index: number, item: IChiTietLenhSanXuat): number {
    return item.id!;
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<ILenhSanXuat>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  onSaveSuccess(): void {
    // this.previousState();
  }

  onSaveError(): void {
    // Api for inheritance.
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }

  updateForm(lenhSanXuat: ILenhSanXuat): void {
    this.editForm.patchValue({
      id: lenhSanXuat.id,
      maLenhSanXuat: lenhSanXuat.maLenhSanXuat,
      sapCode: lenhSanXuat.sapCode,
      sapName: lenhSanXuat.sapName,
      workOrderCode: lenhSanXuat.workOrderCode,
      version: lenhSanXuat.version,
      storageCode: lenhSanXuat.storageCode,
      totalQuantity: lenhSanXuat.totalQuantity,
      createBy: lenhSanXuat.createBy,
      entryTime: lenhSanXuat.entryTime,
      trangThai: lenhSanXuat.trangThai,
      comment: lenhSanXuat.comment,
    });
  }
  // chuyển hướng con trỏ
  setInputValue(): void {
    this.isExisted = false;
    const input = document.getElementById('scan');
    if (input) {
      input.focus();
    }
  }
  // bắt sự kiện scan
  catchScanEvent(): void {
    this.scanValue = {};
    const test = this.scanResults.split('#');
    for (let i = 0; i < test.length; i++) {
      if (i === 0) {
        this.scanValue.reelID = test[0];
      }
      if (i === 1) {
        this.scanValue.partNumber = test[i];
      }
      if (i === 2) {
        this.scanValue.vendor = test[i];
      }
      if (i === 3) {
        this.scanValue.lot = test[i];
      }
      if (i === 4) {
        this.scanValue.userData1 = test[i];
      }
      if (i === 5) {
        this.scanValue.userData2 = test[i];
      }
      if (i === 6) {
        test[i] = 'null';
        this.scanValue.userData3 = test[i];
      }
      if (i === 7) {
        this.scanValue.userData4 = test[i];
      }
      if (i === 8) {
        this.scanValue.userData5 = Number(test[i]);
      }
      if (i === 9) {
        this.scanValue.initialQuantity = Number(test[i]);
      }
      if (i === 10) {
        this.scanValue.quantityOverride = Number(test[i]);
      }
      if (i === 11) {
        this.scanValue.storageUnit = test[i];
      }
      if (i === 12) {
        this.scanValue.expirationDate = test[i];
      }
      if (i === 13) {
        this.scanValue.manufacturingDate = test[i];
      }
      if (i === 14) {
        this.scanValue.sapCode = test[i];
      }
    }
    // check ma lenh san xuat
    if (this.scanValue.userData5 === this.editForm.get(['maLenhSanXuat'])!.value) {
      // check trong danh sách
      for (let i = 0; i < this.chiTietLenhSanXuats.length; i++) {
        // có trong danh sách
        if (this.scanValue.reelID === this.chiTietLenhSanXuats[i].reelID && this.chiTietLenhSanXuats[i].trangThai === 'Active') {
          this.isExisted = true;
          this.chiTietLenhSanXuats[i].checked = 1;
          this.countScan++;

          this.tienDoScan = (this.countScan / this.chiTietLenhSanXuatActive.length) * 100;
          this.resultScanPerCent = this.tienDoScan.toFixed(0);
          alert('đã tìm thấy tem trong danh sách');
          break;
        }
        // có trong danh sách nhưng ở trạng thái deactive
        if (this.scanValue.reelID === this.chiTietLenhSanXuats[i].reelID && this.chiTietLenhSanXuats[i].trangThai === 'Inactive') {
          this.isExisted = true;
          this.chiTietLenhSanXuats[i].checked = 1;
          alert('Tem đang ở trạng thái Inactive');
          break;
        }
        if (this.scanValue.reelID === this.chiTietLenhSanXuats[i].reelID && this.chiTietLenhSanXuats[i].trangThai === 'not list') {
          this.isExisted = true;
          this.chiTietLenhSanXuats[i].checked = 1;
          alert('Tem đang ở trạng thái not list');
          break;
        }
      }
      //không nằm trong danh sách
      if (this.isExisted === false) {
        // this.scanValue.comments = 'not list';
        const item: IChiTietLenhSanXuat = {
          id: 0,
          reelID: this.scanValue.reelID,
          partNumber: this.scanValue.partNumber,
          vendor: this.scanValue.vendor,
          lot: this.scanValue.lot,
          userData1: this.scanValue.userData1,
          userData2: this.scanValue.userData2,
          userData3: this.scanValue.userData3,
          userData4: this.scanValue.userData4,
          userData5: this.scanValue.userData5,
          initialQuantity: this.scanValue.initialQuantity,
          msdLevel: '',
          msdInitialFloorTime: '',
          msdBagSealDate: '',
          marketUsage: '',
          quantityOverride: this.scanValue.quantityOverride,
          shelfTime: '',
          spMaterialName: '',
          warningLimit: '',
          maximumLimit: '',
          comments: '',
          warmupTime: '',
          storageUnit: this.scanValue.storageUnit,
          subStorageUnit: '',
          locationOverride: '',
          expirationDate: this.scanValue.expirationDate,
          manufacturingDate: this.scanValue.manufacturingDate,
          partClass: '',
          sapCode: this.scanValue.sapCode,
          trangThai: 'not list',
          checked: 1,
        };
        this.chiTietLenhSanXuats.push(item);
        alert('tem không nằm trong danh sách');
      }
      //cập nhật lại danh sách chi tiết lsx ở trạng thái active
      this.chiTietLenhSanXuatActive = this.chiTietLenhSanXuats.filter(a => a.trangThai === 'Active');
      // sắp xếp danh sách
      this.chiTietLenhSanXuatActive.sort(function (a, b) {
        if (a.checked !== undefined && a.checked !== null && b.checked !== undefined && b.checked !== null) {
          return a.checked - b.checked;
        }
        return 0;
      });
      //cập nhật lại danh sách chi tiết lsx không có trong danh sách
      this.chiTietLenhSanXuatNotList = this.chiTietLenhSanXuats.filter(a => a.trangThai === 'not list');
      this.scanResults = '';
      console.log(this.chiTietLenhSanXuats[0].lenhSanXuat);
    } else {
      this.alertTimeout('Tem không nằm trong mã lệnh sản xuất', 5000);
      this.scanResults = '';
      // alert('Tem không nằm trong mã lệnh sản xuất');
    }
  }
  alertTimeout(mymsg: string, mymsecs: number): void {
    const myelement = document.createElement('div');
    myelement.setAttribute(
      'style',
      'background-color: #6c7ae0;color:white; width: 300px;height: 100px;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;border: 1px solid black;font-family:arial;font-size:14px;display: flex; align-items: center; justify-content: center; text-align: center;border-radius:20px'
    );
    myelement.innerHTML = mymsg;
    setTimeout(function () {
      if (myelement.parentNode) {
        myelement.parentNode.removeChild(myelement);
      }
    }, mymsecs);
    document.body.appendChild(myelement);
  }
  createFromForm(): ILenhSanXuat {
    return {
      ...new LenhSanXuat(),
      id: this.editForm.get(['id'])!.value,
      maLenhSanXuat: this.editForm.get(['maLenhSanXuat'])!.value,
      sapCode: this.editForm.get(['sapCode'])!.value,
      sapName: this.editForm.get(['sapName'])!.value,
      workOrderCode: this.editForm.get(['workOrderCode'])!.value,
      version: this.editForm.get(['version'])!.value,
      storageCode: this.editForm.get(['storageCode'])!.value,
      totalQuantity: this.editForm.get(['totalQuantity'])!.value,
      createBy: this.editForm.get(['createBy'])!.value,
      entryTime: this.editForm.get(['entryTime'])!.value,
      trangThai: this.editForm.get(['trangThai'])!.value,
      comment: this.editForm.get(['comment'])!.value,
    };
  }
}
