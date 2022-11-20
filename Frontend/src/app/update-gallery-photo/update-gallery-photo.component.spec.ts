import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGalleryPhotoComponent } from './update-gallery-photo.component';

describe('UpdateGalleryPhotoComponent', () => {
  let component: UpdateGalleryPhotoComponent;
  let fixture: ComponentFixture<UpdateGalleryPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGalleryPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGalleryPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
