'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

// Spinner Component
const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4", 
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
        "2xl": "h-16 w-16",
      },
      color: {
        primary: "text-primary-500",
        secondary: "text-secondary-500",
        white: "text-white",
        gray: "text-gray-500",
      }
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  }
);

export interface SpinnerProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, color, label = "Loading...", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size, color, className }))}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label={label}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";

// Skeleton Component
const skeletonVariants = cva(
  "animate-pulse bg-gray-200 rounded",
  {
    variants: {
      variant: {
        text: "h-4",
        title: "h-6",
        paragraph: "h-4",
        avatar: "rounded-full",
        image: "aspect-video",
        card: "h-48",
        button: "h-10",
        input: "h-10",
      },
      width: {
        full: "w-full",
        auto: "w-auto",
        sm: "w-16",
        md: "w-32",
        lg: "w-48",
        xl: "w-64",
      }
    },
    defaultVariants: {
      variant: "text",
      width: "full",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, lines = 1, ...props }, ref) => {
    if (lines > 1) {
      return (
        <div ref={ref} className="space-y-2" {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant, width, className }),
                index === lines - 1 && width === "full" ? "w-3/4" : ""
              )}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, width, className }))}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// Loading Container Component
const loadingContainerVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        fullscreen: "min-h-screen",
        overlay: "fixed inset-0 bg-black/50 z-50",
        inline: "min-h-[200px]",
        card: "p-8",
      },
      alignment: {
        center: "items-center justify-center",
        start: "items-start justify-center",
        end: "items-end justify-center",
      }
    },
    defaultVariants: {
      variant: "inline",
      alignment: "center",
    },
  }
);

export interface LoadingContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingContainerVariants> {
  loading?: boolean;
  spinnerSize?: VariantProps<typeof spinnerVariants>['size'];
  spinnerColor?: VariantProps<typeof spinnerVariants>['color'];
  text?: string;
  children?: React.ReactNode;
}

const LoadingContainer = React.forwardRef<HTMLDivElement, LoadingContainerProps>(
  ({ 
    className, 
    variant, 
    alignment, 
    loading = true, 
    spinnerSize = "md",
    spinnerColor = "primary",
    text = "Loading...",
    children,
    ...props 
  }, ref) => {
    if (!loading) {
      return <>{children}</>;
    }

    return (
      <div
        ref={ref}
        className={cn(loadingContainerVariants({ variant, alignment, className }))}
        {...props}
      >
        <div className="text-center">
          <Spinner size={spinnerSize} color={spinnerColor as any} className="mx-auto mb-3" />
          {text && (
            <p className="text-sm text-gray-600 font-medium">{text}</p>
          )}
        </div>
      </div>
    );
  }
);

LoadingContainer.displayName = "LoadingContainer";

// Book Card Skeleton Component
export interface BookCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showPrice?: boolean;
  showDescription?: boolean;
}

const BookCardSkeleton = React.forwardRef<HTMLDivElement, BookCardSkeletonProps>(
  ({ className, showPrice = true, showDescription = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100",
          className
        )}
        {...props}
      >
        {/* Book Cover */}
        <div className="aspect-[3/4] bg-gray-200 rounded-md animate-pulse" />
        
        {/* Title */}
        <Skeleton variant="title" className="h-5" />
        
        {/* Description */}
        {showDescription && (
          <div className="space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        )}
        
        {/* Price */}
        {showPrice && (
          <Skeleton variant="text" className="w-20 h-6" />
        )}
      </div>
    );
  }
);

BookCardSkeleton.displayName = "BookCardSkeleton";

// Grid Skeleton Component
export interface GridSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  columns?: number;
  itemType?: 'book' | 'card' | 'list';
  showPrice?: boolean;
  showDescription?: boolean;
}

const GridSkeleton = React.forwardRef<HTMLDivElement, GridSkeletonProps>(
  ({ 
    className, 
    items = 8, 
    columns = 4, 
    itemType = 'book',
    showPrice = true,
    showDescription = true,
    ...props 
  }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    };

    const renderSkeletonItem = () => {
      switch (itemType) {
        case 'book':
          return (
            <BookCardSkeleton 
              showPrice={showPrice} 
              showDescription={showDescription} 
            />
          );
        case 'card':
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <Skeleton variant="card" className="mb-4" />
              <Skeleton variant="title" className="mb-2" />
              <Skeleton variant="text" className="mb-1" />
              <Skeleton variant="text" className="w-3/4" />
            </div>
          );
        case 'list':
          return (
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <Skeleton variant="avatar" className="h-12 w-12" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="title" />
                <Skeleton variant="text" className="w-3/4" />
              </div>
            </div>
          );
        default:
          return <BookCardSkeleton />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-6",
          gridCols[columns as keyof typeof gridCols] || gridCols[4],
          className
        )}
        {...props}
      >
        {Array.from({ length: items }).map((_, index) => (
          <div key={index}>
            {renderSkeletonItem()}
          </div>
        ))}
      </div>
    );
  }
);

GridSkeleton.displayName = "GridSkeleton";

// Pulse Loading Component (for buttons, inputs, etc.)
export interface PulseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const Pulse = React.forwardRef<HTMLDivElement, PulseProps>(
  ({ className, size = "md", color = "primary", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-2 w-2",
      md: "h-3 w-3", 
      lg: "h-4 w-4",
    };

    const colorClasses = {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      white: "bg-white",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex space-x-1",
          className
        )}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full animate-pulse",
              sizeClasses[size],
              colorClasses[color],
              "animation-delay-" + (i * 100)
            )}
            style={{
              animationDelay: `${i * 100}ms`,
              animationDuration: '1.4s',
            }}
          />
        ))}
      </div>
    );
  }
);

Pulse.displayName = "Pulse";

// Dots Loading Component
export interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'gray';
}

const Dots = React.forwardRef<HTMLDivElement, DotsProps>(
  ({ className, size = "md", color = "primary", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-1 w-1",
      md: "h-2 w-2",
      lg: "h-3 w-3",
    };

    const colorClasses = {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500", 
      gray: "bg-gray-400",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex space-x-1",
          className
        )}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full animate-bounce",
              sizeClasses[size],
              colorClasses[color]
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

Dots.displayName = "Dots";

// Shimmer Loading Component
export interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  className?: string;
}

const Shimmer = React.forwardRef<HTMLDivElement, ShimmerProps>(
  ({ className, width = "100%", height = "100%", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-gray-200 rounded",
          className
        )}
        style={{ width, height }}
        {...props}
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
    );
  }
);

Shimmer.displayName = "Shimmer";

export {
  Spinner,
  Skeleton,
  LoadingContainer,
  BookCardSkeleton,
  GridSkeleton,
  Pulse,
  Dots,
  Shimmer,
};