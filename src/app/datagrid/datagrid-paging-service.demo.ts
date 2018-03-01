import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

import { SohoDataGridComponent } from '@infor/sohoxi-angular';

import { DataGridPagingServiceDemoService } from './datagrid-paging-service-demo.service';

@Component({
  selector: 'soho-datagrid-paging-service-demo',
  templateUrl: './datagrid-paging-service.demo.html',
  providers: [ DataGridPagingServiceDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridPagingServiceDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;
  private uniqueId: string;

  private savedColumns: Object;
  private savedRowHeight: string;
  private savedSortOrder: string;
  private savedPagesize: string;
  private savedActivePage: string;
  private savedFilter: string;

  constructor(private datagridPagingService: DataGridPagingServiceDemoService) {}

  ngAfterViewInit(): void {
    /*
     * initialize component after datagrid's AfterViewInit. Since we are
     * higher in the component hierarchy our ngAfterViewInit is called after
     * DataGrid ngAfterViewInit.
     */
    const pageSize = 5;

    this.uniqueId = 'datagrid-paging-demo';
    const columnString = localStorage[this.uniqueId + 'columns'] ? JSON.stringify(localStorage[this.uniqueId + 'columns']) : undefined;

    const savedColumns;
    if (columnString) {
      this.savedColumns = this.sohoDataGridComponent.columnsFromString(columnString);
    }

    this.savedRowHeight = localStorage[this.uniqueId + 'rowHeight'];
    this.savedSortOrder = localStorage[this.uniqueId + 'sortOrder'] ? localStorage[this.uniqueId + 'sortOrder'] : null;
    this.savedPagesize = localStorage[this.uniqueId + 'pagesize'];
    this.savedActivePage = localStorage[this.uniqueId + 'activePage'];
    this.savedFilter = localStorage[this.uniqueId + 'filter'] ? localStorage[this.uniqueId + 'filter'] : null;

    const gridOptions: SohoDataGridOptions = {
      columns: this.datagridPagingService.getColumns(),
      selectable: 'single',
      paging: true,
      pagesize: pageSize,
      pagesizes: [ 5, 10, 25 ],
      indeterminate: false,
      rowHeight: 'medium', // short, medium or normal
    };

    gridOptions.source = (req: SohoDataGridSourceRequest, response: any) => {

      /*
       * Option1: COMMENT OUT THE RETURN - when getting an initial page request. The
       * getDataService will recognize the 'initial' paging type and return the first page of data.
       */
      // if (req.type === 'initial') {
      //   return;
      // }

      this.datagridPagingService.getData(req).subscribe((result: any) => {
        req.total = result.total;
        response(result.data, req);
      });
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;

    /*
     * Options2 - LOAD INITIAL DATA DIRECTLY - bypass the initial type in the
     * source function and load directly into:
     * NOTE: only seems to work with indeterminate paging. Perhaps a something
     * missing in the SohoDataGridSourceRequest object?!?
     */
    // let initialRequest: SohoDataGridSourceRequest = { activePage: 1, pagesize: pageSize, type: '', total: 100, filterExpr: []};
    // this.datagridPagingService.getData(initialRequest).subscribe((result: any) => {
    //   this.sohoDataGridComponent.data = result.data;
    // });
  }

  exportExcel(e: any) {
    this.sohoDataGridComponent.exportToExcel('', '', this.datagridPagingService.getAllData());
  }

  exportCsv(e: any) {
    this.sohoDataGridComponent.exportToCsv('', this.datagridPagingService.getAllData());
  }

  onRowClicked(event: SohoDataGridRowClicked) {
    console.log('onRowClicked event is: ' + event);
  }

  onSettingsChanged(event: SohoDataGridSettingsChangedEvent) {
    // Save Each Setting in Local storage
    localStorage[this.uniqueId + 'columns'] = JSON.stringify(event.columns);
    localStorage[this.uniqueId + 'rowHeight'] = event.rowHeight;
    localStorage[this.uniqueId + 'sortOrder'] = JSON.stringify(event.sortOrder);
    localStorage[this.uniqueId + 'pagesize'] = event.pagesize;
    localStorage[this.uniqueId + 'activePage'] = event.activePage;
    localStorage[this.uniqueId + 'filter'] =  JSON.stringify(event.filter);
  }

  onRendered(event: SohoDataGridRenderedEvent) {
    this.sohoDataGridComponent.restoreUserSettings({activePage: this.savedActivePage, columns: this.savedColumns,
      rowHeight: this.savedRowHeight, sortOrder: this.savedSortOrder, pagesize: this.savedPagesize, filter: this.savedFilter});
  }
}
