import {
  Component,
  ViewChild,
  OnInit
 } from '@angular/core';

import { SohoDataGridComponent } from 'ids-enterprise-ng';

// tslint:disable

export const mainData: any[] = [
  {
    id: 1,
    productId: 'T100',
    sku: '<b>sku #9000001-237</b>',
    productName: 'Compressor',
    activity: 'Assemble Paint',
    quantity: 1,
    inStock: true,
    price: 210.99,
    percent: 0.10,
    status: 'OK',
    orderDate: '2018-08-07T06:00:00.000Z',
    action: 'Action'
  },
  {
    id: 2,
    productId: 200,
    inStock: true,
    sku: '<b>sku #9000001-236</b>',
    productName: 'Different Compressor',
    activity: 'Inspect and Repair',
    quantity: 2,
    price: 210.99,
    percent: 0.10,
    status: '',
    orderDate: '2018-06-07T06:00:00.000Z',
    action: 'On Hold'
  },
  {
    id: 3,
    productId: 300,
    inStock: true,
    sku: '<b>sku #9000001-235</b>',
    productName: 'Compressor',
    activity: 'Inspect and Repair',
    quantity: 1,
    price: 120.99,
    percent: 0.10,
    status: null,
    phone: '(888) 888-8888',
    orderDate: '2018-12-05T06:00:00.000Z',
    action: 'Action'
  },
  {
    id: 4,
    productId: 'Z400',
    sku: '<b>sku #9000001-234</b>',
    productName: 'Another Compressor',
    activity: 'Assemble Paint',
    quantity: 3,
    price: 210.99,
    percent: 0.20,
    status: 'OK',
    orderDate: '2018-04-05T06:00:00.000Z',
    action: 'Action'
  },
  {
    id: 5,
    productId: 2542205,
    sku: '<b>sku #9000001-233</b>',
    productName: 'I Love Compressors',
    activity: 'Inspect and Repair',
    quantity: 4,
    price: 210.99,
    percent: 0.30,
    status: 'OK',
    orderDate: '2018-02-02T06:00:00.000Z',
    action: 'On Hold'
  },
  {
    id: 5,
    productId: 2642205,
    sku: '<b>sku #9000001-232</b>',
    productName: 'Air Compressors',
    activity: 'Inspect and Repair',
    quantity: 41,
    price: 120.99,
    percent: 0.40,
    status: 'OK',
    phone: '(888) 888-8888',
    orderDate: '2018-09-09T06:00:00.000Z',
    action: 'On Hold'
  },
  {
    id: 6,
    productId: 2642206,
    sku: '<b>sku #9000001-231</b>',
    productName: 'Some Compressor',
    activity: 'inspect and Repair',
    quantity: 41,
    price: 123.99,
    percent: 0.10,
    status: 'OK',
    phone: '(888) 888-8888',
    orderDate: '2018-08-08T06:00:00.000Z',
    action: 'On Hold'
  }
];

export const mainColumns: any[] = [
  {
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    formatter: Soho.Formatters.Expander,
    filterType: 'text',
    textOverflow: 'ellipsis'
  },
  {
    id: 'productName',
    name: 'Product Name',
    sortable: false,
    field: 'productName',
    filterType: 'text',
    formatter: Soho.Formatters.Hyperlink
  },
  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity'
  },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    formatter: Soho.Formatters.Decimal
  },
  {
    id: 'activity',
    name: 'Activity',
    field: 'activity',
    filterType: 'text'
  }
];

@Component({
  selector: 'soho-datagrid-nested-grids',
  templateUrl: './datagrid-nested-grids.demo.html'
})
export class DataGridNestedGridsDemoComponent implements OnInit {

  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  gridOptions = null;

  ngOnInit(): void {
    this.gridOptions = {
      columns: mainColumns,
      dataset: mainData,
      selectable: 'multiple',
      filterable: true,
      expandableRow: true,
      toolbar: {
        title: 'Data Grid Header Title',
        collapsibleFilter: true,
        results: true,
        actions: true,
        exportToExcel: true,
        personalize: true,
        rowHeight: true
      }
    };
  }

  onExpandrow(event) {
    const subData: any[] = [
      { id: event.row + '-121225', partName: 'Large Cooling Fan', quantity: 1 * event.row, price: .34 * event.row, amount: 1.34 * event.row },
      { id: event.row + '-121226', partName: 'Extra Cooling System', quantity: 1 * event.row, price: .04 * event.row, amount: 1.14 * event.row },
      { id: event.row + '-121227', partName: 'Electronics / Hardware', quantity: 1 * event.row, price: .14 * event.row, amount: 1.24 * event.row },
      { id: event.row + '-121228', partName: 'Resilant Sub-Compressor', quantity: 1 * event.row, price: .24 * event.row, amount: 1.34 * event.row }
    ];
    const subColumns: any[] = [
      { id: 'id', name: 'Part Id', field: 'id', width: 200 },
      { id: 'partName', name: 'Part Name',field: 'partName', formatter: Soho.Formatters.Hyperlink },
      { id: 'price', name: 'Price', field: 'price' },
      { id: 'amount', name: 'Amount', field: 'amount' },
      { id: 'quantity', name: 'Quantity', field: 'quantity' },
      { id: 'action', name: 'Active', sortable: false, width: 80, formatter: Soho.Formatters.Button, icon: 'delete', tooltip: 'Delete',
      click: function (e: any, args) {
        console.log(e, args);
      }}
    ];

    console.log('onExpandrow', subData, subColumns);

    // const subContainer = event.detail.find('.datagrid-row-detail-padding');
    // subContainer.empty();
    // subContainer.append('<div class="datagrid-sub"></div>');
  }

  onCollapserow(event) {
    console.log('onCollapserow', event);
  }
}
