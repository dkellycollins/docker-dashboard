import { DockerImage, DockerImageService } from '../../lib/docker/DockerImageService';
import { useState, useCallback, useEffect } from 'react';
import { DockerContext } from '../../lib/docker/DockerContext';

export function useDockerImage(id: string): DockerImage | undefined {
  const [state, setState] = useState<DockerImage | undefined>(undefined);

  const load = useCallback(async () => {
    const context = new DockerContext();
    const service = new DockerImageService(context);
    setState(await service.getImage(id));
  }, [id]);
  useEffect(() => {
    load();
  }, [load]);

  return state;
}
