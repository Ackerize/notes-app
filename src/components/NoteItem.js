import React from 'react'
import { useHistory } from 'react-router-dom'
import TEXTColor from 'textcolor'

export const NoteItem = ({ id, title, content, color }) => {
    const history = useHistory();
    const textColor = TEXTColor.findTextColor(color)
    return (
        <div className="note-container" style={{ backgroundColor: `${color}`}} onClick={() => history.push(`/note/${id}`)}>
            <h3 className="note-title" style={{color: `${textColor}`}}>{title}</h3>
            <p className="note-content" style={{color: `${textColor}`}}>{content}</p>
        </div>
    )
}
