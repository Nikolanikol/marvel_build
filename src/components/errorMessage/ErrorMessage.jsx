import img from './errorMessage.gif'
const ErrorMessage = () =>{
    return (
        <>
              <img
            src={img}
            style={{display: 'block', width : '250px', height : '250px', objectFit : 'contain', margin : '0 auto'}}
            alt='error'
        />
        <div style={{'paddingTop': '20px', textAlign:'center'}} >Page don't found</div>
        </>
  
    )
}
export default ErrorMessage;
