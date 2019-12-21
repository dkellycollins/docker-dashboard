import { DockerContext } from "./DockerContext";

export interface DockerContainer {
  id: string;
  names: Array<string>;
  image: string;
}

export class DockerContainerService {
  public constructor(
    private readonly context: DockerContext
  ) {

  }

  public async listContainers(): Promise<Array<DockerContainer>> {
    const containers = await this.context.client.listContainers({ all: true });
    return containers.map(info => ({
      id: info.Id,
      names: info.Names,
      image: info.Image
    }))
  }
}
