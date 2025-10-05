"use client";
import React, { useCallback, useMemo } from "react";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import {
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT_VARIANT_ADD,
  ADMIN_PRODUCT_VARIANT_EDIT,
  ADMIN_PRODUCT_VARIANT_SHOW,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoutes";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import { columnConfig } from "@/lib/helperFunction";
import { DT_PRODUCT_VARIANT_COLUMN } from "@/lib/column";
import EditAction from "@/components/Application/Admin/EditAction";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_VARIANT_SHOW, label: "Product Variant" },
];
const ShowProductVariant = () => {
  const columns = useMemo(() => {
    return columnConfig(DT_PRODUCT_VARIANT_COLUMN);
  }, []);

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <EditAction
        key="edit"
        href={ADMIN_PRODUCT_VARIANT_EDIT(row.original._id)}
      ></EditAction>
    );
    actionMenu.push(
      <DeleteAction
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      ></DeleteAction>
    );

    return actionMenu;
  }, []);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Show Product Variant</h4>
            <Button>
              <FiPlus />
              <Link href={ADMIN_PRODUCT_VARIANT_ADD}>New Product Variant</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <DatatableWrapper
            queryKey="product-variant-data"
            fetchUrl="/api/product-variant"
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint="/api/product-variant/export"
            deleteEndpoint="/api/product-variant/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashof=product-variant`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowProductVariant;
