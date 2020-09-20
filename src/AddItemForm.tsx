import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@material-ui/core/Button";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";


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
        <TextField variant='outlined'
                   value={title}
                   label={'Type value'}
                   onChange={OnChangehandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        <IconButton color='primary' onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>

}


export default AddItemForm;