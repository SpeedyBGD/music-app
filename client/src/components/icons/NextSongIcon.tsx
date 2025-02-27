import React from "react";
import IconProps from "@/types/IconProps";

const NextSongIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 4v16l10-8-10-8z" />
    <path d="M19 4v16" />
  </svg>
);

export default NextSongIcon;
