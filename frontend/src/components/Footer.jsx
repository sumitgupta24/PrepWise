import React from 'react'
import { BsRobot, BsGithub, BsLinkedin } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'

function Footer() {
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pb-10 py-4 pt-10'>
      <div className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-10 px-6'>
        
        {/* Top section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-8'>
          
          {/* Brand */}
          <div className='flex items-center gap-3'>
            <div className='bg-black text-white p-2 rounded-lg'>
              <BsRobot size={18} />
            </div>
            <h2 className='font-semibold text-lg'>PrepWise.AI</h2>
          </div>

          {/* Links */}
          <div className='flex items-center gap-6 text-sm text-gray-500'>
            <a href='/' className='hover:text-black transition'>Home</a>
            <a href='/history' className='hover:text-black transition'>History</a>
            <a href='/pricing' className='hover:text-black transition'>Pricing</a>
          </div>

          {/* Social icons */}
          <div className='flex items-center gap-4'>
            <a href='https://github.com/sumitgupta24' target='_blank' rel='noreferrer'
              className='p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition'>
              <BsGithub size={16} />
            </a>
            <a href='https://www.linkedin.com/in/sumit-gupta-24s12s25s30r16b' target='_blank' rel='noreferrer'
              className='p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition'>
              <BsLinkedin size={16} />
            </a>
            <a href='mailto:cricsumit24@gmail.com'
              className='p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition'>
              <MdOutlineEmail size={16} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-100 mb-6' />

        {/* Bottom section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-400'>
          <p>
            AI-powered interview prep to sharpen communication, technical depth, and confidence.
          </p>
          <p>
            © {new Date().getFullYear()} PrepWise.AI — by{' '}
            <a href='https://github.com/sumitgupta24' target='_blank' rel='noreferrer'
              className='text-gray-600 font-medium hover:text-black transition'>
              Sumit Gupta
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer