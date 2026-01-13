import { GetById } from './get.service';

export class destroy {
  constructor(private readonly id: string) {}

  async execute(): Promise<void> {
    const property = await new GetById(this.id).execute();
    await property.destroy();
  }
}
