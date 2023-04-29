/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CarListComponent } from './car-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Car } from '../car';


describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 10; i++) {
      const car = new Car(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.image.imageUrl()
      );
      component.cars.push(car);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Component has a banner image", () => {
    debug.queryAll(By.css('#bannerImg')).forEach((banner, i) => {
      expect(banner.attributes['src']).toEqual("../assets/banner.jpg")

      expect(banner.attributes['alt']).toEqual("banner")
    });
  });

  it("Component has a table", () => {
    expect(debug.query(By.css("tbody")).childNodes.length).toBeGreaterThan(0);
  });

  it('should have 4 th tag with the correct table headers', () => {
    debug.queryAll(By.css('th')).forEach((th, i) => {
      if(i == 0){
        expect(th.nativeElement.textContent).toContain("#")
      } else if(i == 1){
        expect(th.nativeElement.textContent).toContain("Marca")
      }else if(i == 2){
        expect(th.nativeElement.textContent).toContain("Línea")
      }else if(i == 3){
        expect(th.nativeElement.textContent).toContain("Modelo")
      }
    });
  });

  it('should have dd with id="carId" tag with the car.id', () => {
    debug.queryAll(By.css('#carId')).forEach((dd, i) => {
      expect(dd.nativeElement.textContent).toContain(component.cars[i].id)
    });
  });

  it('should have dd with id="carMarca" tag with the car.marca', () => {
    debug.queryAll(By.css('#carMarca')).forEach((dd, i) => {
      expect(dd.nativeElement.textContent).toContain(component.cars[i].marca)
    });
  });

  it('should have dd with id="carLinea" tag with the car.linea', () => {
    debug.queryAll(By.css('#carLinea')).forEach((dd, i) => {
      expect(dd.nativeElement.textContent).toContain(component.cars[i].linea)
    });
  });

  it('should have dd with id="carModelo" tag with the car.modelo', () => {
    debug.queryAll(By.css('#carModelo')).forEach((dd, i) => {
      expect(dd.nativeElement.textContent).toContain(component.cars[i].modelo)
    });
  });

  it('should have h6 tag with the carTypes correct', () => {
    debug.queryAll(By.css('h6')).forEach((h6, i) => {
      expect(h6.nativeElement.textContent).toContain("Total " + component.carsTypes[i].marca + ": " + component.carsTypes[i].cantidad)
    });
  });

});
