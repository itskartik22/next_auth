"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import FormError from "./FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const userRole = useCurrentRole();

  if (allowedRole !== userRole) {
    return <FormError message="You are not allowed to access this route." />;
  }

  return <>{children}</>;
};


export default RoleGate;