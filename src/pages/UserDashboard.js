import { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import { useNavigate } from 'react-router-dom';
import UserSentSwaps from '../components/UserSentSwaps';
import UserReceivedSwaps from '../components/UserReceivedSwaps';
import MemberAccommodations from '../components/MemberAccommodations';

const UserDashboard = () => {
  const [option, setOption] = useState("/swap/sent");

  return (
    <div className="UserDashboard" >
      <div className="UserDashboard__left">
       <SideMenu setOption={setOption} />
      </div>
      <div className="UserDashboard__right">
        {option === "/swap/sent" ? <UserSentSwaps /> : option === "/swap/received" ? <UserReceivedSwaps /> : option === "/user/accommodations" ? <MemberAccommodations /> : ""}
      </div>
    </div>
  )
}

export default UserDashboard