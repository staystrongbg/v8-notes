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
    <div className="mt-8">
      <Button variant="outline" onClick={() => setOnClose(!onClose)}>
        Change
      </Button>
      {!onClose && (
        <section className="max-w-2xl w-lg mt-8 flex flex-col gap-8">
          {/* pass reset */}
          <div>
            <h3>Change Password</h3>
            <UpdatePasswordForm />
          </div>
          <Separator />
          {/* email update */}
          <div>
            <h3>Change Email</h3>
            <UpdateEmailForm />
          </div>
          <Separator />
          {/* update name and image form */}
          <div>
            <h3>Change Image & Name</h3>
            <UpdateImageForm />
          </div>
          <Separator />
        </section>
      )}
    </div>
  );
};
