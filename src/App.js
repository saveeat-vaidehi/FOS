
import './App.css';

import Compannydetailpage from './Component/Comapanydeatilpage';
import Bankdetailspage from './Component/Bankdetailpage';
import Outletdetailpage from './Component/Outletdetailpage';
import HeaderImage from './Component/HeaderImage';
import Otherdetailpage from './Component/Otherdetailpage';
import Commisiondetailpage from './Component/Commisiondetailpage';
import { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import validator from 'validator';
import axios from 'axios';
import { signUpSchema } from "./schema";
import { ToastContainer } from 'react-toastify';

function App() {
  const brandNameRef = useRef(null);

  const [formData, setFormData] = useState(

    {

      //========== Outlet Details =========\\
      "brand_name": "",

      //#M1
      "bname": "",
      "role": "",
      "bmob": "",
      "outletemail": "",
      "bemail":"",

      //#M2

      "oname": "",
      "role1": "",
      "omob": "",
      "oemail": "",


      //#M 3 - Missing 
      "name3": "",
      "role2": "",
      "email3": "",
      "omob3": "",

      //Location
      "Outlet_address_street": "",

      //Locality
      "Outlet_address_locality": "",

      //Timing Pending 
      "timeData":[],
      //Menu Upload Pending(New UI)

      "menuImage":"",
      "menuFileName":"",
      "menuFileSize":"",





      //========= Company Details ===========\\
      //pan
      "pan": "",
      //GSTIN
      "gstin": "",
      //FASSAI Licencse 
      "fssai": "",
      //FASSAI Ref Num
      "fssairef": "",

      //Signing Name
      "registered_name": "",
      
      //Mobile Number
      "o_mnumber": "",

      //Signing  Mail
      "s_a_email": "",

      //Register Billing Address
      "Billing_address_street": "",

      //Ownership Type
      "ownership": "",

      //Type of Business
      "type_of_business": "",

      //=======  Bank Details ==========\\

      //Benificiary Name 
      "bankname": "",
      //Benificiary Acc Num
      "bankaccountnum": "",
      //IFSC code 
      "ifsc": "",
      //Bank Name  
      "userBankName": "",


      //Check Upload and Download Missing 

      "userChequeImage":"",
      "userChequeImageName":"",
      "userChequeImageSize":"",



      //Commision Details
      "comm": "",

      //Other Deatils 

      "fos_id": "",
      "remarks": "",


      "Outlet_address_pincode": "",
      "Billing_address_pincode": "",
      "Billing_address_locality": "",

      "loc": "",
      "loc_lat": 19.1663,
      "loc_lon": 72.8526,
      "w_o_time": "",
      "w_c_time": "",
      "wk_o_time": "",
      "wk_c_time": "",
      "menu_url": "",
    }
  )

  
  const [isRefReady, setIsRefReady] = useState(false);

  useEffect(() => {
    if (brandNameRef.current) {
      setIsRefReady(true);
    }
  }, [brandNameRef]);

  const handlTimeReturn = (timeDataArray) =>{
    console.log("------------>>>>>=========",timeDataArray)
    handleChange({
      target: {
        name: 'timeData', // Name of the field to update
        value: timeDataArray // New value for the field
      }
    });
  }

  //------------------  Formik Integration ----------------------\\
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setErrors, setTouched, setFieldError , handleReset} = useFormik({

    initialValues: formData,
    validationSchema: signUpSchema,
    
    onSubmit: async (values,{ resetForm}) => {
      console.log("Formik Values ---->", values);
      
    console.log("Validation Errors ---->", errors);

      
      const response =  axios.post("https://apis.saveeat.in/api/v1/adminUser/getfosdata1", values)
      // const response = await axios.post("http://localhost:3032/api/v1/adminUser/getfosdata1", values);
      // handleReset();
      // resetForm();

    },
   
  });

  
 



  const handleSubmit1 = (e) => {
    e.preventDefault();

    // Check if any fields are invalid
    const isInvalid = Object.keys(errors).some((key) => touched[key] && errors[key]);

    if (isInvalid) {

      const firstInvalidField = Object.keys(errors).find((key) => touched[key] && errors[key]);
      console.log("firstInvalidField---->", firstInvalidField, touched)

      setTouched((touched) => ({ ...touched, [firstInvalidField]: true }));

      setFieldError(firstInvalidField, errors[firstInvalidField]);
      console.log("setFieldError---->", errors);

      if (isRefReady) {

        const invalidFieldRef = brandNameRef.current;
        invalidFieldRef.focus();
      }


    } else {
      handleSubmit();
    }
  };



  return (

    <div className="App" >

      <form className='MainForm' onSubmit={handleSubmit1}>

            <HeaderImage />
            <Outletdetailpage handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} touched={touched} brandNameRef={brandNameRef}  handlTimeReturn={handlTimeReturn} />
            <Compannydetailpage handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} touched={touched} />
            <Bankdetailspage handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} touched={touched} />
            <Commisiondetailpage handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} touched={touched} />
            <Otherdetailpage handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors} touched={touched} handleReset={handleReset}/>
            <div className='saveBtn'>
              <button type='submit'> Submit </button>
            </div>

      </form>

      <ToastContainer />

     

    </div>
  );
}

export default App;
