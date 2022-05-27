import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RichTextType} from '../../../apollo/queries/article/components/richtext';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichtextComponent {
  @Input() text: RichTextType;
}
