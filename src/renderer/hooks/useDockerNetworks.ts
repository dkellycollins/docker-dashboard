import { DockerNetwork, DockerNetworkService } from "../../lib/docker/DockerNetworkService";
import { useState, useEffect } from "react";
import { DockerContext } from "../../lib/docker/DockerContext";
import { orderBy } from "lodash";

export function useDockerNetworks(): Array<DockerNetwork> {
  const [networks, setNetworks] = useState<Array<DockerNetwork>>([]);

  useEffect(() => {
    const context = new DockerContext();
    const service = new DockerNetworkService(context);
    const loadNetworks = async () => {
      const results = await service.listNetworks();
      const orderedResults = orderBy(results, i => i.name);
      setNetworks(orderedResults);
    }

    loadNetworks();
  });

  return networks;
}
