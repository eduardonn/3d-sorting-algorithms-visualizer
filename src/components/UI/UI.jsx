import React, { useState } from 'react';
import { useArrayStore } from '../../hooks/useArrayStore';
import { useAnimationStore } from '../../hooks/useAnimationStore';
import { algorithmsList, createRandomArray } from '../../utils';
import './UI.css';

const SortOptionButtons = ({ handleOnClick, activeIndex }) => {
  return (
    <>
    <div>
      <div id="inputOptionsDiv">
        {algorithmsList.map((value, index) => (
          <label key={value.name} htmlFor={value.name} className="shadow">
            <input
              id={value.name}
              name="algorithmOption"
              className="radioInput back-filter"
              type="radio"
              defaultChecked={index === activeIndex ? true : false}
              onClick={(e) => handleOnClick(e.currentTarget.id)} />
            <div className="sortOption">
              <div><span>{value.label}</span></div>
            </div>
          </label>
        ))}
      </div>
    </div>
    </>
  );
};

const handleMaxElementOnChange = (setArraySettings, e) => {
  const MAX_ELEMENT = 100;
  const MIN_ELEMENT = 1;
  let newValue = parseInt(e.target.value);

  if (isNaN(newValue)
    || newValue > MAX_ELEMENT
    || newValue < MIN_ELEMENT)
    return;
  
  setArraySettings({ maxElement: newValue });
}

const handleAmountElementOnChange = (setArraySettings, e) => {
  const MAX_AMOUNT = 100;
  const MIN_AMOUNT = 1;
  let newValue = parseInt(e.target.value);

  if (isNaN(newValue)
    || newValue > MAX_AMOUNT
    || newValue < MIN_AMOUNT)
    return;
  
  setArraySettings({ amountElements: newValue });
}

const UI = ({ animDuration }) => {
  const [ arraySettings, setArraySettings, setArrayElements ] = useArrayStore(
    state => [ state.arraySettings, state.setArraySettings, state.setArrayElements ]
  )

  const [ startAnimation ] = useAnimationStore(state => [ state.startAnimation ]);

  const [ algorithmOptionSelected, setAlgorithmOptionSelected] = useState(algorithmsList[0].name);

  const handleOnClickRandomize = (arraySettings) => {
    setArrayElements(createRandomArray(
      arraySettings.minElement,
      arraySettings.maxElement,
      arraySettings.amountElements
    ));
  }

  return (
    <div id='inputPanelDiv' className='back-filter shadow'>
      <div className='inputControls'>
        <span className="textInputs">Maximum Number</span>
        <input
          className="parameterInputs"
          value={arraySettings.maxElement}
          id="maxNumber"
          onChange={ e => handleMaxElementOnChange(setArraySettings, e) }
        />
      </div>
      <div className='inputControls'>
        <span className="textInputs">Amount of Elements</span>
        <input
          className="parameterInputs"
          value={arraySettings.amountElements}
          id="amountElements"
          onChange={ e => handleAmountElementOnChange(setArraySettings, e) }
          />
      </div>
      <div className='inputControls'>
        <span className="textInputs">Movement Duration</span>
        <div>
          <input
            type="range"
            min="200"
            max="10000"
            value={animDuration}
            id="animDuration"
            // onChange={onChangeAnimDuration}
          />
          {/* <span className="textInputs" id="rangeValueElement">{animDuration + 'ms'}</span> */}
        </div>
      </div>
      <SortOptionButtons
        activeIndex={0}
        handleOnClick={setAlgorithmOptionSelected} />
      <div className='inputControls'>
        <button
          id="sort-array-button"
          className="back-filter shadow"
          onClick={() => startAnimation(algorithmOptionSelected)}
        >Sort</button>
        <button
          id="randomize-array-button"
          className="back-filter shadow"
          onClick={() => handleOnClickRandomize(arraySettings)}>Randomize</button>
      </div>
    </div>
  );
}

export { UI };