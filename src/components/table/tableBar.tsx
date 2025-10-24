"use client";

import FilterIcon from "@/assets/icons/filterIcon";
import FilterSelectItem from "@/components/filters/filterSelectItem";
import { FilterKey, Option } from "@/components/filters/keys";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterTextInput, useFilterContext } from "@/filter";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import FilterTabs from "../filters/filterTabs";
import LinkButton from "../shared/button/linkButton";
import TitleHeader from "../shared/title";
import { useTableProvider } from "./tableProvider"; // ⬅️ pakai provider terpisah
import clsx from "clsx";

type FilterItems = "date" | "kolom";

type Props = {
  title?: string;
  buttonAdd?: { label?: string; href: string };
  filterKeys?: FilterKey[];
  className?: string;
  children?: React.ReactNode;
  filterItems?: FilterItems[];
  filterTabs?: {
    options: Option[];
    name: string;
  };
  searchPlaceholder?: string;
  searchKey?: string | null;
  searchable?: boolean;
  mobileOrientation?: "vertical" | "horizontal";
};

type ColumnsVisibility = Record<string, boolean>;

export default function TableBar({
  title,
  buttonAdd,
  filterKeys = [],
  className,
  children,
  filterItems,
  filterTabs,
  searchPlaceholder,
  searchKey,
  searchable = true,
  mobileOrientation = "horizontal",
}: Props) {
  const { tableRef } = useTableProvider();
  const { resetValues, applyFilters, activeFilterCount } = useFilterContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);
  const [columnsVisible, setColumnsVisible] = useState<ColumnsVisibility>({});

  const getTable = () => tableRef.current?.table ?? null;

  // setiap kali menu columns dibuka, sync visibilitas terbaru dari table
  useEffect(() => {
    if (!columnsMenuOpen) return;
    const t = getTable();
    if (!t) return;

    const current: ColumnsVisibility = {};
    t.getAllColumns().forEach((col: any) => {
      current[col.id] = col.getIsVisible();
    });
    setColumnsVisible(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsMenuOpen]);

  const handleVisibilityChange = (columnId: string, isVisible: boolean) => {
    const t = getTable();
    if (!t) return;
    t.getColumn(columnId)?.toggleVisibility(isVisible);
    setColumnsVisible((prev) => ({ ...prev, [columnId]: isVisible }));
  };

  return (
    <div className={cn(className)}>
      <TitleHeader title={title} />
      <div
        className={cn("gap-5 mb-6", {
          "flex items-center justify-between":
            mobileOrientation === "horizontal",
          "flex sm:flex-row flex-col justify-between sm:items-center":
            mobileOrientation === "vertical",
        })}
      >
        <div>
          {/* Dialog Filter */}
          {searchable && (
            <FilterTextInput
              placeholder={searchPlaceholder}
              name={searchKey ?? "search"}
              className="md:w-60"
              prefixIcon={<Search />}
            />
          )}

          {/* Toggle kolom */}
          {/* {filterItems?.includes("kolom") && tableRef.current?.table && (
            <DropdownMenu
              open={columnsMenuOpen}
              onOpenChange={setColumnsMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border rounded-full py-2 px-2.5 w-fit bg-primary-foreground shadow-sm cursor-pointer"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {(() => {
                  const t = getTable();
                  if (!t) {
                    return (
                      <div className="py-2 px-3 text-sm text-muted-foreground">
                        Memuat kolom…
                      </div>
                    );
                  }
                  return t
                    .getAllColumns()
                    .filter((col: any) => col.getCanHide())
                    .map((col: any) => {
                      const isVisible =
                        columnsVisible[col.id] ?? col.getIsVisible();
                      return (
                        <DropdownMenuCheckboxItem
                          key={col.id}
                          className="capitalize"
                          checked={isVisible}
                          onCheckedChange={(v) =>
                            handleVisibilityChange(col.id, !!v)
                          }
                        >
                          {col.id}
                        </DropdownMenuCheckboxItem>
                      );
                    });
                })()}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {filterItems?.includes("date") && (
            <FilterDateRange startKey="startDate" endKey="endDate" />
          )} */}
        </div>

        <div className="flex gap-2 justify-between items-center">
          <div>
            {filterKeys.length != 0 && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full relative text-primary bg-white border-primary hover:bg-primary/90 hover:text-white"
                  >
                    <FilterIcon />
                    <span className="hidden md:block">Filter</span>
                    {/* {activeFilterCount !== 0 && (
                    <Badge className="aspect-square !w-5 !h-5 !p-0 absolute -top-2 -right-2 items-center text-xs justify-center rounded-full animate-pulse">
                      {activeFilterCount}
                    </Badge>
                  )} */}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl max-h-[40rem] overflow-y-auto">
                  <DialogTitle className="font-semibold text-xl text-start">
                    Filter
                  </DialogTitle>
                  <div className="grid grid-cols-1 gap-y-5 mt-4">
                    {filterKeys.map((k) => (
                      <FilterSelectItem key={k} keyName={k} />
                    ))}

                    <div className="flex gap-x-4 justify-end items-center">
                      <Button
                        className="rounded-full w-40"
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetValues();
                          setDialogOpen(false);
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        className="rounded-full w-40"
                        onClick={() => {
                          setDialogOpen(false);
                          applyFilters?.();
                        }}
                      >
                        Terapkan
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div>
            {buttonAdd && (
              <LinkButton
                title={buttonAdd.label ?? "Tambah"}
                link={buttonAdd.href}
              />
            )}
          </div>
        </div>
      </div>
      {filterTabs && (
        <div className="mt-1 mb-5">
          <FilterTabs name={filterTabs.name} options={filterTabs.options} />
        </div>
      )}
      {children}
    </div>
  );
}
