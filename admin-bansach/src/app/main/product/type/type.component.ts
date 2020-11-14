// @ts-ignore
import {BaseComponent} from '../../../lib/base-component';
import {Component, OnInit, Injector, Renderer2, ViewChild} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../helpers/must-match.validator';
import {first} from 'rxjs/operators';
import {FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent extends BaseComponent implements OnInit {
  public showUpdateModal: any;
  public isCreate: any;
  item: any;
  pageSize: any;
  page: any;
  quantity: any;
  product_group: any;
  product_groups: any;
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
    this.product_groups = [];
    this.product_group = [];
    this.totalRecords = 1;
    this.search();

  }

  search(): void {
    this.page = 1;
    this.pageSize = 5;
    this._api.get('/api/itemGroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      var response = Object.keys(res).map(function(index){
        let respond = res[index];
        // do something with person
        return respond;
    });
      this.product_groups = response || [];
      console.log("product_groups", res);
      this.totalRecords = Object.keys(res).length || 5;
      this.pageSize = 5;
    });
  }

  loadPage(page): void {
    this._api.get('/api/itemGroup/get-menu').takeUntil(this.unsubscribe).subscribe(res => {
      this.product_groups = res || [];
      console.log("product_groups", res);
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

    console.log(typeof row);
    console.log(row);
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      ($('#createProductTypeModal') as any).modal('toggle');
      this._api.get('/api/itemGroup/get-by-id/' + row.item_group_id).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.product_group = res;
        console.log("product_group", this.product_group);
        this.formdata = this.fb.group({
          'item_group_id': [this.product_group.item_group_id || '', Validators.required],
          'parent_item_group_id': [this.product_group.parent_item_group_id || '', Validators.required],
          'item_group_name': [this.product_group.item_group_name || '', Validators.required],
          'seq_num': [this.product_group.seq_num || '', Validators.required],
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
          parent_item_group_id: value.parent_item_group_id,
          item_group_name: value.item_group_name,
          seq_num : value.seq_num
        };
        this._api.post('/api/itemGroup/create-item-group', temp).takeUntil(this.unsubscribe).subscribe(res => {
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
        parent_item_group_id: value.parent_item_group_id,
        item_group_name: value.item_group_name,
        seq_num : value.seq_num
      };
      console.log('run in here');
      this._api.post('/api/itemGroup/update-item-group', temp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật thành công');
        this.search();
        this.closeModal();
      });
      // });
    }
  }

  onDelete(row): void {
    this._api.post('/api/itemGroup/delete-item-group', {item_group_id: row.item_group_id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
    });
  }

  Reset(): void {
    this.product_group = null;
    this.formdata = this.fb.group({
      'item_group_id': ['', Validators.required],
      'parent_item_group_id': ['', Validators.required],
      'item_group_name': ['', Validators.required],
      'seq_num' : ['', Validators.required]
    });
  }

  createModal(): void {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.product_group = null;
    // setTimeout(() => {
    //   ($('#createProductTypeModal') as any).modal('toggle');
    //   this.formdata = this.fb.group({
    //     'item_group_id': ['', Validators.required],
    //     'parent_item_group_id': ['', Validators.required],
    //     'item_group_name': ['', Validators.required],
    //     'seq_num' : ['', Validators.required]
    //   });
    // }, 700);

    // this.doneSetupForm = true;
  }

  closeModal(): void {
    ($('#createProductTypeModal') as any).closest('.modal').modal('hide');
  }
  goodEmptyCheck(value) : boolean {
    if(value === null || value === undefined ) return true;
    return Object.keys(value).length === 0
      && value.constructor === Object; // 👈 constructor check
  }
  consoleJSONStringify(value) : string {
    return JSON.stringify(value);
  }

}
