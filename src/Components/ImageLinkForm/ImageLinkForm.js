import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputchange, onSubmit}) => {
    return (
        <div >
            <p className='f3'>
                {'This Eye will detec faces in your pictures.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='tex' className='f4 pa2 w-70 center' onChange={onInputchange} />
                    <button className='w-30 grow f4 lik ph3 pv2 dib white bg-light-blue' onClick={onSubmit} >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
