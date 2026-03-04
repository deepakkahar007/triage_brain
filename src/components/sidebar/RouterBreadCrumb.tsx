"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const RouterBreadCrumb = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    return {
      label: decodeURIComponent(segment),
      href,
    };
  });

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
                {index !== breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </BreadcrumbItem>
            ))}
            {/* <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" /> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default RouterBreadCrumb;
