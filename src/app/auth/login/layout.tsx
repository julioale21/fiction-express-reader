import { BasicAppbar } from "@/common/components";
import { Stack } from "@mui/material";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Stack>
      <BasicAppbar />
      {children}
    </Stack>
  );
};

export default AuthLayout;
