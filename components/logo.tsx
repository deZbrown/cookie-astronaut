import React from 'react'
import Image from 'next/image'

const Logo = ({ size = 200 }) => {
    const imageStyle = {
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
    }

    return (
        <div className="flex pt-4 justify-center sm:justify-start sm:pt-0 mb-5">
            <Image
                src="/logo.jpeg"
                alt="Dive Deeper"
                width={size}
                height={size}
                style={imageStyle}
            />
        </div>
    )
}

export default Logo