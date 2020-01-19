import { DockerImageListItem, DockerImageService } from "../../lib/docker/DockerImageService";
import { useEffect, useState } from "react";
import { DockerContext } from "../../lib/docker/DockerContext";
import { orderBy, first } from "lodash";

export function useDockerImages(): Array<DockerImageListItem> {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const context = new DockerContext();
    const service = new DockerImageService(context);
    const loadImages = async () => {
      const results = (await service.listImages()) || [];
      const orderedResults = orderBy(results, i => first(i.tags));

      setImages(orderedResults);
    };

    loadImages();
  }, []);

  return images;
}
