import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "../sanity/lib/queries";
import { after } from "next/server";
import { writeClient } from "@/sanity/lib/write_client";

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
      <div className="absolute -top-1 -right-1">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-semibold">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
