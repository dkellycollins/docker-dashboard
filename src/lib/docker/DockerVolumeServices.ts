import { DockerContext } from "./DockerContext";

export interface DockerVolume {
  name: string;
}

export class DockerVolumeService {
  public constructor(
    private readonly context: DockerContext
  ) {

  }

  public async listVolumes(): Promise<Array<DockerVolume>> {
    const result = await this.context.client.listVolumes({ dangling: true });
    return result.Volumes.map(info => ({
      name: info.Name
    }));
  }
}
