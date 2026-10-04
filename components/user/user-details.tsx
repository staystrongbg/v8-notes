"use client";

import UpdateEmailForm from "./update-email-form";
import UpdateImageForm from "./update-image-form";
import UpdatePasswordForm from "./update-pasword-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const UserDetails = () => {
  const [onClose, setOnClose] = useState(true);
  return (
    <div className="mt-6 border-t border-dashed border-border pt-5 font-mono">
      <Button variant="outline" size="sm" onClick={() => setOnClose(!onClose)} className="font-mono text-xs">
        {onClose ? "$ settings --open" : "$ settings --close"}
      </Button>
      {!onClose && (
        <section className="mt-5 flex w-full flex-col gap-6">
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wider text-foreground uppercase">
              <span className="mr-1.5 text-primary">❯</span>passwd
            </h3>
            <UpdatePasswordForm />
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wider text-foreground uppercase">
              <span className="mr-1.5 text-primary">❯</span>email --update
            </h3>
            <UpdateEmailForm />
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wider text-foreground uppercase">
              <span className="mr-1.5 text-primary">❯</span>profile --update
            </h3>
            <UpdateImageForm />
          </div>
        </section>
      )}
    </div>
  );
};
