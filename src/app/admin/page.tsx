"use client";

import { HeaderApplication } from "@/components/HeaderApplication";
import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  


export default function AdminLayout() {
  return (
    <div className="flex items-center justify-between bg-green-100 px-4 py-3 text-white md:px-6">
      <HeaderApplication />


    </div>
  );
}