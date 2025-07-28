import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "../sanity/lib/queries";
import { after } from "next/server";
import { writeClient } from "@/sanity/lib/write_client";
import { Eye } from "lucide-react";

const View = async ({ id }: { id: string }) => {
  const { view: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ view: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="view-badge">
        <div className="view-ping">
          <Ping />
        </div>
        <Eye className="w-4 h-4 mr-2" />
        <span className="font-semibold">
          {totalViews || 0} {totalViews === 1 ? 'view' : 'views'}
        </span>
      </div>
    </div>
  );
};

export default View;