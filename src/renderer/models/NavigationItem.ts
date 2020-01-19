
export interface NavigationItem {
  label: string;
  viewData?: ViewData;
}

export type ViewData = 
  | ContainerDetailsViewData
  | ImageDetailsViewData;

export interface ContainerDetailsViewData {
  viewType: 'container-details',
  containerId: string;
}

export interface ImageDetailsViewData {
  viewType: 'image-details',
  imageId: string;
}
