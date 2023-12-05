import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from "@fortawesome/free-solid-svg-icons";

import React from 'react'

export default function CategoryService({item}) {
  return (
    <>
      <FontAwesomeIcon icon={faGear} style={{fontSize: '30px' ,color: 'white', marginTop:'10px'}} />     
      <p className='p-category-service'>
      {item.name}
      </p>
    </>
  )
}
