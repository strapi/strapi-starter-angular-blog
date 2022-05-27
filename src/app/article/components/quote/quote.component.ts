import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {QuoteType} from '../../../apollo/queries/article/components/quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {
  @Input() quote: QuoteType;
}
