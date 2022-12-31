import '../Comingsoon.css';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
    
    return <div>
        <div class="scene">
            <img class="car" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/car.svg" alt="Coming soon" />
            <img class="poof" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/poof.svg" alt="Coming soon" />
            <img class="sign" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/sign.svg" alt="Coming soon" />
            <em>LOADING...</em>
        </div>
        <h1 style={{textAlign: 'center'}}> Coming soon </h1>
        <Link to="/"><h1>Go back</h1></Link>
    </div>
}

export default ComingSoon;