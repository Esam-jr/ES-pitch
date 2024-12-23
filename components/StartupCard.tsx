import React from "react";
import formateDate, { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startups } from "@/sanity.types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startups, "author"> & { author?: Author };

function StartupCard({ post }: { post: StartupTypeCard }) {
  const { _createdAt, view, author, _id, image, category, description, title } =
    post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date bg-lime-200 rounded-[70px] p-2">
          {formateDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-lime-500" />
          <span className="text-16-medium">{view}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h1 className="text-26-semibold">{title}</h1>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5 ">
        <Link href={`/?query=${category}`}>
          <p className="text-16-medium">{category?.toLowerCase()}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
