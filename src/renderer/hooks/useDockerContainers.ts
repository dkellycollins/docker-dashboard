import { DockerContainer, DockerContainerService } from "../../lib/docker/DockerContainerService";
import { useState, useEffect } from "react";
import { DockerContext } from "../../lib/docker/DockerContext";
import { orderBy } from 'lodash';

export function useDockerContainers(): Array<DockerContainer> {
  const [containers, setContainers] = useState<Array<DockerContainer>>([]);

  useEffect(() => {
    const context = new DockerContext();
    const service = new DockerContainerService(context);
    const loadContainers = async () => {
      const results = await service.listContainers();
      const orderedResults = orderBy(results, i => i.names[0]);
      setContainers(orderedResults);
    };

    loadContainers();
  }, []);

  return containers;
}
