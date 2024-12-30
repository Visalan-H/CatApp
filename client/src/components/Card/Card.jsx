import React, { useState } from 'react'
import './Card.css'
import IconButton from '../IconButton/IconButton'
import { jsPDF } from 'jspdf'

function Card(props) {

    const [vote, setVote] = useState({ upvote: false, downvote: false });
    const handleVote = (e) => {
        setVote(e.target.parentElement.id === "Upvote" ? { upvote: !vote.upvote, downvote: false } : { downvote: !vote.downvote, upvote: false });
    };

    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        setFlip(!flip);
    }
    // const handleShare=()=>{
    //     const message = "Check this out!";
    //     const url = "https://example.com";
    //     const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message + " " + url)}`;
    //     window.open(whatsappURL, '_blank');
    // }

    const handleShare = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        const title = props.name;
        const titleWidth = doc.getTextWidth(title);
        doc.setFontSize(32);
        doc.text(title, 15, 20);
        doc.setFontSize(18);
        doc.text(props.description, 15, 30);
        doc.setFontSize(18);
        doc.text("meow meow!!", 15, 280);



        const imageURL = (props.image.toUpperCase() !== "DUMMY.PNG") ? `${import.meta.env.VITE_BASE_URL}/` + props.image : `cats/cat.${props.n}.jpg`
        const img = new Image();
        img.src = imageURL;
        img.onload = () => {
            doc.addImage(img, 'JPEG', 15, 40, 180, 180);
            doc.save(`${props.name}.pdf`);
        }
    };

    return (
        <div className={`card_main light ${flip ? "flip" : ""}`}>
            <div className={`image ${flip ? "flip" : ""}`}>
                <img className={`${flip ? "flip" : ""}`} src={(props.image.toUpperCase() !== "DUMMY.PNG") ? `${import.meta.env.VITE_BASE_URL}/` + props.image : `cats/cat.${props.n}.jpg`} alt="cat" />
            </div>
            <div className={`contenthehe ${flip ? "flip" : ""}`}>
                <h3 className='light'>{props.name}</h3>
                <p className='light'>{props.description}</p>
            </div>
            <div className='front'>
                <div className="contentu">
                    <div className="interactions">
                        <IconButton text="Like" icon="heart" />
                        <IconButton text="Share" icon="paper-plane" status={handleShare} />
                        <IconButton text="Comment" icon="message" status={handleFlip} />
                    </div>
                    <div className="actions">
                        <IconButton text="Upvote" icon="thumbs-up" status={handleVote} vote={vote} />
                        <IconButton text="Downvote" icon="thumbs-down" status={handleVote} vote={vote} />
                    </div>
                </div>
            </div>
            <div className="back">
                <div className="backhead">
                    <h3>Comments</h3>
                    <i className="fa-solid fa-xmark" onClick={handleFlip}></i>
                    <div className="line"></div>
                </div>
                <h4>coming soon..</h4>

            </div>
        </div>
    )
}

export default Card
