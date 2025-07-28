import React from "react";
import formateDate, { cn } from "@/lib/utils";
import { EyeIcon, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startups } from "@/sanity.types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startups, "author"> & { author?: Author };

function StartupCard({ post }: { post: StartupTypeCard }) {
  const { _createdAt, view, author, _id, image, category, description, title } = post;
  
  return (
    <article className="startup-card">
      <div className="flex-between mb-4">
        <time className="startup-card-date" dateTime={_createdAt}>
          {formateDate(_createdAt)}
        </time>
        <div className="flex items-center gap-1.5 text-neutral-500">
          <EyeIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{view || 0}</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <Link 
            href={`/user/${author?._id}`}
            className="inline-block hover:text-primary-600 transition-colors duration-200 focus-ring rounded"
          >
            <p className="text-sm font-medium text-neutral-600 truncate">
              {author?.name || "Anonymous"}
            </p>
          </Link>
          
          <Link 
            href={`/startup/${_id}`}
            className="block group focus-ring rounded"
          >
            <h2 className="startup-card-title group-hover:text-primary-700">
              {title}
            </h2>
          </Link>
        </div>
        
        <Link 
          href={`/user/${author?._id}`}
          className="flex-shrink-0 focus-ring rounded-full"
        >
          {author?.image ? (
            <Image
              src={author.image}
              alt={`${author.name}'s profile`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-neutral-200 hover:border-primary-300 transition-all duration-200 hover:scale-105 shadow-soft object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-neutral-200 bg-neutral-100 flex items-center justify-center hover:border-primary-300 transition-all duration-200 hover:scale-105 shadow-soft">
              <User className="w-6 h-6 text-neutral-400" />
            </div>
          )}
        </Link>
      </div>

      <Link 
        href={`/startup/${_id}`}
        className="block group focus-ring rounded-lg"
      >
        <p className="startup-card-description">
          {description}
        </p>
        
        {image && (
          <div className="mt-4 overflow-hidden rounded-xl">
            <img 
              src={image} 
              alt={`${title} preview`}
              className="startup-card-image group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
      </Link>

      <div className="startup-card-footer">
        <Link 
          href={`/?query=${encodeURIComponent(category || '')}`}
          className="startup-card-category focus-ring"
        >
          {category?.toLowerCase() || 'uncategorized'}
        </Link>
        
        <Button 
          className="startup-card-button focus-ring" 
          asChild
          size="sm"
        >
          <Link href={`/startup/${_id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </article>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <div key={cn("skeleton", index)} className="startup-card">
        <div className="flex-between mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
        
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        
        <div className="flex-between mt-6 pt-4 border-t border-neutral-100">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    ))}
  </>
);

export default StartupCard;