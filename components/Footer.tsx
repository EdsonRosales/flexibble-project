import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <Image
            src="/logo-purple.svg"
            width={115}
            height={38}
            alt='Flexibble'
          />

          <p className='text-start text-sm font-normal mt-5 max-w-xs'>
            Flexibble is the world's leading community for creatives to share, grow, and get
            hired.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer