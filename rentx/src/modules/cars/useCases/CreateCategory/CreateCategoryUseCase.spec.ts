import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryMemory } from "../../repositories/in-memory/CategoriesRepositoryMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMemory: CategoriesRepositoryMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryMemory = new CategoriesRepositoryMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMemory);
  })

  it("Should be able to create a category", async () => {
    const category = {
      name: "Category test name",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })

    const categoryCreated = await categoriesRepositoryMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  })

  it("Should not be able to create a existing category", async () => {
    expect(async () => {
      const category = {
        name: "Category test name",
        description: "Category description test"
      }
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})