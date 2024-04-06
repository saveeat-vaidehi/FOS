import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './OutletTimingTable.css'
function OutletTimingTable({ Day, timeList, handleSwitch, switchh, slot, handleAddSlot, handleRemoveSlot, saveSelectedTime, timeDropdown }) {

  // console.log("OutletTimingTable Data ------>", Day, switchh,slot);


  const [showPlusButton, setShowPlusButton] = useState(false)

  useEffect(() => {

    // console.log("showPlusButton------------->", showPlusButton)

  }, [showPlusButton])


  function handleSwitchChange() {
    // console.log("Inside Child handle--->", handleSwitch)
    handleSwitch(!switchh)
    setShowPlusButton(!showPlusButton);
  }

  // console.log("Slots data to child ----->", slot)
  function addSlot() {

    let newFromTimeList = "";

    let checkExistingEntryIndex = slot.findIndex(entry => entry.day === Day);

    let lastSlot = slot[checkExistingEntryIndex].slots[slot[checkExistingEntryIndex].slots.length - 1];

    if (lastSlot.from !== "Select Time" && lastSlot.to !== "Select Time") {

      let obj = {
        from: "Select Time", to: "Select Time"
      };

      if (lastSlot.to !== "Select Time") {
        let lastSlotTime = lastSlot.to;
        let lastSlotTimeIndex = timeList.findIndex(time => time === lastSlot.to);
        newFromTimeList = timeList.slice(lastSlotTimeIndex + 1);
      }


      let timeObj = {
        fromTimeList: newFromTimeList, toTimeList: timeList
      }

      handleAddSlot(Day, obj, timeObj, lastSlot.to);

    } else {

      // alert("Please select both 'From' and 'To' times in the last slot before adding a new one.");
      toast.dark("Please Select Proper Time !",{
        position: "top-center",
        className: 'toast-center'
      });

    }

  }

  function removeSlot(day, slotIndex) {

    let dayIndex = slot.findIndex(item => item.day === day);

    let removedDayObj = slot[dayIndex];
    let removedSlotObj = removedDayObj.slots[slotIndex];
    if (removedSlotObj.from === "05:45" || removedSlotObj.to === "05:45") {
      setShowPlusButton(!showPlusButton)
    }

    handleRemoveSlot(day, slotIndex);

  }

  function handleSelectSlotTime(selectedTime, type, slotIndex) {
    console.log("handleSelectSlotTime functio ----->", selectedTime, type, slotIndex, showPlusButton);

    if (selectedTime === "05:45") {

      setShowPlusButton(!showPlusButton)

    } else {

      // console.log("Inside else ")
      setShowPlusButton(true)

    }
    saveSelectedTime(Day, selectedTime, type, slotIndex);
  }
  const customStyles3 = {
   

    control: provided => ({
      ...provided,
      
      width: '100%',
    height: '100%',
    border: '2px solid rgb(221, 210, 210)',
    padding: '0rem',
    borderRadius: '10px',
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      color: state.isSelected ? 'white' : 'black'
    }) 
    ,
  singleValue: provided => ({
    ...provided,
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.9rem', 

    '@media (max-width: 768px)': {
      fontSize: '1.4rem', 
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem', 

    },
  })
  }


  return (
    <div className='mainContainer' >
      <div className='parentTime'
      // style={{borderTopLeftRadius : Time ==='06:00' ? '10px':'' , borderTopRightRadius : Day==='Monday' ? '10px':'' , borderBottomLeftRadius : Day==='Sunday' ? '10px':'' , borderBottomRightRadius : Day==='Sunday' ? '10px':''   }}
      >
        <div className='day_switch_container'>

          <div className='dayTxt' >

            <h6>{Day}</h6>

          </div>

          <div className='switchContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>

            {

              switchh ? <svg onClick={handleSwitchChange} id="toggleIcon" xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24" fill="none">
                <path d="M0 12C0 5.37258 5.37258 0 12 0H32C38.6274 0 44 5.37258 44 12C44 18.6274 38.6274 24 32 24H12C5.37258 24 0 18.6274 0 12Z" fill="#56C568" />
                <circle cx="32" cy="12" r="10" fill="white" />

              </svg> : <svg onClick={handleSwitchChange} id="toggleIcon" xmlns="http://www.w3.org/2000/svg" width="45" height="24" viewBox="0 0 44 24" fill="none">
                <path opacity="1" d="M0 12C0 5.37258 5.37258 0 12 0H32C38.6274 0 44 5.37258 44 12C44 18.6274 38.6274 24 32 24H12C5.37258 24 0 18.6274 0 12Z" fill="#525252" />
                <circle opacity="1" cx="12" cy="12" r="10" fill="white" />
              </svg>

            }

          </div>

        </div>


        <div className='parentSlotsContainer'>


          {

            slot?.filter(item => item.day === Day).map((filteredSlot, index) =>

            (

              filteredSlot.slots.map((oneSlot, slotIndex) => (
                <div key={oneSlot.day + index + slotIndex} className='plus_slots_container'>

                  <div className='selectTimeParentContainer'>

                    <div
                      className={`selectTimeContainer ${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} >

                      {/* <select value={oneSlot.from}
                      
                       className={`${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                        disabled={switchh === undefined || !switchh} 
                        onChange={(e) => handleSelectSlotTime(e.target.value, 'from', slotIndex)}>

                        <option >Select Time</option>

                        {
                          filteredSlot.timeDropdown[slotIndex].fromTimeList.map((time, timeindex) => (
                            <option key={time + "from" + Day + timeindex} value={time}  >{time}</option>
                          ))
                        }

                      </select> */}

                      <Select
                        value={{ value: oneSlot.from, label: oneSlot.from }}
                        styles={customStyles3}
                        className={`${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                        disabled={switchh === undefined || !switchh}
                        isSearchable={false}
                        onChange={(selectedOption) => handleSelectSlotTime(selectedOption.value, 'from', slotIndex)}
                        options={filteredSlot.timeDropdown[slotIndex].fromTimeList.map((time) => ({ value: time, label: time }))} // Convert time array to options format
                      />

                    </div>

                    <div
                      className={`centerTxt ${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: "center", fontWeight: "600" }}>
                      <span>
                        To
                      </span>
                    </div>

                    <div
                      className={`selectTimeContainer ${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>

                      {/* <select
                        className={`${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                        disabled={switchh === undefined || !switchh}
                        value={oneSlot.to} onChange={(e) => handleSelectSlotTime(e.target.value, 'to', slotIndex)}>
                        <option >Select Time</option>
                        {
                          filteredSlot.timeDropdown[slotIndex].toTimeList.map((time, timeindex) => (
                            <option key={time + "to" + Day + timeindex} value={time}  >{time}</option>
                          ))
                        }


                      </select> */}

                      <Select
                        value={{ value: oneSlot.to, label: oneSlot.to }}
                        // classNamePrefix="select"
                        styles={customStyles3}
                        isSearchable={false}
                        className={`${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                        disabled={switchh === undefined || !switchh}
                        onChange={(selectedOption) => handleSelectSlotTime(selectedOption.value, 'to', slotIndex)}
                        options={filteredSlot.timeDropdown[slotIndex].toTimeList.map((time) => ({ value: time, label: time }))} // Convert time array to options format
                      />

                    </div>


                  </div>


                  {slotIndex === 0 ? <div className='plus-btn' style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>

                    <button type='button'
                      className={`${!showPlusButton ? 'disable_elements' : ''}`}
                      disabled={!showPlusButton}
                      onClick={addSlot}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM12 7C12 6.44772 11.5523 6 11 6C10.4477 6 10 6.44772 10 7V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H10V15C10 15.5523 10.4477 16 11 16C11.5523 16 12 15.5523 12 15V12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H12V7Z" fill="#3A3A3A" />
                      </svg>
                    </button>
                  </div> :

                    <div className='plus-btn' style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>

                      <button type='button'
                        className={`${switchh === undefined || !switchh ? 'disable_elements' : ''}`}
                        disabled={switchh === undefined || !switchh}

                        onClick={() => removeSlot(Day, slotIndex)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none" >
                          <path d="M6.64536 8.65393C5.94422 8.65393 5.37583 9.22232 5.37583 9.92346C5.37583 10.6246 5.94422 11.193 6.64536 11.193H13.4162C14.1173 11.193 14.6857 10.6246 14.6857 9.92346C14.6857 9.22232 14.1173 8.65393 13.4162 8.65393H6.64536Z" fill="#FF4848" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.0308 0.19043C4.65536 0.19043 0.297729 4.54806 0.297729 9.92346C0.297729 15.2989 4.65536 19.6565 10.0308 19.6565C15.4062 19.6565 19.7638 15.2989 19.7638 9.92346C19.7638 4.54806 15.4062 0.19043 10.0308 0.19043ZM2.83678 9.92346C2.83678 5.95034 6.05764 2.72948 10.0308 2.72948C14.0039 2.72948 17.2247 5.95034 17.2247 9.92346C17.2247 13.8966 14.0039 17.1174 10.0308 17.1174C6.05764 17.1174 2.83678 13.8966 2.83678 9.92346Z" fill="#FF4848" />
                        </svg>
                      </button>
                    </div>
                  }



                </div>
              ))

            )
            )
          }


        </div>




      </div>

    </div>
  )
}

export default OutletTimingTable