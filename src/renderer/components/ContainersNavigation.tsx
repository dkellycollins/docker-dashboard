import React, { FC } from "react";
import { useNavigationContext } from "../contexts/NavigationContext";
import { useDockerContainers } from "../hooks/useDockerContainers";
import { useTreeNodeState } from "../hooks/useTreeNodeState";
import { ITreeNode, Tree } from "@blueprintjs/core";
import { NavigationItem } from '../models/NavigationItem';

export const ContainersNavigation: FC = () => {
  const [_, { goTo }] = useNavigationContext();
  const containers = useDockerContainers();
  const [getTreeNode, updateTreeNode] = useTreeNodeState();

  const contents: Array<ITreeNode<Array<NavigationItem>>> = [
    { 
      id: '_containers', 
      label: 'Containers', 
      nodeData: [ { label: 'Containers' }],
      isExpanded: getTreeNode('_containers').isExpanded, 
      childNodes: containers
        .flatMap(container => {
          return container.names.map((name, index) => ({
            id: `${container.id}_${index}`,
            label: name,
            nodeData: [ 
              { label: 'Containers' }, 
              { label: name,
                viewData: {
                  viewType: 'container-details' as const, 
                  containerId: container.id 
                }
              }
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
