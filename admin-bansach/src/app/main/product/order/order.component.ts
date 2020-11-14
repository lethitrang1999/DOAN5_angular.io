import {BaseComponent} from '../../../lib/base-component';
import {Component, OnInit, Injector, Renderer2, ViewChild} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../helpers/must-match.validator';
import {first} from 'rxjs/operators';
import {FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {
  public showUpdateModal: any;
  public isCreate: any;
  hoa_dons: any;
  pageSize: any;
  page: any;
  quantity: any;
 
hoa_don:any;
  totalRecords: any;
  doneSetupForm: any;
  formdata: any;
  submitted: any;
  loading: any;
  @ViewChild(FileUpload, {static: false}) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector, private Renderer: Renderer2) { 
    super(injector);
  }

  ngOnInit(): void {
    this.submitted = false;
    this.loading = false;
    this.hoa_dons = {};
    this.quantity = 1;
    this.hoa_dons= [];
    this.totalRecords = 1;
    this._route.params.subscribe(params => {
      const id = params.id;
    
  });
  this.search();


}
search(): void {
  this.page = 1;
  this.pageSize = 5;
  this._api.get('/api/HoaDon/get-all-hoadon').takeUntil(this.unsubscribe).subscribe(res => {
    this.hoa_dons = res || [];
    this.totalRecords = Object.keys(res).length || 5;
    this.pageSize = 5;
  });
}
loadPage(page): void {
  this._api.get('/api/HoaDon/get-all-hoadon').takeUntil(this.unsubscribe).subscribe(res => {
    this.hoa_dons = res || [];
    this.totalRecords = Object.keys(res).length || 5;
    this.pageSize = 5;
  });
}
public loadScripts(): void {
  this.renderExternalScript('assets/js/ace-elements.min.js').onload = () => {
  };

  this.renderExternalScript('assets/js/ace-extra.min.js').onload = () => {
  };
  this.renderExternalScript('assets/js/ace.min.js').onload = () => {
  };
}
public renderExternalScript(src: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = true;
  script.defer = true;
  this.Renderer.appendChild(document.body, script);
  return script;
}
public openUpdateModal(row): void {
  console.log(row);
  this.doneSetupForm = false;
  this.showUpdateModal = true;
  this.isCreate = false;
  setTimeout(() => {
    ($('#createOrderModal') as any).modal('toggle');
    this._api.get('/api/HoaDon/get-by-id/' + row.ma_hoa_don).takeUntil(this.unsubscribe).subscribe((res: any) => {
      this.hoa_don = res;
      console.log(this.hoa_don);
      this.formdata = this.fb.group({
        'ma_hoa_don': [this.hoa_don.ma_hoa_don, Validators.required],
        'ho_ten': [this.hoa_don.ho_ten, Validators.required],
        'dia_chi': [this.hoa_don.dia_chi, Validators.required],
        'sdt': [this.hoa_don.sdt, Validators.required],
        'email': [this.hoa_don.email, Validators.required],
        'listjson_chitiet': ['']
      }, {
        // validator: MustMatch('matkhau', 'nhaplaimatkhau')
      });
      this.doneSetupForm = true;
    });
  }, 700);

}
get f(): void {
  return this.formdata.controls;
}
onSubmit(value): void {
  this.submitted = true;

  // stop here if form is invalid
  if (this.formdata.invalid) {
    console.log(this.formdata.invalid);
    return;
  }
  if (this.isCreate) {
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      let data_image = data == '' ? null : data;
      let temp = {
        ma_hoa_don: value.ma_hoa_don,
        ho_ten: value.ho_ten,
        dia_chi: value.dia_chi,
        sdt:  value.sdt,
        email: value.email,
        
      };
      this._api.post('/api/HoaDon/create-hoa-don', temp).takeUntil(this.unsubscribe).subscribe(res => {
        console.log("save successfully");
        alert('Thêm thành công');
        this.search();
        this.closeModal();
        this.Reset();
      });
    });
  } else {
    console.log('run in else');
    // this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
    //   let data_image = data == '' ? null : data;
      let temp = {
        ma_hoa_don: value.ma_hoa_don,
        ho_ten: value.ho_ten,
        dia_chi: value.dia_chi,
        sdt:  value.sdt,
        email: value.email,
      };
      console.log('run in here');
      this._api.post('/api/hoadon/update-hoa-don', temp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật thành công');
        this.search();
        this.closeModal();
      });
    // });
  }
}
onDelete(row): void {
  this._api.post('/api/HoaDon/delete-hoa-don', {ma_hoa_don: row.ma_hoa_don}).takeUntil(this.unsubscribe).subscribe(res => {
    alert('Xóa thành công');
    this.search();
  });
}
Reset(): void {
  this.hoa_don = null;
  this.formdata = this.fb.group({
    'ma_hoa_don': ['', Validators.required],
    'ho_ten': ['', Validators.required],
    'dia_chi': ['', Validators.required],
    'sdt': ['', Validators.required],
    'email': ['', Validators.required],
  });
}
createModal(): void {
  this.doneSetupForm = false;
  this.showUpdateModal = true;
  this.isCreate = true;
  this.hoa_don = null;
  setTimeout(() => {
    ($('#createOrderModal') as any).modal('toggle');
    this.formdata = this.fb.group({
      'ho_ten': ['', Validators.required],
      'dia_chi': ['', Validators.required],
      'sdt': ['', Validators.required],
      'email': ['', Validators.required],
    });
  }, 700);

  this.doneSetupForm = true;
}
 closeModal(): void {
    ($('#createOrderModal') as any).closest('.modal').modal('hide');
  }

}



