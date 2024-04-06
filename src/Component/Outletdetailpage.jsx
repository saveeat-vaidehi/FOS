import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './Outletdetailpage.css'
import OutletTimingTable from './OutletTimingTable';
function OutletDetailPage({ values, handleBlur, handleChange, touched, errors, brandNameRef, handlTimeReturn }) {
    // console.log("Time function ---->>", handlTimeReturn)
    // const brandNameRef = useRef(null);
    // const bnameRef = useRef(null);
    // const role1Ref= useRef(null);
    // const bmobRef = useRef(null);
    // const location = useRef(null);
    function generateTimeArray() {
        const times = [];
        let hours = 6;
        let minutes = 0;

        for (let i = 0; i < (24 * 4); i++) { // 24 hours * 4 (15 minutes intervals)
            const formattedTime = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`;
            times.push(formattedTime);

            minutes += 15;

            if (minutes === 60) {
                hours++;
                minutes = 0;
            }
            if (hours === 6 && minutes === 0o0) {
                break;
            }

            if (hours === 24) {
                hours = 0;
            }
        }


        return times;
    }

    const timeList = generateTimeArray();

    const [selectedFile, setSelectedFile] = useState({});
    const [menuUplaodError, setMenuUplaodError] = useState(null)
    const [switchh, setSwitchh] = useState({});
    const [slot, setSlot] = useState([
        { day: "Monday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] },
        { day: "Tuesday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] },
        { day: "Wednesday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] },
        { day: "Thursday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] },
        { day: "Friday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] },
        { day: "Saturday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] },
        { day: "Sunday", slots: [{ from: "Select Time ", to: "Select Time" }], timeDropdown: [{ fromTimeList: timeList, toTimeList: timeList }] }
    ]);



    function handleSwitch(day, value) {

        setSwitchh(prevState => ({
            ...prevState,
            [day]: value 
        }));
    }

    function saveSelectedTime(Day, selectedTime, type, slotIndex) {

        let findCurrentDay = slot.find(item => item.day === Day);

        if (findCurrentDay) {

            let findDaySlot = findCurrentDay.slots[slotIndex];
            let findSlotTimeDropDown = "";


            if (type === "from") {
                findSlotTimeDropDown = findCurrentDay.timeDropdown[slotIndex];

                findDaySlot.from = selectedTime;

                if (findSlotTimeDropDown) {

                    let storeOldToTimeList = findSlotTimeDropDown.toTimeList;
                    let findCurrentToTimeListIndex = findSlotTimeDropDown.toTimeList.findIndex(time => time === selectedTime);
                    let newToTimeList = storeOldToTimeList.slice(findCurrentToTimeListIndex + 1)
                    findSlotTimeDropDown.toTimeList = newToTimeList;
                }


            } else {

                findDaySlot.to = selectedTime;
                let nextSlotIndex = slotIndex + 1;


                let checkNextSlotExist = findCurrentDay.slots[nextSlotIndex];


                if (checkNextSlotExist) {

                    findSlotTimeDropDown = findCurrentDay.timeDropdown[nextSlotIndex];

                    if (findSlotTimeDropDown) {

                        let storeOldFromTimeList = findSlotTimeDropDown.fromTimeList;//Next time slot dropdownn 

                        let findCurrentFromTimeListIndex = storeOldFromTimeList.findIndex(time => time === selectedTime);

                        let newFromTimeList = storeOldFromTimeList.slice(findCurrentFromTimeListIndex + 1);

                        findSlotTimeDropDown.fromTimeList = newFromTimeList;




                    } else {

                        alert("Time DropDown does not exist for next slot");
                    }

                }




            }


            const updatedSlot = slot.map(item => {

                if (item.day === Day) {

                    const updatedSlots = item.slots.map((slot, idx) => {

                        if (idx === slotIndex) {
                            return findDaySlot;
                        } else {
                            return slot;
                        }
                    });
                    console.log(" updatedSlots- updatedSlots ====>", updatedSlots)

                    const updatedDropdownSlots = item.timeDropdown.map((dropdownObj, idx) => {
                        if (type === "from") {

                            if (idx === slotIndex) {
                                return findSlotTimeDropDown;

                            } else {
                                return dropdownObj;
                            }

                        } else {

                            if (idx === slotIndex + 1) {
                                return findSlotTimeDropDown;

                            } else {
                                return dropdownObj;
                            }

                        }

                    });

                    return { ...item, slots: updatedSlots, timeDropdown: updatedDropdownSlots };
                } else {
                    return item;
                }

            });




            setSlot(updatedSlot);


        } else {
            alert("No Day entryy found ")
        }

    }

    function handleAddSlot(day, newSlot, timeObj) {

        const existingDay = slot.find(item => item.day === day);

        if (existingDay) {

            const updatedSlots = [...existingDay.slots, newSlot];
            const updateDropdownSlots = [...existingDay.timeDropdown, timeObj]
            setSlot(prevState => prevState.map(item => item.day === day ? { ...item, slots: updatedSlots, timeDropdown: updateDropdownSlots } : item));

        } else {

            setSlot(prevState => [...prevState, { day, slots: [newSlot], timeDropdown: [timeObj] }]);

        }
    }

    function handleRemoveSlot(day, slotIndex) {

        console.log("Inside handle remove slots -->", day, slotIndex)
        const dayIndex = slot.findIndex(item => item.day === day);

        if (dayIndex !== -1) {

            const updatedSlots = [...slot[dayIndex].slots];
            const timedropdownslot = [...slot[dayIndex].timeDropdown];
            // console.log("----->><<<<<<-----", updatedSlots[slotIndex-1].to  ,timedropdownslot[slotIndex].toTimeList)


            let nextSlotIndex = slotIndex + 1;


            if (slot[dayIndex].slots[nextSlotIndex]) {

                let currentTimeIndex = timeList.findIndex(time => time === updatedSlots[slotIndex - 1].to);
                let newList = timeList.slice(currentTimeIndex + 1);
                console.log("Timeeee ===>", updatedSlots[slotIndex - 1].to)
                console.log("ccccccc", slotIndex, timedropdownslot[slotIndex], newList)
                // Update the fromTimeList of the next slot's time dropdown
                const nextTimeDropdown = timedropdownslot[slotIndex + 1];
                const updatedNextTimeDropdown = { ...nextTimeDropdown, fromTimeList: newList, toTimeList: newList };
                timedropdownslot[slotIndex + 1] = updatedNextTimeDropdown;
            }

            updatedSlots.splice(slotIndex, 1);
            timedropdownslot.splice(slotIndex, 1);
            setSlot(prevState => prevState.map((item, index) => index === dayIndex ? { ...item, slots: updatedSlots, timeDropdown: timedropdownslot } : item));
        }
    }

    const Days = [

        { day: "Monday", switchhFunction: value => handleSwitch("Monday", value), switchh: switchh["Monday"] },
        { day: "Tuesday", switchhFunction: value => handleSwitch("Tuesday", value), switchh: switchh["Tuesday"] },
        { day: "Wednesday", switchhFunction: value => handleSwitch("Wednesday", value), switchh: switchh["Wednesday"] },
        { day: "Thursday", switchhFunction: value => handleSwitch("Thursday", value), switchh: switchh["Thursday"] },
        { day: "Friday", switchhFunction: value => handleSwitch("Friday", value), switchh: switchh["Friday"] },
        { day: "Saturday", switchhFunction: value => handleSwitch("Saturday", value), switchh: switchh["Saturday"] },
        { day: "Sunday", switchhFunction: value => handleSwitch("Sunday", value), switchh: switchh["Sunday"] }

    ];


    useEffect(() => {

        const timeData = []

        slot.forEach((item, index) => {

            const status = (switchh[item.day]) ? 'Open' : 'Closed'; // If switchh.day is truthy, set status to 'Closed', otherwise set it to 'Open'
            const dayObject = {
                day: item.day,
                status: status,
                time: [item.slots[0]],
                slots: item.slots.filter((obj, idx) => idx !== 0)
            };
            timeData.push(dayObject);
        });

        handlTimeReturn(timeData);


    }, [slot, switchh])

   


    const handleOutletSubmit = (e) => {
        e.preventDefault();

        if (brandNameRef.current) {
            brandNameRef.current.focus();
        }
    }

    const handleFileChange = (event) => {

        event.preventDefault();
        const file = event.target.files[0];

        setSelectedFile(file)
        var reader = new FileReader();

        console.log("File clicked ", file, file.name, file.size);
        let menuImage = ""

        document.getElementById('menuFileName').innerText = file.name;
        document.getElementById('menuFileSize').innerText = file.size / 100 + 'KB';

        reader.onload = function (e) {

            console.log("e.target.result", e.target.result)
            menuImage = e.target.result;
            console.log("menuImage->", menuImage)
            handleChange({
                target: {
                    name: 'menuImage',
                    value: menuImage,
                }
            });
            handleChange({
                target: {
                    name: 'menuFileName',
                    value: file.name,
                }
            });
            handleChange({
                target: {
                    name: 'menuFileSize',
                    value: file.size / 100,
                }
            });

        }
        reader.readAsDataURL(file);

    };

    const handleFileDelete = () => {


        document.getElementById('menuFileName').innerText = "No File Selected";
        document.getElementById('menuFileSize').innerText = "";
        let menuImage = ""
        setSelectedFile({})

        handleChange({
            target: {
                name: 'menuImage',
                value: menuImage,
            }
        });
        handleChange({
            target: {
                name: 'menuFileName',
                value: "",
            }
        });
        handleChange({
            target: {
                name: 'menuFileSize',
                value: "",
            }
        });

    }

    const handleFileView = () => {
        if (selectedFile && selectedFile.name && selectedFile.name.length > 0) {
            const blob = new Blob([selectedFile], { type: selectedFile.type });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } else {
            setMenuUplaodError(true);
            toast.dark("Please Select Menu File !", {
                position: "top-center",
              }); 
        }
    };
    
    useEffect(() => {
        if (menuUplaodError) {
            
        setMenuUplaodError(false)
        }
       
    }, [menuUplaodError]);


    return (
      <>
        <div className='mainOutlet'>
            <div className='heading'>
                <h5>Outlet Details</h5>
            </div>

            <div id='outletDetailsPage'>
                <form>
                    {/* #1Mobile one start */}
                    <div>
                        <div className="subDiv">
                            <h6>
                                Outlet Name <span className='mandatory'> *</span>
                            </h6>
                        </div>

                        <div className='OutletInputFields'>
                            <div className='inputFields'>
                                <label htmlFor='brand_name' >Name </label>
                                <div className='errorcontainr'>
                                    <input name='brand_name' value={values.brand_name} onChange={handleChange} onBlur={handleBlur} ref={brandNameRef} placeholder='Enter Outlet Name' />
                                    {errors.brand_name && touched.brand_name ? <p className='form-error'  > {errors.brand_name}  </p> : null}
                                </div>
                            </div>
                        </div>

                        <div className="subDiv" >
                            <h6>
                                Outlet Mobile #1<span className='mandatory'> *</span>
                            </h6>
                        </div>
                        <div className='OutletInputFields' >
                            <div className='inputFields'>
                                <label htmlFor='outletname1' >Name</label>
                                <div className='errorcontainr'>
                                    <input name='bname' value={values.bname} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Owner Name' />
                                </div>
                                {errors.bname && touched.bname ? <p className='form-error'  > {errors.bname}  </p> : null}

                            </div>

                            <div className='inputFields'>
                                <label>Designation</label>
                                <div className='errorcontainr'>
                                    <input name='role' value={values.role} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Role ' />

                                </div>
                                {errors.role && touched.role ? <p className='form-error'  > {errors.role}  </p> : null}

                            </div>

                            <div className='inputFields'>
                                <label htmlFor='bmob'>Mobile Number</label>
                                <div className='errorcontainr'>
                                    <input name='bmob' maxLength={10} minLength={10} value={values.bmob} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Owner Number' />
                                    {errors.bmob && touched.bmob ? <p className='form-error'  > {errors.bmob}  </p> : null}
                                </div>

                            </div>
                        </div>

                        <div className="subDiv" >
                            <h6>
                                Outlet Mobile #2
                            </h6>
                        </div>
                        <div className='OutletInputFields' >
                            <div className='inputFields'>
                                <label>Name</label>
                                <div className='errorcontainr'>
                                    <input name='oname' value={values.oname} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Manger Name' />

                                </div>

                            </div>
                            <div className='inputFields'>
                                <label>Designation</label>
                                <div className='errorcontainr'>
                                    <input name='role1' value={values.role1} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Role ' />

                                </div>
                            </div>
                            <div className='inputFields'>
                                <label>Mobile Number</label>
                                <div className='errorcontainr'>
                                    <input name='omob' maxLength={10} value={values.omob} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Manger Number' />
                                    {errors.omob && touched.omob ? <p className='form-error'  > {errors.omob}  </p> : null}

                                </div>
                            </div>
                        </div>
                        <div className="subDiv" >
                            <h6>
                                Outlet Mobile #3
                            </h6>
                        </div>
                        <div className='OutletInputFields'>
                            <div className='inputFields'>
                                <label>Name</label>
                                <div className='errorcontainr'>
                                    <input name='name3' value={values.name3} onChange={handleChange} placeholder='Enter Person Name' />

                                </div>

                            </div>
                            <div className='inputFields'>
                                <label>Designation</label>
                                <div className='errorcontainr'>
                                    <input name='role2' value={values.role2} onChange={handleChange} placeholder='Enter Role ' />

                                </div>

                            </div>

                            <div className='inputFields'>
                                <label>Mobile Number</label>
                                <div className='errorcontainr'>
                                    <input name='omob3' maxLength={10} value={values.omob3} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Person Number' />
                                    {errors.omob3 && touched.omob3 ? <p className='form-error'  > {errors.omob3}  </p> : null}
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* #1Mobile one end */}

                    <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />

                    <div style={{ display: "grid", gap: '1rem' }}>
                        <div>
                            <div className="subDiv" >
                                <h6>
                                    Location <span className='mandatory'>*</span>
                                </h6>
                            </div>

                            <div className='OutletInputFields' >
                                <div className='inputFields'>
                                    <div className='errorcontainr'>
                                        <textarea style={{ width: "100%", height: "auto" }} placeholder=' Enter Outlet Location' value={values.Outlet_address_street} name="Outlet_address_street" onChange={handleChange} onBlur={handleBlur}>

                                        </textarea>
                                        {errors.Outlet_address_street && touched.Outlet_address_street ? <p className='form-error'  > {errors.Outlet_address_street}  </p> : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="subDiv" >
                                <h6>
                                    Locality
                                </h6>
                            </div>

                            <div className='OutletInputFields'>
                                <div className='inputFields'>
                                    <input name="Outlet_address_locality" value={values.Outlet_address_locality} placeholder=' Enter Locality ' onChange={handleChange} />
                                </div>
                            </div>
                        </div>



                    </div>

                    <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />


                    {/* #2Mobile one start */}
                    <div style={{ border: "0px solid blue", display: 'flex', flexDirection: 'column' }}>
                        <div className="subDiv" >
                            <h6>
                                Outlet Email #1<span className='mandatory'> *</span>
                            </h6>
                        </div>

                        <div className='OutletInputFields' >
                            <div className='inputFields'>
                                <label>Name</label>

                                <div className='errorcontainr'>
                                    <input name='bname' value={values.bname} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Owner Name' />
                                    {errors.bname && touched.bname ? <p className='form-error'  > {errors.bname}  </p> : null}

                                </div>

                            </div>
                            <div className='inputFields'>
                                <label>Designation</label>
                                <div className='errorcontainr'>
                                    <input name='role' value={values.role} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Role ' />
                                    {errors.role && touched.role ? <p className='form-error'  > {errors.role}  </p> : null}

                                </div>

                            </div>

                            <div className='inputFields'>
                                <label>Email</label>
                                <div className='errorcontainr'>
                                    <input name='bemail' value={values.bemail} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Owner Email ' />
                                    {errors.bemail && touched.bemail ? <p className='form-error'  > {errors.bemail}  </p> : null}

                                </div>


                            </div>

                        </div>
                        <div className="subDiv" >
                            <h6>
                                Outlet Email #2
                            </h6>
                        </div>
                        <div className='OutletInputFields'>
                            <div className='inputFields'>
                                <label>Name</label>
                                <div className='errorcontainr'>
                                    <input name='oname' value={values.oname} onChange={handleChange} placeholder='Enter Manger Name' />

                                </div>

                            </div>
                            <div className='inputFields'>
                                <label>Designation</label>
                                <div className='errorcontainr'>
                                    <input name='role1' value={values.role1} onChange={handleChange} placeholder='Enter Role ' />

                                </div>
                            </div>
                            <div className='inputFields'>
                                <label>Email</label>
                                <div className='errorcontainr'>
                                    <input name='oemail' value={values.oemail} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Manger Email' />
                                    {errors.oemail && touched.oemail ? <p className='form-error'  > {errors.oemail}  </p> : null}
                                </div>

                            </div>

                        </div>
                        <div className="subDiv" >
                            <h6>
                                Outlet Email #3
                            </h6>
                        </div>
                        <div className='OutletInputFields'>
                            <div className='inputFields' >
                                <label>Name</label>
                                <div className='errorcontainr'>
                                    <input name='name3' value={values.name3} onChange={handleChange} placeholder='Enter Person Name' />

                                </div>

                            </div>
                            <div className='inputFields'>
                                <label>Designation</label>
                                <div className='errorcontainr'>
                                    <input name='role2' value={values.role2} onChange={handleChange} placeholder='Enter Role' />

                                </div>

                            </div>

                            <div className='inputFields'>
                                <label>Email</label>
                                <div className='errorcontainr'>
                                    <input name='email3' value={values.email3} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Person Email' />
                                    {errors.email3 && touched.email3 ? <p className='form-error'  > {errors.email3}  </p> : null}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* #2Mobile one end */}
                    <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />


                    <div>
                        <div className="subDiv" >
                            <h6>
                                Outlet Timmings
                            </h6>
                        </div>
                        <div className='timingTable'>

                            {Days.map((Day) => (

                                <OutletTimingTable key={Day.day}
                                    Day={Day.day}
                                    timeList={timeList}
                                    timeDropdown={slot.find(item => item.day === Day.day)?.timeDropdown}
                                    handleSwitch={Day.switchhFunction}
                                    switchh={Day.switchh}
                                    slot={slot}
                                    handleAddSlot={handleAddSlot}
                                    handleRemoveSlot={handleRemoveSlot}
                                    saveSelectedTime={saveSelectedTime}
                                />
                            ))}


                        </div>
                    </div>

                    <hr style={{ marginTop: "15px", boxShadow: "0px 0.6px 5px #CFCCCC", color: "#CFCCC" }} />

                    <div>
                        <div className="subDiv" >
                            {/* menuImage */}
                            <h6>
                                Outlet Menu Uploaded File<span className='mandatory'> *</span>
                                <div className='errorcontainr'>
                                    {errors.menuImage && touched.menuImage ? <p className='form-error' style={{ paddingLeft: '0' }}  > {errors.menuImage}  </p> : null}
                                </div>

                            </h6>
                        </div>

                        <div className='MenuUploadContainerParent'>

                            <div className='MenuUploadContainer'>

                                <div className="subDiv">

                                    <h6 id='menuFileName' >No file Selected</h6>

                                </div>

                                <div className="subDiv">
                                    <h6 id='menuFileSize' > </h6>
                                </div>
                            </div>

                            <div className='menuButtons'>
                                <button type='button' className='btn1 eye1' onClick={handleFileView}>
                                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M23.8941 8.55208C24.0348 8.83361 24.0352 9.16569 23.8944 9.44721L23 9C23.8944 9.44721 23.8938 9.44844 23.8936 9.4488L23.8925 9.45113L23.889 9.45796L23.8777 9.48018C23.8681 9.49873 23.8546 9.52469 23.8372 9.55756C23.8025 9.6233 23.752 9.71677 23.686 9.83401C23.5542 10.0684 23.3601 10.3985 23.1057 10.7925C22.5979 11.5787 21.8432 12.6294 20.8545 13.6839C18.8955 15.7736 15.8995 18 12 18C8.10049 18 5.10448 15.7736 3.14546 13.6839C2.15683 12.6294 1.40207 11.5787 0.894336 10.7925C0.63985 10.3985 0.445792 10.0684 0.313971 9.83401C0.248023 9.71677 0.19754 9.6233 0.162753 9.55756C0.145357 9.52469 0.131875 9.49873 0.122338 9.48018L0.11099 9.45796L0.107539 9.45113L0.105573 9.44721L0.999491 9.00025C0.111724 9.44414 0.105437 9.44684 0.105573 9.44721C-0.0351909 9.16569 -0.0351909 8.83431 0.105573 8.55279L0.999491 9.00025C0.105064 8.55304 0.106186 8.55156 0.10637 8.5512L0.107539 8.54887L0.11099 8.54204L0.122338 8.51982C0.131875 8.50127 0.145357 8.47531 0.162753 8.44244C0.19754 8.3767 0.248023 8.28323 0.313971 8.16599C0.445792 7.93164 0.63985 7.60152 0.894336 7.20747C1.40207 6.42131 2.15683 5.3706 3.14546 4.31606C5.10448 2.22644 8.10049 0 12 0C15.8995 0 18.8955 2.22644 20.8545 4.31606C21.8432 5.3706 22.5979 6.42131 23.1057 7.20747C23.3601 7.60152 23.5542 7.93164 23.686 8.16599C23.752 8.28323 23.8025 8.3767 23.8372 8.44244C23.8546 8.47531 23.8681 8.50127 23.8777 8.51982L23.889 8.54204L23.8925 8.54887L23.8941 8.55208ZM2.57441 9.70747C2.39492 9.42955 2.25003 9.18887 2.14074 9C2.25003 8.81113 2.39492 8.57045 2.57441 8.29253C3.03543 7.57869 3.71817 6.6294 4.60454 5.68394C6.39552 3.77356 8.89951 2 12 2C15.1005 2 17.6045 3.77356 19.3955 5.68394C20.2818 6.6294 20.9646 7.57869 21.4256 8.29253C21.6051 8.57045 21.75 8.81113 21.8593 9C21.75 9.18887 21.6051 9.42955 21.4256 9.70747C20.9646 10.4213 20.2818 11.3706 19.3955 12.3161C17.6045 14.2264 15.1005 16 12 16C8.89951 16 6.39552 14.2264 4.60454 12.3161C3.71817 11.3706 3.03543 10.4213 2.57441 9.70747ZM23 9C23.8944 8.55279 23.8943 8.55245 23.8941 8.55208L23 9Z" fill="white" />
                                    </svg>
                                </button>
                                


                                <button type='button' className='btn1 upload1' for="file-upload" onClick={() => document.getElementById('file-upload').click()} >
                                    <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.85714 16.8235V9.05882H0L8.5 0L17 9.05882H12.1429V16.8235H4.85714ZM0 22V19.4118H17V22H0Z" fill="white" />
                                    </svg>
                                    <input id="file-upload" style={{ display: "none" }} name='file' type="file" onChange={handleFileChange} />
                                </button>

                                <button type='button' className='btn1 dlt1' onClick={handleFileDelete}>
                                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.1111 1.22222H12.8333L11.6111 0H5.5L4.27778 1.22222H0V3.66667H17.1111V1.22222ZM1.22222 19.5556C1.22222 20.2039 1.47976 20.8256 1.93818 21.284C2.39661 21.7425 3.01836 22 3.66667 22H13.4444C14.0928 22 14.7145 21.7425 15.1729 21.284C15.6313 20.8256 15.8889 20.2039 15.8889 19.5556V4.88889H1.22222V19.5556Z" fill="white" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>


                </form>
            </div>


        </div>
       
      </>
    )
}

export default OutletDetailPage