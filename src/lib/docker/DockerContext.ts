import Docker from 'dockerode';

export class DockerContext {
  private readonly socketPath: string = '//./pipe/docker_engine';

  private _client: Docker | undefined;

  public get client(): Docker {
    if (!this._client) {
      this._client = new Docker({
        socketPath: this.socketPath
      });
    }

    return this._client;
  }
}
