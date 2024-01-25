import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="81.976" height="52.919" viewBox="0 0 81.976 52.919">
        <g id="Group_4" data-name="Group 4" transform="translate(-310.247 -16)">
            <text id="B" transform="matrix(0.978, 0.208, -0.208, 0.978, 312.742, 52.191)" fill="#ff7438" font-size="35" font-family="Poppins-Bold, Poppins" font-weight="700"><tspan x="0" y="0">B</tspan></text>
            <g id="Group_3" data-name="Group 3" transform="translate(337.884 32.73)">
            <rect id="Rectangle_3" data-name="Rectangle 3" width="54.34" height="23.422" rx="2" transform="translate(0 1.115)" fill="#3f3d56"/>
            <text id="docs" transform="translate(5.116 17.851)" fill="#fff" font-size="17" font-family="Poppins-Regular, Poppins"><tspan x="0" y="0">docs</tspan></text>
            </g>
        </g>
        </svg>
    </Link>
  )
}

export default Logo