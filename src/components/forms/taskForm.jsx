import React, { useState } from 'react';
import './taskForm.scss';

const Form = ({ onData }, choosenColor, taskArray) => {

    const colorsArray = ['#800000','#FFFF00','#008000','#0000FF'];
  const [inputValue, setInputValue] = useState('');
  const [choosenColorValue, setColor] = useState(choosenColor);

  const [choosenColorIndex, setColorIndex] = useState(colorsArray[choosenColor]);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Додатковий код для відправки форми
    onData({inputValue: inputValue, colorValue: choosenColorValue});
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const chooseColor = (index) => {
    console.log("INEDEX",index)
    setColor(colorsArray[index])
    setColorIndex(index)
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form__input"
        value={inputValue}
        onChange={handleChange}
        placeholder="Введіть текст"
      />
        <div className="colorPicker">
            {
              colorsArray.map((item,i) => (
              <div key={`${item}`}   className={`color ${item === choosenColorValue ? 'active' : '' }`} style={{ background: `${item}` }} onClick={() => chooseColor(i)}></div>
                ))
            }
        </div>
      <button type="submit" className="form__button">
        Відправити
      </button>
    </form>
  );
};

export default Form;