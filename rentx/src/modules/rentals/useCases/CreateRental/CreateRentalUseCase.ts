import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { AppError } from "../../../../errors/AppError";
import { Rental } from "../../entities/Rental";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor (
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {};

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental | undefined> {

    const carUnavailable = await this.rentalsRepository.findRentalByCar(car_id);

    if(carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const userRental = await this.rentalsRepository.findRentalByUser(user_id);

    if(userRental) {
      throw new AppError("User already has a rental!");
    }

    const dateNow = dayjs().utc().local().format();
    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if(compare < 24) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }

}

export { CreateRentalUseCase }