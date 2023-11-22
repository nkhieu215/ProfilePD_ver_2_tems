import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';
import { ThietBiService } from '../service/thiet-bi.service';
import { FormBuilder } from '@angular/forms';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let activatedRoute: ActivatedRoute;
  let thietBiService: ThietBiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EditComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
        FormBuilder,
      ],
    })
      .overrideTemplate(EditComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EditComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thietBiService = TestBed.inject(ThietBiService);

    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  it('should create 1', () => {
    //WHEN
    expect(component.updateForm);
  });
});
