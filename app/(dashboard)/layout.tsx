import { Sidebar } from "./_components/sidebar";
import { OrgSidebar } from "./_components/orgs-sidebar";
import { Navbar } from "./_components/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({
    children,
}: DashboardLayoutProps) => {
    return (
        <main className="h-full w-screen md:w-fit" style={{ width: "100vw" }}>
            <Sidebar />
            <div className="md:pl-[60px] h-full">

                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />


                    <div className="h-full flex-1">
                        <Navbar />
                        {children}

                    </div>
                </div>

            </div>
        </main>
    )
}

export default DashboardLayout;