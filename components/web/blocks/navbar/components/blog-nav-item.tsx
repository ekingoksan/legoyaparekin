// GLOBAL CUSTOM COMPONENTS

// LOCAL CUSTOM COMPONENTS
import DropdownToggleLink from "@/components/web/reuseable/links/DropdownToggleLink";
import renderLinks from "./render-links";
// CUSTOM DATA
import { blogsNavigation } from "data/navigation";
import ListItemLink from "@/components/web/reuseable/links/ListItemLink";

export default function BlogNavItem() {
  return (
    <li className="nav-item dropdown">
      <DropdownToggleLink title="Blog" className="nav-link dropdown-toggle" />

      <ul className="dropdown-menu">
        {blogsNavigation.map(({ id, url, title, children }) => {
          if (!url && children) {
            return (
              <li className="dropdown dropdown-submenu dropend" key={id}>
                <DropdownToggleLink title="Blog Posts" />
                <ul className="dropdown-menu">{renderLinks(children)}</ul>
              </li>
            );
          }
          return <ListItemLink key={id} href={url} title={title} linkClassName="dropdown-item" />;
        })}
      </ul>
    </li>
  );
}
