import React from 'react'

const ChooseLevel = props => {
  return (
    <>
      <section className="levelButtons">
        <button onClick={props.easyDiff}>Easy</button>
        <button onClick={props.mediumDiff}>Medium</button>
        <button onClick={props.hardDiff}>Hard</button>
      </section>
      {/* {props.displayBoard} */}
    </>
  )
}

export default ChooseLevel
