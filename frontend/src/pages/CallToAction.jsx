import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row border text-center' style={{border:"1px solid teal",borderTopLeftRadius:"1rem",borderBottomRightRadius:"1rem",display:"flex",justifyContent:"center",alignItems:"center",height:"38vh"}}>
        <div className='flex-1 justify-center flex flex-col ' style={{marginRight:"2rem",marginLeft:"0.75rem"}}>
            <h2 className='text-2xl'>
                want to learn more about JS?
            </h2>
            <p className='text-gray-500 ' style={{marginRight:"2rem"}}>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <Button gradientDuoTone='purpleToPink'>
            <a href="https://www.100jsprojects.com/" target='_blank' rel="noopener noreferrer" className='rounded-tl-xl rounded-bl-none'>Learn More</a></Button>
        </div>
        <div className='p-7 flex-1' style={{marginTop:"0.75rem",marginBottom:"1rem"}}>
            <img src="/jsImage.png" style={{width:"60%",height:"40%"}}/>
        </div>
    </div>
  )
}

export default CallToAction