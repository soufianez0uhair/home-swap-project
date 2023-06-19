import React from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {HiOutlineInboxArrowDown, HiOutlineInboxIn} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import {BsHouses} from 'react-icons/bs';

function SideMenu({setOption}) {
  const navigate = useNavigate();
    return (
      <>
        <Navigation
            activeItemId="/swap/sent"
            onSelect={({itemId}) => {
              setOption(itemId);
            }}
            items={[
              {
                title: 'Demandes de swap',
                itemId: '/dashboard',
                elemBefore: () => <HiOutlineInboxIn className="SideMenu__icon" />,
                subNav: [
                  {
                    title: 'envoyées',
                    itemId: '/swap/sent',
          
                  },
                  {
                    title: 'reçus',
                    itemId: '/swap/received',
                    
                  },
                ],
              },
              {
                title: 'Gestion des biens',
                itemId: '/user/accommodations',
                elemBefore: () => <BsHouses className="SideMenu__icon" />,
              },
            ]}
          />
      </>
    );
}

export default SideMenu;