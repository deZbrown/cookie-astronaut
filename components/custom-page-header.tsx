import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

interface CustomPageHeaderProps {
  className?: string;
}

const CustomPageHeader: React.FC<CustomPageHeaderProps> = ({ className }) => {
  return (
    <PageHeader className={className}>
      <Link
        href="/docs/changelog"
        className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
      >
        🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span className="sm:hidden">Style, a new CLI and more.</span>
        <span className="hidden sm:inline">
          Introducing Style, a new CLI and more.
        </span>
      </Link>
      <PageHeaderHeading>Build your component library.</PageHeaderHeading>
      <PageHeaderDescription>
        Beautifully designed components that you can copy and paste into your
        apps. Accessible. Customizable. Open Source.
      </PageHeaderDescription>
      <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
        <Link href="/docs" className={cn(buttonVariants())}>
          Get Started
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Link>
      </div>
    </PageHeader>
  );
};

export default CustomPageHeader;
