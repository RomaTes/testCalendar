
import React, { useState } from 'react';
import './search.scss';

interface SearchProps {
    onChoose: (month: number) => void;
    taskList: any[];
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {

    const [inputValue, setInputValue] = useState<string>('');
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const taskClick = (monNumber: number) => {
        props.onChoose(monNumber);
    };

    return (
    <div className="search">
        <h3>Search</h3>
        <input 
            value={inputValue} 
            onChange={handleChange}
            placeholder="Введіть текст"
        ></input>

        {props.taskList?.map((item,i) => (
            (item.inputValue.toUpperCase().startsWith(inputValue.toUpperCase()) && inputValue.length > 0) ? 
            <div 
                className='task-item' 
                key={item.id} 
                style={{background: item.colorValue}}
                onClick={() => taskClick(item.month)} 
            >
                {item.inputValue}
            </div> : null
        ))
        }
    </div>  
    );

};

export default Search;