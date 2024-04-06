import React from 'react'
import './Commisiondetailpage.css'
import { Formik } from 'formik'

function Commisiondetailpage({values,handleBlur,handleChange, touched, errors}) {
    return (
        <div className='mainOutlet'>

            <div className='heading3'>
                <h5>Commission Details</h5>
            </div>

            <div id='commisionDeatilPage'>

                <label>
                    Commission<span className="mandatory">*</span>
                </label>

                <div id='comm'>


                    <input
                        id='commInputField'
                        name='comm'
                        type='number'
                        value={values.comm}
                        placeholder='Enter Commission'
                        // onChange={handleInputChange}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                    />  %

                </div>
                { errors.comm && touched.comm ?   <p  className='form-error'  > {errors.comm}  </p> : null}


            </div>


        </div>
    )
}

export default Commisiondetailpage