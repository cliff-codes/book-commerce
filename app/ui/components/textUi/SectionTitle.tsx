import React from 'react'

interface SectionType {
    name : string
}

const SectionTitle = ({name} : SectionType) => {
  return (
    <div className='font-semibold'>{name}</div>
  )
}

export default SectionTitle