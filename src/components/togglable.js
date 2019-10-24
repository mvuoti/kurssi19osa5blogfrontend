const React = require('react')
const { useState, forwardRef, useImperativeHandle } = require('react')

const linebreak = <br/>

const Togglable = forwardRef(
  ({ children, buttonTextWhenClosed, buttonTextWhenOpen }, ref) => {

  const [isOpen, setIsOpen] = useState(false)

  const doToggle = () => setIsOpen(!isOpen)
  const doShow = () => setIsOpen(true)
  const doHide = () => setIsOpen(false)

  useImperativeHandle(ref, () => {
    return { doToggle, doShow, doHide }
  })

  const buttonLabel = isOpen ? buttonTextWhenOpen : buttonTextWhenClosed
  const button = <button onClick={doToggle}>{buttonLabel}</button> 
  return <div>{isOpen ? [children, linebreak] : ""}{button}</div>
})

export default Togglable
