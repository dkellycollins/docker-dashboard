import React, { FC } from "react";
import { useDockerContainers } from "../hooks/useDockerContainers";
import { useDockerImages } from "../hooks/useDockerImages";
import { ITreeNode, Tree } from "@blueprintjs/core";
import { useTreeNodeState } from "../hooks/useTreeNodeState";
import { useNavigationContext, NavigationItem } from "../contexts/NavigationContext";

export const NavigationPanel: FC = () => {
  const [_, { goTo }] = useNavigationContext();
  const containers = useDockerContainers();
  const images = useDockerImages();

  const [getTreeNode, updateTreeNode] = useTreeNodeState();

  const contents: Array<ITreeNode<Array<NavigationItem<unknown>>>> = [
    { 
      id: '_containers', 
      label: 'Containers', 
      nodeData: [ { label: 'Containers', viewData: {} }],
      isExpanded: getTreeNode('_containers').isExpanded, 
      childNodes: containers
        .flatMap(container => {
          return container.names.map((name, index) => ({
            id: `${container.id}_${index}`,
            label: name,
            nodeData: [ { label: 'Containers', viewData: {} }, { label: name, viewData: { type: 'container', id: container.id }}]
          }));
        })
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    {
      id: '_images',
      label: 'Images',
      nodeData: [ { label: 'Images', viewData: {} }],
      isExpanded: getTreeNode('_images').isExpanded,
      childNodes: images
        .flatMap(image => {
          return image.tags.map((tag, index) => ({
            id: `${image.id}_${index}`,
            label: tag,
            nodeData: [ { label: 'Images', viewData: {} }, { label: tag, viewData: { type: 'image', id: image.id }}]
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
      onNodeClick={(node) => goTo(node.nodeData)}
    />
  );
}
