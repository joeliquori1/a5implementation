// import React, { useCallback,useState } from 'react';
import Toggle from './Toggle'

export default function DisplayMessage(props) {
    
    const messages = {
        index: props.key,
        message: props.messages
    }
    

        if(messages.message.isleft){
            return (
                <div className="messages left">
                    <div className="rating">
                        <div className="rating left">
                            <Toggle></Toggle>
                        </div>
                    </div>
                    <div key={messages.index} className="bubble left">
                        {<p>{messages.message.english}</p>}
                        <p><b>{messages.message.spanish}</b></p>
                    </div>
                </div>
            )
        }
        return (
            <div className="messages right">
                <div className="rating">
                    <div className="rating right">
                        <Toggle></Toggle>
                    </div>
                </div>
                <div key={messages.index} className="bubble right">
                    {<p>{messages.message.spanish}</p>}
                    <p><b>{messages.message.english}</b></p>
                </div>
            </div>

        )
    }