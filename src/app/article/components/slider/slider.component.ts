import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SliderType} from '../../../apollo/queries/article/components/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {
  @Input() slider: SliderType;
  slickOptions = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slideToScroll: 1,
    arrow: 1,
    swipe: 1
  }
}
