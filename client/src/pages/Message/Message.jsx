import React from 'react'
import Header from '../../components/Header/Header'
import './Message.css'

function Message() {
    return (
        <>
            <Header />
            <div className='main_message'>
                <div className="messagebox">
                    <h3>This is a message from me(Vizz)</h3>
                    <h6>Version 2 will contain the following:</h6>
                    <ol>
                        <li>
                            <p>Let users edit or delete their uploaded cats whenever they want, so they have control over their submissions and can make changes or remove them if needed.</p>
                        </li>
                        <li>
                            <p>Keep track of likes, shares, and upvotes in the database and show them dynamically on each card, so you can see real-time engagement with the content.</p>
                        </li>
                        <li>
                            <p>Improve the user experience by adding smooth scrolling, a better design, and cool interactive features like sharing, commenting, and engaging with content more easily.</p>
                        </li>
                    </ol>
                </div>
            </div>

        </>
    )
}

export default Message