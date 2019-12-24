import React, { FC } from "react";
import { useNavigationContext, NavigationItem } from "../contexts/NavigationContext";
import { useDockerVolumes } from "../hooks/useDockerVolumes";
import { useTreeNodeState } from "../hooks/useTreeNodeState";
import { ITreeNode, Tree } from "@blueprintjs/core";

export const VolumesNavigation: FC = () => {
  const [_, { goTo }] = useNavigationContext();
  const volumes = useDockerVolumes();
  const [getTreeNode, updateTreeNode] = useTreeNodeState();

  const contents: Array<ITreeNode<Array<NavigationItem<unknown>>>> = [
    { 
      id: '_volumes', 
      label: 'Volumes', 
      nodeData: [ { label: 'Volumes' }],
      isExpanded: getTreeNode('_volumes').isExpanded, 
      childNodes: volumes
        .map(volume => {
          return {
            id: volume.name,
            label: volume.name,
            nodeData: [
              { label: 'Volumes' },
              { label: name }
            ]
          }
        })
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
