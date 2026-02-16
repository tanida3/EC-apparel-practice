"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#1A1A1A] text-white hover:bg-[#333] disabled:bg-[#999]",
  secondary: "bg-[#E85D3A] text-white hover:bg-[#D14E2E] disabled:bg-[#E8A08E]",
  outline:
    "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F5F5F5] disabled:border-[#D1D5DB] disabled:text-[#9CA3AF]",
  ghost: "text-[#1A1A1A] hover:bg-[#F5F5F5] disabled:text-[#9CA3AF]",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C] disabled:bg-[#F87171]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};
