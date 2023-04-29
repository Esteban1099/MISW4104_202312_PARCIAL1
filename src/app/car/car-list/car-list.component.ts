import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Array<Car> = [];
  carsTypes: Array<{
    marca: string,
    cantidad: number
  }> = [];

  constructor(private carService: CarService) { }

  getCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.cars.forEach(car => {
        if (this.carsTypes.find(x => x.marca === car.marca) === undefined) {
          this.carsTypes.push({
            marca: car.marca,
            cantidad: 1
          });
        } else {
          this.carsTypes.find(x => x.marca === car.marca)!.cantidad++;
        }
      });
    });
  }


  ngOnInit() {
    this.getCars();
    console.log(this.carsTypes);
  }

}
