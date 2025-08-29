import '../styles/cards.css'


function Card({ pic, titulo, desc}){
    return (
        <div className='card'>
            <img className='img-card' src={pic} alt="" />
            <span className='info-card'>
                <h6 className='encab-card'>{titulo}</h6>
                <p className='desc-card'>{desc} </p>
            </span>
        </div>
    )
}
export default Card