
import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryMemory } from "../../../cars/repositories/in-memory/CarsRepositoryMemory";

import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryMemory: CarsRepositoryMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryMemory = new CarsRepositoryMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryMemory);
  })

  it("should be able to create a car", async () => {
    const carData = {
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 60,
      license_plate: 'TRT787',
      fine_amount: 45,
      brand: 'Brand Test',
      category_id: 'category',
    };

    const car = await createCarUseCase.execute(carData);

    expect(car).toHaveProperty("id");
  })

  it("should not be able to create duplicate cars", () => {
    expect(async () => {
      const car1 = {
        name: 'Name Car_1',
        description: 'Description Car',
        daily_rate: 60,
        license_plate: 'TRT787',
        fine_amount: 45,
        brand: 'Brand Test',
        category_id: 'category',
      };

      const car2 = {
        name: 'Name Car_2',
        description: 'Description Car',
        daily_rate: 60,
        license_plate: 'TRT787',
        fine_amount: 45,
        brand: 'Brand Test',
        category_id: 'category',
      };

      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);

    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a car with valid availability", async () => {
    const carData = {
      name: 'Name Car available',
      description: 'Description Car',
      daily_rate: 60,
      license_plate: 'TRT787',
      fine_amount: 45,
      brand: 'Brand Test',
      category_id: 'category',
    };

    const car = await createCarUseCase.execute(carData);

    expect(car.available).toBe(true);

  })
})