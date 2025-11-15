import React, { useState } from 'react'
import { Layout } from 'antd'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Home from '../pages/Home'
import Messages from '../pages/Messages/Messages'
import QuickOrder from '../pages/Order/QuickOrder'
import ProductLibraryOrder from '../pages/Order/ProductLibraryOrder'
import PendingOrder from '../pages/Order/PendingOrder'
import AllOrders from '../pages/OrderManagement/AllOrders'
import PendingOrders from '../pages/OrderManagement/PendingOrders'
import PersonalInfo from '../pages/PersonalCenter/PersonalInfo'
import ClinicManagement from '../pages/SystemManagement/ClinicManagement'
import FactoryManagement from '../pages/SystemManagement/FactoryManagement'
import UnitInfo from '../pages/SystemManagement/UnitInfo'
import PersonnelAuth from '../pages/SystemManagement/PersonnelAuth'
import PatientArchive from '../pages/SystemManagement/PatientArchive'
import './MainLayout.css'

const { Content } = Layout

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="main-layout">
      <Header />
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout className="content-layout">
          <Content className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/order/quick" element={<QuickOrder />} />
              <Route path="/order/product-library" element={<ProductLibraryOrder />} />
              <Route path="/order/pending" element={<PendingOrder />} />
              <Route path="/order-management/all" element={<AllOrders />} />
              <Route path="/order-management/pending" element={<PendingOrders />} />
              <Route path="/personal/info" element={<PersonalInfo />} />
              <Route path="/system/executing-unit" element={<ClinicManagement />} />
              <Route path="/system/factory" element={<FactoryManagement />} />
              <Route path="/system/unit-info" element={<UnitInfo />} />
              <Route path="/system/personnel-auth" element={<PersonnelAuth />} />
              <Route path="/system/patient-archive" element={<PatientArchive />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
