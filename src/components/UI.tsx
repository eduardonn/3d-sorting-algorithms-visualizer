import React, { useState } from 'react';
import { OptionalArraySettings, ArraySettings, useArrayStore } from '../hooks/useArrayStore';
import { useAnimationStore } from '../hooks/useAnimationStore';
import { algorithmsList, createRandomArray } from '../utils';
import './UI.css';

interface SortOptionsProps {
  handleOnClick: (value: string) => void;
  activeIndex: number;
}

const MAX_AMOUNT = 100;
const MIN_AMOUNT = 1;

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

const AnimationSpeedSlider = () => {
  const [ animSpeed, setAnimSpeed ] = useAnimationStore(
    state => [ state.animSpeed, state.setAnimSpeed ]);

  return (
    <div className='inputControls'>
      <span className="textInputs margin-right">Animation Speed</span>
      <div className='inputControls'>
        <input
          type="range"
          style={{ width: "11vw" }}
          min="0.1"
          max="10.0"
          step="0.1"
          value={animSpeed}
          onChange={ (e) => setAnimSpeed(parseFloat(e.target.value)) }
        />
        <span 
          className="textInputs"
          style={{width: "4vw", textAlign: "right"}}
          id="rangeValueElement"
        >
          { animSpeed + 'x' }
        </span>
      </div>
    </div>
  );
}

const UI = () => {
  const [ arraySettings, setArraySettings ] = useArrayStore(
    state => [ state.arraySettings, state.setArraySettings ]
  )

  const [ handleSortButton, handleRandomizeButton ] = useAnimationStore(
    state => [ state.handleSortButton, state.handleRandomizeButton ]);

  const [ algorithmOptionSelected, setAlgorithmOptionSelected] = useState(algorithmsList[0].name);


  const handleMaxElementOnChange = (
      setArraySettings: (settings: OptionalArraySettings) => void,
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
      setArraySettings: (settings: OptionalArraySettings) => void,
      e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
  
    if (isNaN(newValue)) return;
    if (newValue > MAX_AMOUNT) newValue = MAX_AMOUNT;
    if (newValue < MIN_AMOUNT) newValue = MIN_AMOUNT;
    
    setArraySettings({ numElements: newValue });
  }

  return (
    <div id='inputPanelDiv' className='back-filter shadow'>
      <div className='inputControls'>
        <span className="textInputs margin-right">Maximum Number</span>
        <input
          className="parameterInputs"
          value={arraySettings.maxElement}
          onChange={ e => handleMaxElementOnChange(setArraySettings, e) }
        />
      </div>
      <div className='inputControls'>
        <span className="textInputs margin-right">Array Size</span>
        <input
          className="parameterInputs"
          value={arraySettings.numElements}
          onChange={ e => handleAmountElementOnChange(setArraySettings, e) }
          />
      </div>
      <AnimationSpeedSlider />
      <SortOptionButtons
        activeIndex={0}
        handleOnClick={setAlgorithmOptionSelected}
      />
      <div
        style={{height: '1px', width:'100%', backgroundColor: '#404040', margin: '5px auto 5px auto'}}>
      </div>
      <div className='inputControls'>
        <button
          id="sort-array-button"
          className="background-radial back-filter shadow"
          onClick={() => handleSortButton(algorithmOptionSelected)}
        >Sort
        </button>
        <button
          id="randomize-array-button"
          className="background-radial back-filter shadow"
          onClick={() => handleRandomizeButton()}>Randomize
        </button>
      </div>
    </div>
  );
}

export { UI };