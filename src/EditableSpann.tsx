import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpannPropsType = {
    title: string
    onChange: (newValue:string) => void


}

export function EditableSpann(props: EditableSpannPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('')

    const activatedMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const DeActivatedMode = () => {
        setEditMode(false);
        props.onChange(title);
    }



    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    return editMode
        ? <TextField variant="outlined"
         value={title} onChange={onChangeTitleHandler} onBlur={DeActivatedMode} autoFocus/>
        : <span onDoubleClick={activatedMode}>{props.title}</span>
}


