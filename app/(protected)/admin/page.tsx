"use client";

import { admin } from "@/actions/admin";
import FormSuccess from "@/components/FormSuccess";
import RoleGate from "@/components/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((res) => {
      if (res.success) {
        toast.success("Allowed Access!");
      } else {
        toast.error("You are not allowed!");
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        console.log("Allowed Access!");
        toast.success("Allowed Access!");
      } else {
        console.log("You are not allowed!");
        toast.error("You are not allowed!");
      }
    });
  };

  return (
    <Card>
      <CardHeader className="w-[600px] flex flex-col gap-2">
        <p className="text-2xl font-semibold text-center">🔑Admin</p>
      </CardHeader>
      <CardContent className="w-[600px] flex flex-col gap-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to access this route." />
        </RoleGate>
        <div className="flex items-center justify-between shadow-md p-2 rounded-sm">
          <span className="font-medium">Admin-only API Route</span>
          <Button onClick={onApiRouteClick}>Test</Button>
        </div>
        <div className="flex items-center justify-between shadow-md p-2 rounded-sm">
          <span className="font-medium">Admin-only Server Action</span>
          <Button onClick={onServerActionClick}>Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
