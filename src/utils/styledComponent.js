import React from 'react'

const styled = (Component, styler) => (props) => {
  const style = typeof styler === 'function' ? styler(props) : styler
  return <Component {...props} style={[style, props.style]} />
}

export default styled