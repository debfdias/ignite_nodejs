
import { Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

interface IPayload {
  sub: string;
}

class CreateRentalController {

  async handle(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization!;
    const [, token] = authHeader.split(' ');
    const { sub: user_id } = verify(token, "36aecfd4a953c6388e7d604881fd9088") as IPayload;

    const { car_id, expected_return_date } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id: user_id,
      expected_return_date
    })

    return response.status(201).json(rental);

  }
}

export { CreateRentalController }