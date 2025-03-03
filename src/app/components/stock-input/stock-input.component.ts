import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './stock-input.component.html',
  styleUrls: ['./stock-input.component.scss']
})
export class StockInputComponent {
  @Output() searchStock = new EventEmitter<{ ticker: string, range: number, timespan: string }>();

  ticker: string = 'AAPL';  // ใช้ตัวแปรปกติแทน signal
  range: number = 1;
  timespan: string = 'day';

  timespanOptions = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'quarter'];

  onSearch() {
    this.searchStock.emit({
      ticker: this.ticker,
      range: this.range,
      timespan: this.timespan
    });
  }
  
}
