import { useState } from "react";

export interface TreeNodeState {
  isExpanded: boolean;
}

export function useTreeNodeState(): [(id: string) => TreeNodeState, (id: string, state: TreeNodeState) => void] {
  const [state, setState] = useState({});

  const getTreeNode = (id: string) => state[id] || { isExpanded: false };
  const updateTreeNode = (id: string, newState: TreeNodeState) => setState({ ...state, [id]: newState });

  return [getTreeNode, updateTreeNode];
}
