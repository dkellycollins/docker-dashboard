import React, { FC } from "react";
import { useDockerContainers } from "../hooks/useDockerContainers";
import { useDockerImages } from "../hooks/useDockerImages";
import { ITreeNode, Tree } from "@blueprintjs/core";
import { useTreeNodeState } from "../hooks/useTreeNodeState";

export const NavigationPanel: FC = () => {
  const containers = useDockerContainers();
  const images = useDockerImages();

  const [getTreeNode, updateTreeNode] = useTreeNodeState();

  const contents: Array<ITreeNode> = [
    { 
      id: '_containers', 
      label: 'Containers', 
      isExpanded: getTreeNode('_containers').isExpanded, 
      childNodes: containers.map(container => ({
        id: container.id,
        label: container.names.join(', '),
        secondaryLabel: container.image
      }))
    },
    {
      id: '_images',
      label: 'Images',
      isExpanded: getTreeNode('_images').isExpanded,
      childNodes: images.map(image => ({
        id: image.id,
        label: image.tags.join(',')
      }))
    }
  ];
  
  return (
    <Tree 
      contents={contents}
      onNodeExpand={(node) => updateTreeNode(node.id.toString(), { isExpanded: true })}
      onNodeCollapse={(node) => updateTreeNode(node.id.toString(), { isExpanded: false })}
    />
  );
}
