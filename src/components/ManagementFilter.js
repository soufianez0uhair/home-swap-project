import React from 'react'

const ManagementFilter = ({options, setOption}) => {
  return (
    <select onChange={(e) => setOption(e.target.value)} class="form-select form-select-md mb-3" >
      {
        options.map(option => <option value={option}>{option}</option> )
      }
    </select>
  )
}

export default ManagementFilter