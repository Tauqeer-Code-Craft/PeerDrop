import React from 'react'
import QRCodeGenerator from './components/QRCodeGenerator'
import { nanoid } from 'nanoid'

const page = () => {

  const slug =  nanoid(8)

  return (
    <div className='mt-10'>

      <QRCodeGenerator slug={slug} baseUrl={"http://localhost:3000"}></QRCodeGenerator>

      </div>
  )
}

export default page