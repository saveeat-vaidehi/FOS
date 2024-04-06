import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';
import './Bankdetailpage.css'


function BankDetailPage({ values, handleBlur, handleChange, touched, errors }) {

  const [chequeFile, setChequeFile] = useState({})

  const handleChequeFileChange = (event) => {

    event.preventDefault();
    const file = event.target.files[0];
    setChequeFile(file)
    var reader = new FileReader();

    console.log("File clicked ", file, file.name, file.size);
    let chequeImage = ""

    document.getElementById('chequeName').innerText = file.name;
    document.getElementById('chequeSize').innerText = file.size / 100 + 'KB';

    reader.onload = function (e) {

      console.log("e.target.result", e.target.result)
      chequeImage = e.target.result;
      console.log("menuImage->", chequeImage)
      handleChange({
        target: {
          name: 'userChequeImage',
          value: chequeImage,
        }
      });
      handleChange({
        target: {
          name: 'userChequeImageName',
          value: file.name,
        }
      });
      handleChange({
        target: {
          name: 'userChequeImageSize',
          value: file.size / 100,
        }
      });

    }
    reader.readAsDataURL(file);

  };

  const handleChequeFileDelete = () => {
    let chequeImage = ""
    setChequeFile({})

    handleChange({
      target: {
        name: 'userChequeImage',
        value: chequeImage,
      }
    });
    handleChange({
      target: {
        name: 'userChequeImageName',
        value: "",
      }
    });
    handleChange({
      target: {
        name: 'userChequeImageSize',
        value: "",
      }
    });

    document.getElementById('chequeName').innerText = "No file Selected";
    document.getElementById('chequeSize').innerText = "";

  }

  const handleChequeFileView = () => {
    if (chequeFile && chequeFile?.name?.length > 0) {
      const blob = new Blob([chequeFile], { type: chequeFile.type }); // Change 'image/png' to the appropriate MIME type
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      // window.open(values.menuImage, '_blank');
    } else {
      toast.dark("Please Upload Cheque Image !", {
        position: "top-center",
        className: 'toast-center'
      })
    }

  }


  return (
    <div className='mainOutlet'>
      <div className='heading1'>
        <h5>Bank Details</h5>
      </div>

      <div id='bankDetailsPage'>
        <div className='parentContainer'>
          <div className='Container1'>
            <div className='Container2'>

              {/* <input name='role' value={values.role} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Role here' />
                    {errors.role && touched.role ? <p className='form-error'  > {errors.role}  </p> : null} */}

              <label> Beneficiary Name</label>
              <div className='errorcontainr'>
                <input name='bankname' value={values.benName} onChange={handleChange} onBlur={handleBlur} placeholder='Please Enter Benificiary Name' />
                {errors.bankname && touched.bankname ? <p className='form-error'  > {errors.bankname}  </p> : null}
              </div>
            </div>
            <div className='Container2'>

              <label>  Beneficiary Account No.</label>
              <div className='errorcontainr'>
                <input name='bankaccountnum' value={values.bankaccountnum} onChange={handleChange} onBlur={handleBlur} placeholder='Please Enter Account No.' />
                {errors.bankaccountnum && touched.bankaccountnum ? <p className='form-error'  > {errors.bankaccountnum}  </p> : null}
              </div>

            </div>
          </div>
          <div className='Container1'>
            <div className='Container2' >

              <label> Beneficiary Bank Name</label>
              <div className='errorcontainr'>
              <input name='userBankName' value={values.userBankName} onChange={handleChange} onBlur={handleBlur} placeholder='Please Enter Bank Name' />
              {errors.userBankName && touched.userBankName ? <p className='form-error'  > {errors.userBankName}  </p> : null}

              </div>

            </div>
            <div className='Container2'>

              <label>  Beneficiary IFSC Code</label>
              <div className='errorcontainr'>
              <input name='ifsc' value={values.ifsc} onChange={handleChange} onBlur={handleBlur} placeholder='Please Enter IFSC Code' />
              {errors.ifsc && touched.ifsc ? <p className='form-error'  > {errors.ifsc}  </p> : null}

              </div>

            </div>
          </div>

        </div>


        <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />

        <div>
          <div className='subDiv2'>
            <h6>
              Cheque Upload and Download
            </h6>
          </div>
          <div className='chequeUploadContainerParent'>

            <div className='chequeUploadContainer'>

              <div className='subDiv2'>
                <h6 id='chequeName' style={{ fontSize: '17px', fontWeight: '500' }}>No file Selected </h6>
              </div>

              <div className='subDiv2'>
                <h6 id='chequeSize' style={{ fontSize: '17px', fontWeight: '500' }}></h6>
              </div>

            </div>


           
            <div className='chequeButtons'>
              <button type='button' className='btn eye' onClick={handleChequeFileView}>
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9Z" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8941 8.55208C24.0348 8.83361 24.0352 9.16569 23.8944 9.44721L23 9C23.8944 9.44721 23.8938 9.44844 23.8936 9.4488L23.8925 9.45113L23.889 9.45796L23.8777 9.48018C23.8681 9.49873 23.8546 9.52469 23.8372 9.55756C23.8025 9.6233 23.752 9.71677 23.686 9.83401C23.5542 10.0684 23.3601 10.3985 23.1057 10.7925C22.5979 11.5787 21.8432 12.6294 20.8545 13.6839C18.8955 15.7736 15.8995 18 12 18C8.10049 18 5.10448 15.7736 3.14546 13.6839C2.15683 12.6294 1.40207 11.5787 0.894336 10.7925C0.63985 10.3985 0.445792 10.0684 0.313971 9.83401C0.248023 9.71677 0.19754 9.6233 0.162753 9.55756C0.145357 9.52469 0.131875 9.49873 0.122338 9.48018L0.11099 9.45796L0.107539 9.45113L0.105573 9.44721L0.999491 9.00025C0.111724 9.44414 0.105437 9.44684 0.105573 9.44721C-0.0351909 9.16569 -0.0351909 8.83431 0.105573 8.55279L0.999491 9.00025C0.105064 8.55304 0.106186 8.55156 0.10637 8.5512L0.107539 8.54887L0.11099 8.54204L0.122338 8.51982C0.131875 8.50127 0.145357 8.47531 0.162753 8.44244C0.19754 8.3767 0.248023 8.28323 0.313971 8.16599C0.445792 7.93164 0.63985 7.60152 0.894336 7.20747C1.40207 6.42131 2.15683 5.3706 3.14546 4.31606C5.10448 2.22644 8.10049 0 12 0C15.8995 0 18.8955 2.22644 20.8545 4.31606C21.8432 5.3706 22.5979 6.42131 23.1057 7.20747C23.3601 7.60152 23.5542 7.93164 23.686 8.16599C23.752 8.28323 23.8025 8.3767 23.8372 8.44244C23.8546 8.47531 23.8681 8.50127 23.8777 8.51982L23.889 8.54204L23.8925 8.54887L23.8941 8.55208ZM2.57441 9.70747C2.39492 9.42955 2.25003 9.18887 2.14074 9C2.25003 8.81113 2.39492 8.57045 2.57441 8.29253C3.03543 7.57869 3.71817 6.6294 4.60454 5.68394C6.39552 3.77356 8.89951 2 12 2C15.1005 2 17.6045 3.77356 19.3955 5.68394C20.2818 6.6294 20.9646 7.57869 21.4256 8.29253C21.6051 8.57045 21.75 8.81113 21.8593 9C21.75 9.18887 21.6051 9.42955 21.4256 9.70747C20.9646 10.4213 20.2818 11.3706 19.3955 12.3161C17.6045 14.2264 15.1005 16 12 16C8.89951 16 6.39552 14.2264 4.60454 12.3161C3.71817 11.3706 3.03543 10.4213 2.57441 9.70747ZM23 9C23.8944 8.55279 23.8943 8.55245 23.8941 8.55208L23 9Z" fill="white" />
                </svg>
              </button>


              <button type='button' className='btn upload' for="file-upload1" onClick={() => document.getElementById('file-upload1').click()}>
                <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.85714 16.8235V9.05882H0L8.5 0L17 9.05882H12.1429V16.8235H4.85714ZM0 22V19.4118H17V22H0Z" fill="white" />
                </svg>
                <input id="file-upload1" style={{ display: "none" }} name='file' type="file" onChange={handleChequeFileChange} />
              </button>

              <button type='button' className='btn dlt' onClick={handleChequeFileDelete}>
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.1111 1.22222H12.8333L11.6111 0H5.5L4.27778 1.22222H0V3.66667H17.1111V1.22222ZM1.22222 19.5556C1.22222 20.2039 1.47976 20.8256 1.93818 21.284C2.39661 21.7425 3.01836 22 3.66667 22H13.4444C14.0928 22 14.7145 21.7425 15.1729 21.284C15.6313 20.8256 15.8889 20.2039 15.8889 19.5556V4.88889H1.22222V19.5556Z" fill="white" />
                </svg>
              </button>

            </div>

          </div>
        </div>

      </div>




    </div>
  )
}

export default BankDetailPage