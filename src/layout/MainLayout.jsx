import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import NaviBar from './NaviBar'
import Home from '../pages/Home'
import QuickOrder from '../pages/Order/QuickOrder'
import ProductLibraryOrder from '../pages/Order/ProductLibraryOrder'
import PendingOrder from '../pages/Order/PendingOrder'
import AllOrders from '../pages/OrderManagement/AllOrders'
import OrderDetail from '../pages/OrderManagement/OrderDetail'
import PendingOrders from '../pages/OrderManagement/PendingOrders'
import PersonnelAuth from '../pages/InfoSetting/PersonnelAuth'
import PatientArchive from '../pages/InfoSetting/PatientArchive'
import UnitInfo from '../pages/InfoSetting/UnitInfo'
import AddressManagement from '../pages/InfoSetting/AddressManagement'
import ClinicManagement from '../pages/SystemManagement/ClinicManagement'
import FactoryManagement from '../pages/SystemManagement/FactoryManagement'
import MessagesModal from '../components/MessagesModal/MessagesModal'
import './MainLayout.css'

function MainLayout({ currentUser, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false)

  const handleOpenMessages = () => {
    setIsMessagesModalVisible(true)
  }

  return (
    <div className="main-layout" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentUser={currentUser} 
        onLogout={onLogout}
        onOpenMessages={handleOpenMessages}
      />
      <div style={{ display: 'flex', height: 'calc(100vh - 50px)', overflow: 'hidden' }}>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <div className="content-layout" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <NaviBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home onOpenMessages={handleOpenMessages} />} />
              <Route path="/order/quick" element={<QuickOrder />} />
              <Route path="/order/product-library" element={<ProductLibraryOrder />} />
              <Route path="/order/pending" element={<PendingOrder />} />
              <Route path="/order-management/all" element={<AllOrders />} />
              <Route path="/order-management/detail/:orderNo" element={<OrderDetail />} />
              <Route path="/order-management/pending" element={<PendingOrders />} />
              <Route path="/personal/personnel-auth" element={<PersonnelAuth />} />
              <Route path="/personal/patient-archive" element={<PatientArchive />} />
              <Route path="/personal/unit-info" element={<UnitInfo />} />
              <Route path="/personal/address-management" element={<AddressManagement />} />
              <Route path="/system/executing-unit" element={<ClinicManagement />} />
              <Route path="/system/factory" element={<FactoryManagement />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* 消息对话框 */}
      <MessagesModal
        visible={isMessagesModalVisible}
        onClose={() => setIsMessagesModalVisible(false)}
      />
    </div>
  )
}

export default MainLayout
