import { ThongSoMay } from './../../thong-so-may/thong-so-may.model';
import { IThongSoMay } from 'app/entities/thong-so-may/thong-so-may.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThietBi } from '../thiet-bi.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Component({
  selector: 'jhi-thiet-bi-detail',
  templateUrl: './thiet-bi-detail.component.html',
  styleUrls: ['./thiet-bi-detail.component.css'],
})
export class ThietBiDetailComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/chi-tiet-thiet-bi');
  getThongSoThietBiUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/thong-so-thiet-bi/thiet-bi-id');

  predicate!: string;
  ascending!: boolean;
  thietBi: IThietBi | null = null;
  thietBi1: IThietBi[] | null = null;

  dataThongSoMay?: IThongSoMay | null | undefined = null;

  @Input() id = '';
  //------------------- thong tin thong so thiet bi
  @Input() thongSo = '.';
  @Input() phanLoai = '.';
  @Input() dayChuyen = '';
  //--------------- thong tin thiet bi
  @Input() maThietBi?: string | null | undefined = null;
  loaiThietBi?: string | null | undefined;
  // khai bao bien luu thong tin idThietBi
  idThietBi?: number | null | undefined;
  moTa?: string | null | undefined;
  status?: string | null | undefined;

  listOfThietBi: {
    id: number | null | undefined;
    idThietBi: number | null | undefined;
    thongSo: string | null;
    moTa: string | null | undefined;
    status: string | null | undefined;
    phanLoai: string | null | undefined;
    maThietBi: string | null | undefined;
    loaiThietBi: string | null | undefined;
  }[] = [
    {
      id: this.idThietBi,
      idThietBi: this.idThietBi,
      thongSo: null,
      moTa: this.moTa,
      status: this.status,
      phanLoai: '',
      maThietBi: this.maThietBi,
      loaiThietBi: this.loaiThietBi,
    },
  ];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}
  // lay thong tin thiet bi
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thietBi }) => {
      this.thietBi = thietBi;
      if (this.thietBi?.id) {
        // this.http.get<any>(`${this.resourceUrl}/${this.thietBi.id}`).subscribe(res =>{
        //   this.thietBi1 = res;
        //   console.log("id :", this.thietBi);
        //   console.log("chi tiet thiet bi :", this.thietBi1?.thongSoMays);
        // });

        this.http.get<any>(`${this.getThongSoThietBiUrl}/${thietBi.id as number}`).subscribe(res => {
          this.listOfThietBi = res;
          //gán idThietBi cho list
          for (let i = 0; i < this.listOfThietBi.length; i++) {
            this.listOfThietBi[i].idThietBi = thietBi.id;
            this.listOfThietBi[i].maThietBi = thietBi.maThietBi;
          }
          // console.log('thong so thiet bi:', this.listOfThietBi);
        });
      }
    });
    // lay thong tin thong so thiet bi
  }

  previousState(): void {
    window.history.back();
  }
}
