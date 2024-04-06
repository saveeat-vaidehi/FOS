import React from 'react'
import Select from 'react-select';

import './Companydetailpage.css'

const options1 = [
  { value: 'Private Company', label: 'Private Company' },
  { value: 'Public Company', label: 'Public Company' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Sole Proprietor', label: 'Sole Proprietor' },
]

const options2 = [
  { value: 'Fine Dining Restaurant', label: 'Fine Dining Restaurant' },
  { value: 'Fast Food Restaurant (OSR)/Fast Casual Restaurant', label: 'Fast Food Restaurant (OSR)/Fast Casual Restaurant' },
  { value: 'Food Truck/Cart/Stand', label: 'Food Truck/Cart/Stand' },
  { value: 'Buffet Type Restaurant', label: 'Buffet Type Restaurant' },
  { value: 'Ghost Restaurant/Dark Kitchen', label: 'Ghost Restaurant/Dark Kitchen' },
  { value: 'POP-UP Restaurant', label: 'POP-UP Restaurant' },
  { value: 'Fusion Restaurant', label: 'Fusion Restaurant' },
  { value: 'Pub/Bar Restaurant', label: 'Pub/Bar Restaurant' },
  { value: 'Cafe/Bistro', label: 'Cafe/Bistro' },
  { value: 'Club House', label: 'Club House' },
  { value: 'Bakery', label: 'Bakery' }
];


const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    minHeight: '1rem',
    padding: '3px',
    border: '1px solid grey',
    fontSize: "15px"
  })
}



function comapanyDetailPage({ values, handleBlur, handleChange, touched, errors }) {

  return (

    <div className='mainOutlet'>
      <div className='heading2' >
        <h5>Company Details</h5>
      </div>

      <div id='comapnyDetailsPage'>
        <form>

          <div className='identityDetails'>
            <div className='subInputField'>

              <div className='singleDetail'>

                <div>
                  <label>PAN Number</label><span className='mandatory'> *</span>

                </div>
                <div className='errorcontainr'>
                  <input name='pan' placeholder='Enter 10 digit PAN Card Number' maxLength={10} value={values.pan} onChange={handleChange} onBlur={handleBlur} />
                  {errors.pan && touched.pan ? <p className='form-error'  > {errors.pan}  </p> : null}

                </div>

              </div>


              <div className='singleDetail'>
                <div>
                  <label>GSTIN Number  </label>
                  {/* <span className='mandatory'> *</span> */}

                </div>
                <div className='errorcontainr'>
                  <input name='gstin' placeholder='Enter 15 digit GSTIN Number' maxLength={15} value={values.gstin} onChange={handleChange}  />
                  {/* {errors.gstin && touched.gstin ? <p className='form-error'  > {errors.gstin}  </p> : null} */}

                </div>

              </div>
            </div>



            <div className='subInputField'>

              <div className='singleDetail' >
              <div>
                  <label>   FSSAI License Number</label><span className='mandatory'> *</span>

                </div>

                <div className='errorcontainr'>
                <input name='fssai' placeholder='Enter 14 digit FSSAI License Number' maxLength={14} value={values.fssai} onChange={handleChange} onBlur={handleBlur} />
                {errors.fssai && touched.fssai ? <p className='form-error'  > {errors.fssai}  </p> : null}

                </div>
              </div>
              <div className='singleDetail' >


              <div>
                  <label> FSSAI Refrence Number</label>

                </div>
                <div className='errorcontainr'>
                <input name='fssairef' placeholder='Enter 17 digit FSSAI Refrence Number' maxLength={17} value={values.fssairef} onChange={handleChange} />

                </div>



                
               
              </div>


            </div>


          </div>

          <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />

          {/* <label>  Signing Authority</label> */}
          <div className="subDiv1" >
            <h6>
              Signing Authority<span className='mandatory'> *</span>
            </h6>
          </div>
          <div className='signingDetails'>

            <div className='subInputField' >

              <div className='singleDetail'>
                <label> Name</label>
                <div className='errorcontainr'>
                <input name='registered_name' placeholder='Enter Signing Name' value={values.registered_name} onChange={handleChange} onBlur={handleBlur} />
                {errors.registered_name && touched.registered_name ? <p className='form-error'  > {errors.registered_name}  </p> : null}

                </div>
                
              </div>


              <div className='singleDetail' >
                <label> Designation </label>
                <div className='errorcontainr'>
                <input name='role' placeholder='Enter Signing Designation' value={values.role} onChange={handleChange} onBlur={handleBlur} />
                {errors.role && touched.role ? <p className='form-error'  > {errors.role}  </p> : null}

                </div>

              </div>
            </div>
            <div className='subInputField'>
              <div className='singleDetail' >
                <label> Mobile Number </label>
                <div className='errorcontainr'>
                <input name='o_mnumber'  maxLength={10} placeholder='Enter Signing Number' value={values.o_mnumber} onChange={handleChange} onBlur={handleBlur} />
                {errors.o_mnumber && touched.o_mnumber ? <p className='form-error'  > {errors.o_mnumber}  </p> : null}

                </div>
                
              </div>

              <div className='singleDetail'>
                <label>   Email </label>
                <div className='errorcontainr'>
                <input name='s_a_email' placeholder='Enter Signing Email' value={values.s_a_email} onChange={handleChange} onBlur={handleBlur} />
                {errors.s_a_email && touched.s_a_email ? <p className='form-error'  > {errors.s_a_email}  </p> : null}

                </div>
                
              </div>


            </div>
          </div>

          <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />

          <div className=' subDiv1 billingDetails'>

            <h6>
              Registered Address / Billing Address<span className='mandatory'>*</span>
            </h6>

            <div className='errorcontainr'>
              <textarea  style={{ height: "50px",  padding:"10px" , outline:"none"  , border:"1px solid #d4d4d4" , borderRadius:"5px"}} name='Billing_address_street' value={values.Billing_address_street} placeholder=' Enter Billing Address' onChange={handleChange} onBlur={handleBlur}>

              </textarea>
              {errors.Billing_address_street && touched.Billing_address_street ? <p className='form-error'  > {errors.Billing_address_street}  </p> : null}

            </div>
            

          </div>


          <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />

          <div className='typesOptions'>
            <div className=' subDiv1 optionContainer'>
              <h6>
                Ownership Type<span className='mandatory'> *</span>
              </h6>

              <Select
                id='ownertype'
                options={options1}
                styles={customStyles}
                isSearchable={false}
                value={options1.find((option) => option.value === values.ownership)}
                onChange={(selectedOption) => handleChange({ target: { name: "ownership", value: selectedOption.value } })} 
               
              />
              {errors.ownership && touched.ownership ? <p className='form-error'  > {errors.ownership}  </p> : null}


            </div>


            <div className='subDiv1 optionContainer'>

              <h6>
                Type of Business<span className='mandatory'> *</span>

              </h6>

              <Select
                id='bustype'
                options={options2}
                styles={customStyles}
                isSearchable={false}
                value={options2.find((option) => option.value === values.ownership)}
                onChange={(selectedOption) => handleChange({ target: { name: "type_of_business", value: selectedOption.value } })}

              />

              {errors.type_of_business && touched.type_of_business ? <p className='form-error'  > {errors.type_of_business}  </p> : null}

            </div>

          </div>
        </form>
      </div>




    </div>
  )
}

export default comapanyDetailPage