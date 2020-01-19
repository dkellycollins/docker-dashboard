import React, { FC } from "react";
import { useNavigationContext } from "../contexts/NavigationContext";
import { useDockerNetworks } from "../hooks/useDockerNetworks";
import { useTreeNodeState } from "../hooks/useTreeNodeState";
import { ITreeNode, Tree } from "@blueprintjs/core";
import { NavigationItem } from '../models/NavigationItem';

export const NetworksNavigation: FC = () => {
  const [_, { goTo }] = useNavigationContext();
  const networks = useDockerNetworks();
  const [getTreeNode, updateTreeNode] = useTreeNodeState();

  const contents: Array<ITreeNode<Array<NavigationItem>>> = [
    { 
      id: '_networks', 
      label: 'Networks', 
      nodeData: [ { label: 'Networks' }],
      isExpanded: getTreeNode('_networks').isExpanded, 
      childNodes: networks
        .map(network => {
          return {
            id: network.id,
            label: network.name,
            nodeData: [
              { label: 'Networks' },
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
