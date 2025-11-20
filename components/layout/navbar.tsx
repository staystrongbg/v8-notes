import { LINKS } from "@/constants";
import { ActiveLink } from "./active-link";
import { UserSessionButton } from "../user/user-session-button";

export default async function Navbar() {
  return (
    <div className="flex items-center p-4 justify-between">
      <div className="flex items-center gap-4">
        {LINKS.map((item) => {
          return (
            <ActiveLink
              key={item.name}
              href={item.href}
              className="flex items-center gap-2"
            >
              <item.icon />
              {item.name}
            </ActiveLink>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <UserSessionButton />
      </div>
    </div>
  );
}
