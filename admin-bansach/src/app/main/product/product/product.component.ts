// @ts-ignore
import {BaseComponent} from '../../../lib/base-component';
import {Component, OnInit, Injector, Renderer2, ViewChild} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../helpers/must-match.validator';
import {first} from 'rxjs/operators';
import {FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {
  public showUpdateModal: any;
  public isCreate: any;
  item: any;
  pageSize: any;
  page: any;
  quantity: any;
  products: any;
  product: any;
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
    this.item = {};
    this.quantity = 1;
    this.products = [];
    this.totalRecords = 1;
    this._route.params.subscribe(params => {
      const id = params.id;
      // this._api.get('/api/item/get-by-id/' + id).takeUntil(this.unsubscribe).subscribe(res => {
      //   this.item = res;
      //   setTimeout(() => {
      //     this.loadScripts();
      //   });
      // });
    });
    this.search();

  }

  search(): void {
    this.page = 1;
    this.pageSize = 5;
    this._api.get('/api/item/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.products = res || [];
      this.totalRecords = Object.keys(res).length || 5;
      this.pageSize = 5;
    });
  }

  loadPage(page): void {
    this._api.get('/api/item/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.products = res || [];
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
      ($('#createProductModal') as any).modal('toggle');
      this._api.get('/api/item/get-by-id/' + row.item_id).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.product = res;
        console.log(this.product);
        this.formdata = this.fb.group({
          'item_group_id': [this.product.item_group_id, Validators.required],
          'item_id': [this.product.item_id, Validators.required],
          'item_image': [this.product.item_image, Validators.required],
          'item_name': [this.product.item_name, Validators.required],
          'item_price': [this.product.item_price, Validators.required],
          'item_mota': [this.product.item_mota, Validators.required],
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
          item_group_id: value.item_group_id,
          item_id: value.item_id,
          item_name: value.item_name,
          item_image: data_image,
          item_price: value.item_price,
          item_mota: value.item_mota
        };
        this._api.post('/api/item/create-item', temp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
        });
      });
    } else {
      console.log('run in else');
      // this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      //   let data_image = data == '' ? null : data;
        let temp = {
          item_group_id: value.item_group_id,
          item_id: value.item_id,
          item_name: value.item_name,
          item_image: value.item_image,
          item_price: value.item_price,
          item_mota: value.item_mota
        };
        console.log('run in here');
        this._api.post('/api/item/update-item', temp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
        });
      // });
    }
  }

  onDelete(row): void {
    this._api.post('/api/item/delete-item', {item_id: row.item_id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
    });
  }

  Reset(): void {
    this.product = null;
    this.formdata = this.fb.group({
      'item_group_id': [this.product.item_group_id, Validators.required],
      'item_id': [this.product.item_id, Validators.required],
      'item_image': ['', Validators.required],
      'item_name': ['', Validators.required],
      'item_price': ['', Validators.required],
      'item_mota': ['', Validators.required],
    });
  }

  createModal(): void {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.product = null;
    setTimeout(() => {
      ($('#createProductModal') as any).modal('toggle');
      this.formdata = this.fb.group({
        'item_group_id': ['', Validators.required],
        'item_id': ['', Validators.required],
        'item_image': ['', Validators.required],
        'item_name': ['', Validators.required],
        'item_price': ['', Validators.required],
        'item_mota': ['', Validators.required]
      });
    }, 700);

    this.doneSetupForm = true;
  }

  closeModal(): void {
    ($('#createProductModal') as any).closest('.modal').modal('hide');
  }

}
