import React from 'react'

interface SectionTitleProps {
  name: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle = ({ name, subtitle, centered = true }: SectionTitleProps) => {
  return (
    <div className={`space-y-4 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
        {name}
      </h2>
      {subtitle && (
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"></div>
    </div>
  )
}

export default SectionTitle