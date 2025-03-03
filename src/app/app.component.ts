import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailComponent } from "./components/page/detail/detail.component";
import { StockInputComponent } from "./components/stock-input/stock-input.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DetailComponent, StockInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-stock-xauusd';
}
