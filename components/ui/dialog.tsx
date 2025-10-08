// components/ui/dialog.tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;
export const DialogContent: React.FC<React.ComponentProps<typeof DialogPrimitive.Content>> = (props) => {
  return <DialogPrimitive.Content {...props} className={props.className} />;
};
export const DialogClose = DialogPrimitive.Close;

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DialogPrimitive.Title className="text-lg font-bold">{children}</DialogPrimitive.Title>
);

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`${className || ""} mt-4 flex justify-end gap-2`} {...props}>
    {children}
  </div>
);
