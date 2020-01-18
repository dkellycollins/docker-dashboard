
export interface NavigationItem {
  label: string;
  viewData?: ViewData;
}

export type ViewData = ContainerDetailsViewData;

export interface ContainerDetailsViewData {
  viewType: 'container-details',
  containerId: string;
}
