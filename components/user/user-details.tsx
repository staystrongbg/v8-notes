"use client";

import UpdateEmailForm from "./update-email-form";
import UpdateImageForm from "./update-image-form";
import UpdatePasswordForm from "./update-pasword-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const UserDetails = () => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div className="mt-8">
      <Button variant="outline" onClick={() => setOpenDetails(!openDetails)}>
        Change
      </Button>
      {openDetails && (
        <section className="w-full mt-8 flex flex-col gap-8">
          {/* pass reset */}
          <div className="flex-1 flex-col gap-2">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <UpdatePasswordForm />
          </div>
          <Separator />
          {/* email update */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Change Email</h3>
            <UpdateEmailForm />
          </div>
          <Separator />
          {/* update name and image form */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Change Image & Name</h3>
            <UpdateImageForm />
          </div>
          <Separator />
        </section>
      )}
    </div>
  );
};
