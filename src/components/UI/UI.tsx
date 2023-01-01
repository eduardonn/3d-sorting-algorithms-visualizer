import React, { useState } from 'react';
import { ArraySettings, useArrayStore } from '../../hooks/useArrayStore';
import { useAnimationStore } from '../../hooks/useAnimationStore';
import { algorithmsList, createRandomArray } from '../../utils';
import './UI.css';

interface SortOptionsProps {
  handleOnClick: (value: string) => void;
  activeIndex: number;
}

const SortOptionButtons: React.FC<SortOptionsProps> = ({ handleOnClick, activeIndex }) => {
  return (
    <>
    <div>
      <div id="inputOptionsDiv">
        {algorithmsList.map((value, index) => (
          <label key={value.name} htmlFor={value.name} className="shadow background-radial">
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

const UI = () => {
  const [ arraySettings, setArraySettings, setArrayElements ] = useArrayStore(
    state => [ state.arraySettings, state.setArraySettings, state.setArrayElements ]
  )

  const [ animDuration, setAnimDuration, startAnimation ] = useAnimationStore(
    state => [ state.animDuration, state.setAnimDuration, state.startAnimation ]);

  const [ algorithmOptionSelected, setAlgorithmOptionSelected] = useState(algorithmsList[0].name);

  const handleOnClickRandomize = (arraySettings: ArraySettings) => {
    setArrayElements(createRandomArray(
      arraySettings.minElement,
      arraySettings.maxElement,
      arraySettings.amountElements
    ));
  }

  const handleAnimDurationOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimDuration(parseInt(e.target.value));
  }

  const handleMaxElementOnChange = (
      setArraySettings: (settings: ArraySettings) => void,
      e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_ELEMENT = 100;
    const MIN_ELEMENT = 1;
    let newValue = parseInt(e.target.value);
  
    if (isNaN(newValue)
      || newValue > MAX_ELEMENT
      || newValue < MIN_ELEMENT)
      return;
    
    setArraySettings({ maxElement: newValue });
  }
  
  const handleAmountElementOnChange = (
      setArraySettings: (settings: ArraySettings) => void,
      e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_AMOUNT = 100;
    const MIN_AMOUNT = 1;
    let newValue = parseInt(e.target.value);
  
    if (isNaN(newValue)
      || newValue > MAX_AMOUNT
      || newValue < MIN_AMOUNT)
      return;
    
    setArraySettings({ amountElements: newValue });
  }

  return (
    <div id='inputPanelDiv' className='back-filter shadow'>
      <div className='inputControls'>
        <span className="textInputs margin-right">Maximum Number</span>
        <input
          className="parameterInputs"
          value={arraySettings.maxElement}
          id="maxNumber"
          onChange={ e => handleMaxElementOnChange(setArraySettings, e) }
        />
      </div>
      <div className='inputControls'>
        <span className="textInputs margin-right">Amount of Elements</span>
        <input
          className="parameterInputs"
          value={arraySettings.amountElements}
          id="amountElements"
          onChange={ e => handleAmountElementOnChange(setArraySettings, e) }
          />
      </div>
      <div className='inputControls'>
        <span className="textInputs margin-right">Animation Speed</span>
        <div className='inputControls'>
          <input
            type="range"
            min="200"
            max="3000"
            step="50"
            value={animDuration}
            id="animDuration"
            onChange={handleAnimDurationOnChange}
          />
          <span 
            className="textInputs"
            style={{width: "4vw", textAlign: "right"}}
            id="rangeValueElement"
          >
            { animDuration >= 1000
            ? animDuration / 1000 + 's'
            : animDuration + "ms" }
          </span>
        </div>
      </div>
      <SortOptionButtons
        activeIndex={0}
        handleOnClick={setAlgorithmOptionSelected}
      />
      <div
        style={{height: '2px', width:'100%', backgroundColor: '#4a4a4a', margin: '5px auto 5px auto'}}>
      </div>
      <div className='inputControls'>
        <button
          id="sort-array-button"
          className="background-radial back-filter shadow"
          onClick={() => startAnimation(algorithmOptionSelected)}
        >Sort</button>
        <button
          id="randomize-array-button"
          className="background-radial back-filter shadow"
          onClick={() => handleOnClickRandomize(arraySettings)}>Randomize</button>
      </div>
    </div>
  );
}

export { UI };