import React from "react";
import formateDate from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
function StartupCard({ post }: { post: StartupTypeCard }) {
  const {
    _CreatedAt,
    views,
    author: { _id: author_id, name },
    _id,
    image,
    catagory,
    descreption,
    title,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date bg-pink-200 rounded-[70px] p-2">
          {formateDate(_CreatedAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author_id}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h1 className="text-26-semibold">{title}</h1>
          </Link>
        </div>
        <Link href={`/user/${author_id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{descreption}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5 ">
        <Link href={`/?query=${catagory.toLowerCase()}`}>
          <p className="text-16-medium">{catagory}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export default StartupCard;
