import React from 'react'
import Content from './Content'
import './ViewOne.css'
const Create = () => {
  
  return (
    <div className='writable-fields'>
      <div className="fields-wrapper">
        <div className="low-level-wrapper">
          <div className="flex-wrapper">
            <div className='flex-item'>
              <div  className='label-header'>
                <label htmlFor="Name">Name</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div>  
              </div>
              <input type="text" placeholder='Name' />
            </div>
            <div className="flex-item">
              <div  className='label-header'>
                <label htmlFor="Photo">Photo</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div> 
              </div>
              <input type="photo" placeholder='Add Photo'/>
            </div>
            <div className="flex-item">
              <div  className='label-header'>
                <label htmlFor="Photo">Content</label>
                <div className="label-left-header">
                  <span>Required</span>
                </div> 
              </div>
              <Content/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
