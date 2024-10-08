"use client";

import { UserButton, OrganizationSwitcher, useOrganization } from "@clerk/nextjs";

import React from "react";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { useSearchParams } from "next/navigation";

export const Navbar = () => {
    const { organization } = useOrganization();
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    return (
        <div className="flex items-center gap-x-4 p-5 ">
            <div className="hidden lg:flex-1 lg:flex ">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher hidePersonal appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                        }
                    }
                }} />
            </div>
            {organization && (<InviteButton />)}

            <UserButton />
        </div>
    );
};