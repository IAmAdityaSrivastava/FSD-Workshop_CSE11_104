import './home.css'
import OP from '../assets/OnePiece.jpeg'

const Home=()=>{
    return (
        <div class="container">
            <div class="header">
                <img src={OP} alt="One Piece" className="op"/>
            </div>
            <div class="content"></div>
            <div class="sidebar"></div>
            <div class="footer"></div>
        </div>
    );
};

export default Home