import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CircleCheck, Info, TriangleAlert, OctagonX, Loader2 } from "lucide-react";

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        // Added styling utilities to position the icons properly inside the layout structure
        success: <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />,
        info: <Info className="mt-0.5 size-4 shrink-0 text-blue-500" />,
        warning: <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />,
        error: <OctagonX className="text-destructive mt-0.5 size-4 shrink-0" />,
        loading: <Loader2 className="text-muted-foreground mt-0.5 size-4 shrink-0 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          // 1. Fixed Layout Flow: Set flex structure and internal item spacing alignments
          toast:
            "group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:rounded-xl group-[.toaster]:shadow-2xl flex items-start gap-3 p-4",

          // 2. Fixed Typography Weights: Restored Title bold contrast and description separation
          title: "text-sm font-semibold tracking-tight text-white leading-tight",
          description: "text-xs font-normal text-neutral-400 leading-normal mt-1",

          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};
