import { TestBed, async, inject } from '@angular/core/testing';
import { ToastService } from './toast.service';
let service;

describe('ToastService', () => {
  beforeEach(inject([ToastService], (svc) => {
    service = svc;
  }));
  it('should create the toast service', () => {
    spyOn(service, 'show').withArgs('', {}).and.callThrough();
    spyOn(service, 'remove')
      .withArgs({ textOrTpl: '', options: {} })
      .and.callThrough();
    service.show('', {});
    service.remove({ textOrTpl: '', options: {} });
    expect(service.remove).toHaveBeenCalledWith({ textOrTpl: '', options: {} });
  });
});
