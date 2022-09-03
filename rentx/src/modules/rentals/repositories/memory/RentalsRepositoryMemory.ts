import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepositoryMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findRentalByCar(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date);
  }

  async findRentalByUser(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date);
  }

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental | undefined> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUserId(user_id: string): Promise<Rental[] | undefined> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }

}

export { RentalsRepositoryMemory }