import e, { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        try {
            await importCategoryUseCase.execute(file);

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { ImportCategoryController };
