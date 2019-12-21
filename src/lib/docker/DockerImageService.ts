import { DockerContext } from "./DockerContext";

export interface DockerImage {
  id: string;
  tags: Array<string>;
}

export class DockerImageService {
  public constructor(
    private readonly context: DockerContext
  ) {

  }

  public async listImages(): Promise<Array<DockerImage>> {
    const infos = await this.context.client.listImages();
    return infos.map(info => ({
      id: info.Id,
      tags: info.RepoTags
    }));
  }
}
