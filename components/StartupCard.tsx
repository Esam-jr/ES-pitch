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
        <p className="startup-card_date">
          {formateDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-5 text-accent-500" />
          <span className="text-sm font-medium text-accent-600">{view}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-sm font-medium text-accent-600 hover:text-primary-600 transition-colors duration-200 line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h1 className="text-xl font-bold text-black-700 hover:text-primary-600 transition-colors duration-200 mt-1">
              {title}
            </h1>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full border-2 border-accent-200 hover:border-primary-300 transition-all duration-200 hover:scale-105 shadow-md"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5 ">
        <Link href={`/?query=${category}`}>
          <p className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors duration-200 bg-secondary-50 px-3 py-1 rounded-full">
            {category?.toLowerCase()}
          </p>
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
