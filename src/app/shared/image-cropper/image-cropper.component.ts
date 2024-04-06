import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss',
})
export class ImageCropperComponent {
  @ViewChild('fileInput') fileInput?: ElementRef;
  @Output() imageData: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetFile: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any;
  disabled = false;
  max = 10;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 5;
  scale = 1;
  transform: ImageTransform = {};
  isLoaded: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetFile'] && changes['resetFile'].currentValue) {
      this.resetCropper();
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.value = 5;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event && event.blob) {
      this.file = this.blobToFile(event.blob, 'cropped_image.png');     
      const imageData = {
        file: this.file!,
      };
  
      this.imageData.emit(imageData);
    }
  }

  blobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  logSliderValue(event: any) {
    let newScale = this.value;
    this.transform = {
      ...this.transform,
      scale: 1 + (newScale - 10) * 0.1,
    };   
  }  

  resetImage() {
    this.scale = 1;
    // this.rotation = 0;
    this.value = 5;
    this.transform = {};
  }

  resetCropper() {
    // Clear the image events
    this.imageChangedEvent = null;
    this.file = '';

    // Emit null to indicate no image is selected
    this.imageData.emit(null);

    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
    this.resetFile = false;
  }
}
