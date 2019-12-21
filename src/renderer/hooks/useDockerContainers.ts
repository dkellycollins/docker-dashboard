import { DockerContainer, DockerContainerService } from "../../lib/docker/DockerContainerService";
import { useState, useEffect } from "react";
import { DockerContext } from "../../lib/docker/DockerContext";

export function useDockerContainers(): Array<DockerContainer> {
  const [containers, setContainers] = useState<Array<DockerContainer>>([]);

  useEffect(() => {
    const context = new DockerContext();
    const service = new DockerContainerService(context);
    const loadContainers = async () => setContainers(await service.listContainers());

    loadContainers();
  }, []);

  return containers;
}
