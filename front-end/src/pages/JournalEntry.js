import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import "./JournalEntry.css"


const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    }
]

const JournalEntry = () => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [value, setValue] = useState(initialValue)

    return (
        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
            <Editable className="journal-textbox" placeholder="Today I am feeling..." />
        </Slate>
    );
};


export default JournalEntry;
