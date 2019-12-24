import React, { FC } from "react";
import { ContainersNavigation } from "./ContainersNavigation";
import { ImagesNavigation } from "./ImagesNavigation";
import { NetworksNavigation } from "./NetworksNavigation";
import { VolumesNavigation } from "./VolumesNavigation";

export const NavigationPanel: FC = () => {
  return (
    <>
      <ContainersNavigation />
      <ImagesNavigation />
    </>
  );
}
