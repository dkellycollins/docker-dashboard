import React, { FC } from "react";
import { Navbar, NavbarHeading, NavbarGroup, NavbarDivider, Breadcrumbs, IBreadcrumbProps, Breadcrumb } from "@blueprintjs/core";
import { useNavigationContext } from "../contexts/NavigationContext";
import { useObservable } from "../hooks/useObservable";

export const Toolbar: FC = () => {
  const [navigationContext] = useNavigationContext();
  const stack = useObservable(navigationContext.stack, []);

  const breadcrumbs: Array<IBreadcrumbProps> = stack
    .map(item => ({
      text: item.label
    }));
  const renderBreadcrumb = ({ text, ...props}: IBreadcrumbProps) => {
    return <Breadcrumb {...props}>{text}</Breadcrumb>;
  }

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>Docker Explorer</NavbarHeading>
        <NavbarDivider />
        <Breadcrumbs 
          items={breadcrumbs}
          breadcrumbRenderer={renderBreadcrumb}
        />
      </NavbarGroup>
    </Navbar>
  );
}
