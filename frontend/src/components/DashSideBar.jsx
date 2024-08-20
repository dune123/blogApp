import { Sidebar } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser,HiChartPie } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import './DashSideBar.css';
import { useSelector } from "react-redux";

const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const {currentUser} = useSelector((state)=>state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
        {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"user"}
              labelColor="dark"
              className="cursor-pointer user-icon"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {
            currentUser.isAdmin && (
              <>
                <Link to="/dashboard?tab=users">
                  <Sidebar.Item
                    active={tab==='users'}
                    icon={HiOutlineUserGroup}
                    as='div'
                  >
                    Users
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=comments">
                  <Sidebar.Item
                    active={tab==='comments'}
                    icon={HiAnnotation}
                    as='div'
                  >
                    Comments
                  </Sidebar.Item>
                </Link>
              </>
            )
          }
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === 'posts'}
              icon={HiDocumentText}
              as='div'
            >
            Posts
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
