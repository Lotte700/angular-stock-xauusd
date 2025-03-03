import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInputComponent } from '../../stock-input/stock-input.component';
import { PolygonService } from '../../../services/polygon.service';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, StockInputComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  stockData = signal<any | null>(null);
  ticker = signal<string>('AAPL');
  range = signal<number>(1);
  timespan = signal<string>('day');

  constructor(private polygonService: PolygonService) {}

  updateStockData({ ticker, range, timespan }: { ticker: string; range: number; timespan: string }) {
    this.ticker.set(ticker);
    this.range.set(range);
    this.timespan.set(timespan);

    this.polygonService.getStockData(ticker, range, timespan)
      .subscribe(
        data => this.stockData.set(data),
        error => console.error('❌ Error:', error)
      );
  }
}
