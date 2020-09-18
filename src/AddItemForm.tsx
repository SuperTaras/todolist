import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormsPropsType = {
    addItem: (title: string) => void

}


function AddItemForm(props: AddItemFormsPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    };

    const OnChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }


    return <div>

        <input value={title}
               onChange={OnChangehandler}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addItem}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>

}


export default AddItemForm;