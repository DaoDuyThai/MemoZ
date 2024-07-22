"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";

const DashboardPage = () => {

  const { organization } = useOrganization();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined
  
  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col p-6 overflow-y-scroll">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={{search, favorites }}
        />
      )}
    </div>
  );
};

export default DashboardPage;