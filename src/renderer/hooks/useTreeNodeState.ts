import { useState } from "react";

export interface TreeNodeState {
  isExpanded: boolean;
}

export function useTreeNodeState(): [(id: string) => TreeNodeState, (id: string, isExpanded: boolean) => void] {
  const [state, setState] = useState({});

  const getTreeNode = (id: string) => state[id] || { isExpanded: false };
  const setIsExpanded = (id: string, isExpanded: boolean) => {
    setState({
      ...state,
      [id]: {
        ...(state[id] || { isExpanded: false }),
        isExpanded: isExpanded
      }
    });
  }

  return [getTreeNode, setIsExpanded];
}
