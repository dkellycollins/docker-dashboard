import { DockerContext } from "./DockerContext";

export interface DockerContainerListItem {
  id: string;
  names: Array<string>;
  image: string;
}

export interface DockerContainer {
  id: string;
  raw: object;
}

export class DockerContainerService {
  public constructor(
    private readonly context: DockerContext
  ) {

  }

  public async listContainers(): Promise<Array<DockerContainerListItem>> {
    const containers = await this.context.client.listContainers({ all: true });
    return containers.map(info => ({
      id: info.Id,
      names: info.Names,
      image: info.Image
    }))
  }

  public async getContainer(id: string): Promise<DockerContainer> {
    const container = this.context.client.getContainer(id);
    const info = await container.inspect();
    return {
      id: info.Id,
      raw: info
    };
  }
}
