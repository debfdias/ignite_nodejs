
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryMemory } from "../../repositories/memory/UsersRepositoryMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryMemory: UsersRepositoryMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryMemory = new UsersRepositoryMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMemory);
  })

  it("should be possible authenticate user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123ABC",
      email: "user@test.com",
      password: "1234",
      name: "Testable Name"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token");
  })

  it("should not be possible to authenticate a non existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "test@email.comomom",
        password: "12212"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be possible to authenticate with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "999TRT",
        email: "user@user.com",
        password: "1234",
        name: "Testable Name II"
      }
  
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})