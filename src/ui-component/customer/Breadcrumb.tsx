import React from "react";
import { useLocation } from "react-router-dom";

export interface BreadcrumbProps {
  delimiter?: string;
  override?: (string | undefined)[];
  className?: string;
  replace?: {
    position?: number;
    content?: string;
  };
}

export function Breadcrumb({
  delimiter = "/",
  override,
  className,
  replace,
}: BreadcrumbProps) {
  const router = useLocation();
  const segments = router.pathname.split("/").map((label, index, array) => {
    return index === 0
      ? {
          label: override?.[index] || "home",
          path: "/",
        }
      : {
          label: override?.[index] || label,
          path: array.slice(0, index + 1).join("/"),
        };
  });

  return (
    <nav
      aria-label="breadcrumb"
      className={`breadcrumb-container ${className || ""}`}
    >
      <ol className="breadcrumb">
        {segments.map((segment, index) => {
          return replace ? (
            <li className="breadcrumb-item" key={`breadcrumb-${index}`}>
              <a href={segment.path} className="breadcrumb-link">
                {index === replace?.position ? replace?.content : segment?.label}
              </a>
            </li>
          ) : (
            <li className="breadcrumb-item" key={`breadcrumb-${index}`}>
              <a href={segment.path} className="breadcrumb-link">
                {segment.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
