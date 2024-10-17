import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const CelebrationAnimation = dynamic(() => import("./CelebrationAnimation"), {
  ssr: false,
});

const FinishBookCelebration = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.8)",
        zIndex: 1000,
      }}
    >
      <CelebrationAnimation />
    </Box>
  );
};

export { FinishBookCelebration };
