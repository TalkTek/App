import React from 'react'
import TextComp from './text'

const H1 = (props: {}) => <TextComp fontSize={24} {...props}/>
const H2 = (props: {}) => <TextComp fontSize={18} {...props}/>
const H3 = (props: {}) => <TextComp fontSize={15} {...props}/>
const H4 = (props: {}) => <TextComp fontSize={13} {...props}/>
const H5 = (props: {}) => <TextComp fontSize={10} {...props}/>

export { 
  H1,
  H2,
  H3,
  H4,
  H5 
}
