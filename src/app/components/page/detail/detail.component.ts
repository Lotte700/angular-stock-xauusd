// import { Component, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { StockInputComponent } from '../../stock-input/stock-input.component';
// import { PolygonService } from '../../../services/polygon.service';


// @Component({
//   selector: 'app-detail',
//   standalone: true,
//   imports: [CommonModule, StockInputComponent],
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.scss']
// })
// export class DetailComponent {
//   stockData = signal<any | null>(null);
//   ticker = signal<string>('AAPL');
//   range = signal<number>(1);
//   timespan = signal<string>('day');

// ngOnChanges(): void {
//   console.log('Stock Data Received:', this.stockData); // ตรวจสอบข้อมูลที่ได้รับจาก API

//   if (this.stockData?.results) {
//     this.createChart();
//   } else {
//     console.warn('No stock data available.');
//   }
// }

//   constructor(private polygonService: PolygonService) {}
// createChart() {
//   if (this.chart) {
//     this.chart.destroy(); // ล้างกราฟเก่า
//   }

//   console.log('Creating Chart with Data:', this.stockData.results);

//   if (!this.stockData.results || this.stockData.results.length === 0) {
//     console.warn('No valid stock data to display.');
//     return;
//   }

//   const ctx = document.getElementById('stockChart') as HTMLCanvasElement;

//   this.chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: this.stockData.results.map((result: any) => {
//         console.log('Date Value:', result.t); // ตรวจสอบค่าของ t
//         return new Date(result.t).toLocaleDateString();
//       }),
//       datasets: [
//         {
//           label: 'Open Price',
//           data: this.stockData.results.map((result: any) => {
//             console.log('Open Price:', result.o); // ตรวจสอบค่า open price
//             return result.o;
//           }),
//           borderColor: 'blue',
//           backgroundColor: 'rgba(0, 0, 255, 0.1)',
//           fill: true
//         }
//       ]
//     }
//   });
// }
//   updateStockData({ ticker, range, timespan }: { ticker: string; range: number; timespan: string }) {
//     this.ticker.set(ticker);
//     this.range.set(range);
//     this.timespan.set(timespan);

//     this.polygonService.getStockData(ticker, range, timespan)
//       .subscribe(
//         data => this.stockData.set(data),
//         error => console.error('❌ Error:', error)
//       );
//   }
// }
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInputComponent } from '../../stock-input/stock-input.component';
import { PolygonService } from '../../../services/polygon.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, StockInputComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  stockData = signal<any | null>(null);
  ticker = signal<string>('AAPL');
  range = signal<number>(1);
  timespan = signal<string>('day');
  chart: any;

  constructor(private polygonService: PolygonService) {}

  ngOnInit(): void {
    this.updateStockData({ ticker: this.ticker(), range: this.range(), timespan: this.timespan() });
  }

  ngOnChanges(): void {
    console.log('Stock Data Received:', this.stockData()); // ตรวจสอบข้อมูลที่ได้รับจาก API

    if (this.stockData()?.results) {
      this.createChart();
    } else {
      console.warn('No stock data available.');
    }
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // ล้างกราฟเก่า
    }

    console.log('Creating Chart with Data:', this.stockData().results);

    if (!this.stockData().results || this.stockData().results.length === 0) {
      console.warn('No valid stock data to display.');
      return;
    }

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.stockData().results.map((result: any) => {
          console.log('Date Value:', result.t); // ตรวจสอบค่าของ t
          return new Date(result.t).toLocaleDateString();
        }),
        datasets: [
          {
            label: 'Open Price',
            data: this.stockData().results.map((result: any) => {
              console.log('Open Price:', result.o); // ตรวจสอบค่า open price
              return result.o;
            }),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            fill: true
          }
        ]
      }
    });
  }

  updateStockData({ ticker, range, timespan }: { ticker: string; range: number; timespan: string }) {
    this.ticker.set(ticker);
    this.range.set(range);
    this.timespan.set(timespan);

    this.polygonService.getStockData(ticker, range, timespan)
      .subscribe(
        data => {
          this.stockData.set(data);
          this.createChart(); // สร้างกราฟใหม่เมื่อข้อมูลถูกอัปเดต
        },
        error => console.error('❌ Error:', error)
      );
  }
}