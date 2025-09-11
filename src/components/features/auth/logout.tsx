"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import React from "react";

const Logout = () => {
  return <LogOut className="text-red-500 transform rotate-180" size={16} />;
};

export default Logout;
