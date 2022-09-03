import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { AppError } from "../../../../errors/AppError";
import { Rental } from "../../entities/Rental";

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DevolutionRentalUseCase {

  constructor (
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {};

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental!.car_id);

    if(!rental) {
      throw new AppError("Rental does not exists!");
    }

    //TODO CALCULATE TOTAL RENTAL
    rental.total = car!.daily_rate;
    rental.end_date = new Date();

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car!.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase }