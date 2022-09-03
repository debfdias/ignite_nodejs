import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

interface IRentalsRepository {
  findRentalByCar(car_id: string): Promise<Rental | undefined>;
  findRentalByUser(user_id: string): Promise<Rental | undefined>
  create(data: ICreateRentalDTO): Promise<Rental | undefined>;
  findById(id: string): Promise<Rental | undefined>;
  findByUserId(user_id: string): Promise<Rental[] | undefined>;
}

export { IRentalsRepository }