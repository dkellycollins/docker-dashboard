import { DockerContext } from "./DockerContext";

export interface DockerImageListItem {
  id: string;
  tags: Array<string>;
}

export interface DockerImage {
  id: string;
  raw: object;
}

export class DockerImageService {
  public constructor(
    private readonly context: DockerContext
  ) {

  }

  public async listImages(): Promise<Array<DockerImageListItem>> {
    const infos = await this.context.client.listImages();
    return infos.map(info => ({
      id: info.Id,
      tags: info.RepoTags
    }));
  }

  public async getImage(id: string): Promise<DockerImage> {
    const image = this.context.client.getImage(id);
    const info = await image.inspect();
    return {
      id: info.Id,
      raw: info
    }
  }
}
