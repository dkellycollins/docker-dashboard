import { DockerContainer, DockerContainerService } from '../../lib/docker/DockerContainerService';
import { useState, useEffect, useCallback } from 'react';
import { DockerContext } from '../../lib/docker/DockerContext';

export function useDockerContainer(id: string): DockerContainer | undefined {
  const [state, setState] = useState<DockerContainer | undefined>(undefined);

  const load = useCallback(async () => {
    const context = new DockerContext();
    const service = new DockerContainerService(context);
    setState(await service.getContainer(id));
  }, [id]);
  useEffect(() => {
    load();
  }, [load]);

  return state;
}
