import React, { FC } from "react";
import { Navbar, NavbarHeading, NavbarGroup } from "@blueprintjs/core";

export const Toolbar: FC = () => {
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>Docker Explorer</NavbarHeading>
      </NavbarGroup>
    </Navbar>
  );
}
