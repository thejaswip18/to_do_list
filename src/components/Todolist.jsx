import React, { useRef, useState } from 'react';
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import Noitem from "../assets/no item1.png"
import "./Todolist.css";

function Todolist() {
    let [item, setItem] = useState('');
    let [items, setItems] = useState([]);
    let [toggle,setToggle]=useState({show:false,id:""})
    let editRef = useRef(null);

    const changeItem = (e) => {
        setItem(e.target.value);
    };

    const addItem = () => {
        setItems([...items, item]);
        setItem("");
    };

    const deleteItem = (id) => {
        const newItems = items.filter((_, i) => i !== id);
        setItems(newItems);
    };
    
    const editItem = (id) => {
        editRef.current.focus();
        setToggle({show:true,id});
        setItem(items[id]);
    }

    const updateItem = () => {
        items[toggle.id]=item;
        setItems([...items]);
        setItem(" ");
        setToggle({show:false})
    };

    return (
        <div className='card'>
            <div className='input'>
                <input 
                    type='text' 
                    value={item} 
                    ref={editRef}
                    onChange={changeItem} 
                    placeholder="Enter item" 
                />
                <button onClick={addItem}>Add</button>
                {toggle.show && <button onClick={updateItem}>Update</button>}
            </div>
            {items.length > 0 ? (  
                <div className='list'>
                    <ul>
                        {items.map((i, index) => (
                            <li key={index}>
                                {i}
                                <div className='button'>
                                    <button onClick={() => editItem(index)}>
                                        <FiEdit size={23} style={{ color: '#fff'}}/>
                                    </button>
                                    <button onClick={() => deleteItem(index)}>
                                        <HiOutlineArchiveBoxXMark size={25} style={{ color: '#fff'}}/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="no-items">
                    <p>No items available. Please add an item.</p>
                    <img src={Noitem} alt="No items" />
                </div>
            )}
        </div>
    );
}

export default Todolist;
