import React from 'react'
import TextComp from './text/text'

const Title = (props) => <TextComp fontSize={18} fontWeight='700' {...props}/>
const SubTitle = (props) => <TextComp fontSize={15} fontWeight='500' {...props}/>
const ThirdTitle = (props) => <TextComp fontSize={15} {...props}/>
const BoldText = (props) => <TextComp fontSize={13} {...props}/>
const Text = (props) => <TextComp fontSize={13} fontWeight='500' {...props}/>

export { 
  Title, 
  SubTitle, 
  ThirdTitle, 
  BoldText, 
  Text 
}
