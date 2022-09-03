import { CarsRepositoryMemory } from "../../../cars/repositories/in-memory/CarsRepositoryMemory";
import dayjs from "dayjs";

import { AppError } from "../../../../errors/AppError";
import { RentalsRepositoryMemory } from "../../repositories/memory/RentalsRepositoryMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryMemory: RentalsRepositoryMemory;
let carsRepositoryMemory: CarsRepositoryMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryMemory = new RentalsRepositoryMemory();
    carsRepositoryMemory = new CarsRepositoryMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryMemory, carsRepositoryMemory);
  })

  it("should be able to create a new rental", async () => {
    const carData = {
      name: "car name",
      description: "test",
      daily_rate: 100,
      license_plate: "test-123",
      fine_amount: 30,
      category_id: "1234",
      brand: "test brand"
    }

    const car = await carsRepositoryMemory.create(carData);

    const rentalData = {
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    }

    const rental = await createRentalUseCase.execute(rentalData);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it("should not be able to create a new rental if the user already has a open rental", async () => {
    expect(async () => {
      const data = {
        user_id: "12345",
        car_id: "434343",
        expected_return_date: dayAdd24Hours,
      }
  
      const data2 = {
        user_id: "12345",
        car_id: "095454",
        expected_return_date: dayAdd24Hours,
      }
  
      await createRentalUseCase.execute(data);
      await createRentalUseCase.execute(data2);
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should not be able to create a new rental if the car already is rented", async () => {
    expect(async () => {
      const data = {
        user_id: "909090",
        car_id: "33333",
        expected_return_date: dayAdd24Hours,
      }
  
      const data2 = {
        user_id: "909090",
        car_id: "33333",
        expected_return_date: dayAdd24Hours,
      }
  
      await createRentalUseCase.execute(data);
      await createRentalUseCase.execute(data2);
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const data = {
        user_id: "909090",
        car_id: "33333",
        expected_return_date: dayjs().toDate(),
      }
      
      await createRentalUseCase.execute(data);
    }).rejects.toBeInstanceOf(AppError);
  })

})