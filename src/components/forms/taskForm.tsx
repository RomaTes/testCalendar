
import React, { useState } from 'react';
import './taskForm.scss';

interface FormProps {
  onData: (data: {inputValue: string, colorValue: string}) => void;
  choosenColor: string;
  inputValueProps: string;
  taskArray: any[];
}

const Form: React.FC<FormProps> = (props: FormProps) => {
  const colorsArray = ['rgb(128, 0, 0)','rgb(229, 12, 12)','rgb(0, 128, 0)','rgb(0, 0, 255)'];
  const [inputValue, setInputValue] = useState<string>(props.inputValueProps);
  const [choosenColorValue, setColor] = useState<string>(props.choosenColor);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onData({inputValue: inputValue, colorValue: choosenColorValue});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const chooseColor = (index: number) => {
    setColor(colorsArray[index]);
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