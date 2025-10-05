import React from "react";
import Link from "next/link";
import CountOverview from "./CountOverview";
import QuickAdd from "./QuickAdd";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderOverview } from "./OrderOverview";
import { OrderStatus } from "./OrderStatus";
import LatestOrder from "./LatestOrder";
import LatestReview from "./LatestReview";
import { ADMIN_ORDER_SHOW, ADMIN_REVIEW_SHOW } from "@/routes/AdminPanelRoutes";

const AdminDashboard = () => {
  return (
    <div>
      <CountOverview></CountOverview>
      <QuickAdd></QuickAdd>

      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className="rounded-lg lg:w-[70%] w-full p-0">
          <CardHeader className="py-3 [.border-b]:pb-3">
            <div className="flex justify-between items-center">
              <span>Order Overview</span>
              <Button type="button">
                <Link href={ADMIN_ORDER_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderOverview></OrderOverview>
          </CardContent>
        </Card>
        <Card className="rounded-lg lg:w-[30%] w-full p-0">
          <CardHeader className="py-3 [.border-b]:pb-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Orders Status</span>
              <Button type="button">
                <Link href={ADMIN_ORDER_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderStatus></OrderStatus>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className="rounded-lg lg:w-[70%] w-full p-0  block">
          <CardHeader className="py-3 [.border-b]:pb-3">
            <div className="flex justify-between items-center">
              <span>Latest Order</span>
              <Button type="button">
                <Link href={ADMIN_ORDER_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 lg:h-[350px] overflow-auto">
            <LatestOrder />
          </CardContent>
        </Card>
        <Card className="rounded-lg lg:w-[30%] w-full p-0">
          <CardHeader className="py-3 [.border-b]:pb-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Latest Review</span>
              <Button type="button">
                <Link href={ADMIN_REVIEW_SHOW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-1 pt-4 lg:h-[350px] overflow-auto">
            <LatestReview></LatestReview>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
