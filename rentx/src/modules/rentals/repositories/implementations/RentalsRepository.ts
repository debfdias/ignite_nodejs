import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findByUserId(user_id: string): Promise<Rental[] | undefined> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"]
     });

    return rentals;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rentalByCar = await this.repository.findOne({ 
      where: { car_id, end_date: null }
     })
    return rentalByCar;
  }

  async findRentalByUser(user_id: string): Promise<Rental | undefined> {
    const rentalByUser = await this.repository.findOne({ 
      where: { user_id, end_date: null }
     })
    return rentalByUser;
  }

  async create({ car_id, user_id, expected_return_date, total, id, end_date }: ICreateRentalDTO): Promise<Rental | undefined> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      total,
      id,
      end_date
    });

    await this.repository.save(rental);

    return rental;
  }
  
}

export { RentalsRepository }