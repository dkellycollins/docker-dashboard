import { DockerVolume, DockerVolumeService } from "../../lib/docker/DockerVolumeServices";
import { useState, useEffect } from "react";
import { DockerContext } from "../../lib/docker/DockerContext";
import { orderBy } from "lodash";

export function useDockerVolumes(): Array<DockerVolume> {
  const [volumes, setVolumes] = useState<Array<DockerVolume>>([]);

  useEffect(() => {
    const context = new DockerContext();
    const service = new DockerVolumeService(context);
    const loadVolumes = async () => {
      const results = await service.listVolumes();
      const orderedResults = orderBy(results, i => i.name);
      setVolumes(orderedResults);
    }

    loadVolumes();
  }, []);

  return volumes;
}
