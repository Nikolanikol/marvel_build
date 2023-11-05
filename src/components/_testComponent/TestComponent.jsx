
import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
// import './App.css'; // Подключите файл CSS с анимацией

function TestComponent() {
  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponent = () => {
    setShowComponentA(!showComponentA);
  };

  return (
    <div>
      <button onClick={toggleComponent}>Toggle Component</button>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={showComponentA ? 'componentA' : 'componentB'}
          classNames="fade"
          timeout={300}
        >
          {showComponentA ? <ComponentA /> : <ComponentB />}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

function ComponentA() {
  return (
  <div className="componentA">Component A</div>
  )
}

function ComponentB() {
  return <div className="componentB">Component B</div>;
}

export default TestComponent;

