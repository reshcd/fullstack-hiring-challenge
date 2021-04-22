import React from 'react'
import reactDom from 'react-dom'
import Routes from './router'
import './App.scss'

reactDom.render(
    <div>
        <div className='roots'>
            <Routes/>
        </div>
    </div>
    ,
    document.getElementById('root')
)