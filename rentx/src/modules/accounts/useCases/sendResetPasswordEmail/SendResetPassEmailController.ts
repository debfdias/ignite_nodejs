import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendResetPassMailUseCase } from "./SendResetPassMailUseCase";

class SendResetPassEmailController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendResetPasswordUseCase = container.resolve(SendResetPassMailUseCase);

    await sendResetPasswordUseCase.execute(email);

    return response.send();
  }
}

export { SendResetPassEmailController }