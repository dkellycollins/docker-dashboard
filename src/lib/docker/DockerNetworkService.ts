import { DockerContext } from "./DockerContext";

export interface DockerNetwork {
  id: string;
  name: string;
}

export class DockerNetworkService {
  public constructor(
    private readonly context: DockerContext
  ) {

  }

  public async listNetworks(): Promise<Array<DockerNetwork>> {
    const infos = await this.context.client.listNetworks({ dangling: true });
    return infos.map(info => ({
      id: info.Id,
      name: info.Name
    }));
  }
}
