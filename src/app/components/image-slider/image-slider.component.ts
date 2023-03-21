import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  template: ` 
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div *ngFor="let image of images;let i=index">
      <div class="carousel-item active" *ngIf="i==0">
        <img [src]="image" [style.width]="width" [style.height]="height" class="d-block w-100 rounded-1 img-fluid">
      </div>
      <div class="carousel-item" *ngIf="i!=0">
        <img [src]="image" [style.width]="width" [style.height]="height" class="d-block w-100 rounded-1 img-fluid">
      </div>
    </div>
  </div>
  <div *ngIf="images?.length>1">
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
`,
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  ngOnInit(): void {

  }
  @Input() images: string[] = [];
  @Input() width: string;
  @Input() height: string;

  translateValue = 0;
  nextImage() {
    if (this.translateValue > -((this.images.length - 1) * 500)) {
      this.translateValue -= 500;
    }
  }

  prevImage() {
    if (this.translateValue < 0) {
      this.translateValue += 500;
    }
  }
}
