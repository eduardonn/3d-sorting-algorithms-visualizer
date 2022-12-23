import { useEffect, useState, useCallback } from 'react';

function actionByKey(key) {
  const keyActionMap = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump'
  }

  return keyActionMap[key];
}

export const useKeyboard = () => {
  // const keyActionMap = {
  //   KeyW: 'moveForward',
  //   KeyS: 'moveBackward',
  //   KeyA: 'moveLeft',
  //   KeyD: 'moveRight',
  //   Space: 'jump',
  // }

  const [keyDownHandlers, setKeyDownHandlers] = useState({});

  // TODO: Fix: when adding event, it overrides the other action with the same key
  const addKeydownEvent = useCallback((key, action) => {
    setKeyDownHandlers(prev => ({...prev, [key]: action}));
  }, []);

  // useEffect(() => {

  // }, [keyDownHandler])
  
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  })

  const handleKeyDown = useCallback((e) => {
    // TODO: Instead of using if, maybe gather all actions in
    // one object and choose handler based on key
    let action = actionByKey(e.code);
    if (action) {
      setActions((args) => ({
        ...args,
        [action]: true
      })
    )
    } else {
      action = keyDownHandlers[e.code];
      if (action)
        action();
    }
  }, [keyDownHandlers])

  const handleKeyUp = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((args) => ({
        ...args,
        [action]: false
      })
    )
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleKeyDown, handleKeyUp])

  return { actions, addKeydownEvent };
}