/// <reference path="soho-accordion.d.ts" />

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import { SohoAccordionModule } from './soho-accordion.module';
import { SohoAccordionComponent } from './soho-accordion.component';

@Component({
  template: `
  <soho-accordion>
    <soho-accordion-header>Header 1</soho-accordion-header>
    <soho-accordion-pane>
      <div class="accordion-content">Pane 1</div>
    </soho-accordion-pane>
    <soho-accordion-header>Header 2</soho-accordion-header>
    <soho-accordion-pane>
      <div class="accordion-content">Pane 2</div>
    </soho-accordion-pane>
  </soho-accordion>
  `
})
class SohoAccordionTestComponent {
  @ViewChild(SohoAccordionComponent) accordion: SohoAccordionComponent;

  constructor() {
  }
}

describe('Soho Accordion Unit Tests', () => {
  let accordion: SohoAccordionComponent;
  let component: SohoAccordionTestComponent;
  let fixture: ComponentFixture<SohoAccordionTestComponent>;
  let de: DebugElement;
  let el: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoAccordionTestComponent],
      imports: [SohoAccordionModule]
    });

    fixture = TestBed.createComponent(SohoAccordionTestComponent);
    component = fixture.componentInstance;
    accordion = component.accordion;

    de = fixture.debugElement;
    el = de.query(By.css('soho-accordion')).nativeElement;

    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('can get and set displayChevron', () => {
    expect(accordion.displayChevron).toBeUndefined();

    accordion.displayChevron = true;
    expect(accordion.options.displayChevron).toBeTruthy();

    accordion.displayChevron = false;
    expect(accordion.options.displayChevron).toBeFalsy();

    (accordion as any).acordion = undefined;

    accordion.displayChevron = true;
    expect(accordion.options.displayChevron).toBeTruthy();
  });

  it('can get and set allowOnePane', () => {
    expect(accordion.allowOnePane).toBeUndefined();
    accordion.allowOnePane = true;

    expect(accordion.options.allowOnePane).toBeTruthy();

    accordion.allowOnePane = false;

    expect(accordion.options.allowOnePane).toBeFalsy();
  });

  it('can get and set rerouteOnLinkClick', () => {
    expect(accordion.rerouteOnLinkClick).toBeUndefined();
    accordion.rerouteOnLinkClick = true;

    expect(accordion.options.rerouteOnLinkClick).toBeTruthy();

    accordion.rerouteOnLinkClick = false;

    expect(accordion.options.rerouteOnLinkClick).toBeFalsy();
  });

  it('can get and set hasPanels', () => {
    expect(accordion.hasPanels).toBeUndefined();
    accordion.hasPanels = true;

    expect(accordion.options.hasPanels).toBeTruthy();

    accordion.hasPanels = false;

    expect(accordion.options.hasPanels).toBeFalsy();
  });

  it('can get and set inverse', () => {
    expect(accordion.inverse).toBeUndefined();
    accordion.inverse = true;

    expect(accordion.options.inverse).toBeTruthy();

    accordion.inverse = false;

    expect(accordion.options.inverse).toBeFalsy();
  });

  it('can get and set alternate', () => {
    const spy = spyOn((component as any).accordion, 'markForUpdate');

    expect(accordion.alternate).toBeUndefined();
    accordion.alternate = true;

    expect(accordion.options.alternate).toBeTruthy();

    accordion.alternate = false;

    expect(accordion.options.alternate).toBeFalsy();

    expect(spy).toHaveBeenCalled();
  });

  it('can get and set hasSubheaderSeparators', () => {
    expect(accordion.hasSubheaderSeparators).toBeUndefined();
    accordion.hasSubheaderSeparators = true;

    expect(accordion.hasSubheaderSeparators).toBeTruthy();

    accordion.hasSubheaderSeparators = false;

    expect(accordion.hasSubheaderSeparators).toBeFalsy();
  });

  it('can get and set source', () => {
    expect(accordion.source).toBeUndefined();
    accordion.source = () => [];

    expect(accordion.source).toBeDefined();
  });

  it('can expand', () => {
    const header = accordion.getHeader(0);

    expect(header).toBeDefined();
    accordion.expand(header);
  });

  it('can expandAll', () => {
    accordion.expandAll();
  });

  it('can collapseAll be called', () => {
    accordion.collapseAll();
  });

  it('can disable', () => {
    accordion.disable();
  });

  it('can enable', () => {
    accordion.enable();
  });

  it('can toggle', () => {
    const header = accordion.getHeader(0);

    expect(header).toBeDefined();
    accordion.toggle(header);
  });

  it('can isExpanded be called', () => {
    const header = accordion.getHeader(0);

    expect(header).toBeDefined();

    const result = accordion.isExpanded(header);
  });

  it('can isDisabled be called', () => {
    const header = accordion.getHeader(0);

    expect(header).toBeDefined();

    const result = accordion.isDisabled(header);
  });

  it('can collapse be called', () => {
    const header = accordion.getHeader(0);

    expect(header).toBeDefined();

    const result = accordion.collapse(header);
  });

  it('can be updated', () => {
    accordion.updated();
  });

  it('can be updated with new options', () => {
    const spy = spyOn((component as any).accordion, 'updated');
    const options: SohoAccordionOptions = { allowOnePane: true, hasPanels: true };
    accordion.updated(undefined, options);

    expect(spy).toHaveBeenCalled();
  });

});
