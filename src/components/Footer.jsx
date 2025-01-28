import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
        <div className='screen-max-width'>
            <div className=''>
                <p className='font-semibold text-xs text-gray'>
                    More ways to shop: {' '}<span className="underline text-blue"> Find an Apple Store {' '}</span>
                    or {''} <span className="underline text-blue"> other retailer</span> {''} near you. Or call 1-800-MY-APPLE.
                </p>
            </div>
            {/* divider line */}
            <div className='h-[1px] w-full bg-neutral-700 my-5' />
            {/* footer links */}
            <div className='flex md:flex-row flex-col md:items-center justify-between'>
                <p className='font-semibold text-xs text-gray'>Copyright @ 2025 Apple Inc. All rights reserved.</p>
                <div className='flex gap-1'>
                    {footerLinks.map((link, index) => (
                        <p key={link} className='font-semibold text-xs text-gray'>{link}{' '}
                            {index !== footerLinks.length - 1 && (
                                <span className='mx-2'> | </span>
                            )}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer