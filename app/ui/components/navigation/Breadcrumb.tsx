'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight, FiHome } from 'react-icons/fi';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

const Breadcrumb = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Handle special cases
      let label = segment;
      if (segment === 'Shop') label = 'Shop';
      if (segment === 'cart') label = 'Shopping Cart';
      if (segment === 'login') label = 'Sign In';
      if (segment === 'register') label = 'Sign Up';
      if (segment === 'About') label = 'About Us';
      if (segment === 'cms') label = 'Admin Panel';
      
      // Handle dynamic routes (like book IDs)
      if (segment.length === 24 && /^[a-f0-9]{24}$/i.test(segment)) {
        label = 'Book Details';
      }

      breadcrumbs.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: currentPath,
        isCurrent: index === segments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-neutral-200 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <FiChevronRight className="w-4 h-4 text-neutral-400 mx-2" />
              )}
              
              {item.isCurrent ? (
                <span className="text-neutral-900 font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1"
                >
                  {index === 0 && <FiHome className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
