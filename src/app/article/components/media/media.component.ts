import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MediaType} from '../../../apollo/queries/article/components/media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {
  @Input() media: MediaType;
}
