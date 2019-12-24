import React, { FC } from "react";
import { useNavigationContext, NavigationItem } from "../contexts/NavigationContext";
import { useDockerImages } from "../hooks/useDockerImages";
import { useTreeNodeState } from "../hooks/useTreeNodeState";
import { ITreeNode, Tree } from "@blueprintjs/core";

export const ImagesNavigation: FC = () => {
  const [_, { goTo }] = useNavigationContext();
  const images = useDockerImages();
  const [getTreeNode, updateTreeNode] = useTreeNodeState();

  const contents: Array<ITreeNode<Array<NavigationItem<unknown>>>> = [
    {
      id: '_images',
      label: 'Images',
      nodeData: [ { label: 'Images' }],
      isExpanded: getTreeNode('_images').isExpanded,
      childNodes: images
        .flatMap(image => {
          return image.tags.map((tag, index) => ({
            id: `${image.id}_${index}`,
            label: tag,
            nodeData: [ 
              { label: 'Images' }, 
              { label: tag }
            ]
          }));
        })
        .sort((a, b) => a.label.localeCompare(b.label))
    },
  ];

  return (
    <Tree 
      contents={contents}
      onNodeExpand={(node) => updateTreeNode(node.id.toString(), true)}
      onNodeCollapse={(node) => updateTreeNode(node.id.toString(), false)}
      onNodeClick={(node) => goTo(node.nodeData)}
    />
  )
}
