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
      childNodes: containers
        .flatMap(container => {
          return container.names.map(name => ({
            id: container.id,
            label: name
          }));
        })
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    {
      id: '_images',
      label: 'Images',
      isExpanded: getTreeNode('_images').isExpanded,
      childNodes: images
        .flatMap(image => {
          return image.tags.map(tag => ({
            id: image.id,
            label: tag
          }));
        })
        .sort((a, b) => a.label.localeCompare(b.label))
    }
  ];
  
  return (
    <Tree
      contents={contents}
      onNodeExpand={(node) => updateTreeNode(node.id.toString(), true)}
      onNodeCollapse={(node) => updateTreeNode(node.id.toString(), false)}
    />
  );
}
