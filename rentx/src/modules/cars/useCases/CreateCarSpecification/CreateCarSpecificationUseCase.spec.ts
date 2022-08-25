import { SpecificationMemory } from "../../repositories/in-memory/SpecificationMemory";
import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryMemory } from "../../repositories/in-memory/CarsRepositoryMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMemory: CarsRepositoryMemory;
let specificationsRepositoryMemory: SpecificationMemory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryMemory = new CarsRepositoryMemory();
    specificationsRepositoryMemory = new SpecificationMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMemory,
      specificationsRepositoryMemory); 
  })

  it("should not be able to add a new specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["543321"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a car specification", async () => {
    const carData = {
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 60,
      license_plate: 'TRT787',
      fine_amount: 45,
      brand: 'Brand Test',
      category_id: 'category',
    };

    const specification = await specificationsRepositoryMemory.create({
      description: "test",
      name: "test",
    })

    const specifications_id = [specification.id!];

    const car = await carsRepositoryMemory.create(carData);

    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id});

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  })
})