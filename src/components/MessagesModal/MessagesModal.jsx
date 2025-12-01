import { useState, useEffect } from 'react'
import { Modal, Layout, List, Input, Button, Badge, Empty, Tabs, Avatar } from 'antd'
import { SmileOutlined, PictureOutlined, FolderOutlined, CloseOutlined } from '@ant-design/icons'
import './MessagesModal.css'

const { Sider, Content } = Layout

function MessagesModal({ visible, onClose, defaultSecondaryTab }) {
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [activeTab, setActiveTab] = useState('message')
  const [secondaryTab, setSecondaryTab] = useState('all')

  // 联系人列表
  const [contacts, setContacts] = useState([
    // 生产单位A
    {
      id: 1,
      name: '生产单位A',
      subtitle: '(下拉)',
      avatar: 'A',
      avatarColor: '#1890ff',
      type: 'unit',
      unreadCount: 5,
      lastMessage: '李助理: 订单进度更新',
      time: '10:30',
      messages: []
    },
    {
      id: 101,
      name: '李助理',
      subtitle: '生产单位A',
      avatar: '李',
      avatarColor: '#52c41a',
      type: 'assistant',
      parentUnit: 'A',
      unreadCount: 3,
      lastMessage: '订单102511144444301已完成',
      time: '10:30',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: '李助理',
          content: '您好，订单102511144444301已经完成生产，正在安排发货',
          time: '10:30'
        }
      ]
    },
    {
      id: 102,
      name: '王助理',
      subtitle: '生产单位A',
      avatar: '王',
      avatarColor: '#52c41a',
      type: 'assistant',
      parentUnit: 'A',
      unreadCount: 2,
      lastMessage: '设计方案需要确认',
      time: '09:15',
      messages: []
    },
    {
      id: 103,
      name: '张助理',
      subtitle: '生产单位A',
      avatar: '张',
      avatarColor: '#52c41a',
      type: 'assistant',
      parentUnit: 'A',
      unreadCount: 0,
      lastMessage: '材料已备齐',
      time: '昨天',
      messages: []
    },

    // 生产单位B
    {
      id: 2,
      name: '生产单位B',
      subtitle: '(下拉)',
      avatar: 'B',
      avatarColor: '#722ed1',
      type: 'unit',
      unreadCount: 3,
      lastMessage: '陈助理: 质检报告',
      time: '11:20',
      messages: []
    },
    {
      id: 201,
      name: '陈助理',
      subtitle: '生产单位B',
      avatar: '陈',
      avatarColor: '#eb2f96',
      type: 'assistant',
      parentUnit: 'B',
      unreadCount: 2,
      lastMessage: '质检报告已上传',
      time: '11:20',
      messages: []
    },
    {
      id: 202,
      name: '刘助理',
      subtitle: '生产单位B',
      avatar: '刘',
      avatarColor: '#eb2f96',
      type: 'assistant',
      parentUnit: 'B',
      unreadCount: 1,
      lastMessage: '订单排期确认',
      time: '10:45',
      messages: []
    },
    {
      id: 203,
      name: '赵助理',
      subtitle: '生产单位B',
      avatar: '赵',
      avatarColor: '#eb2f96',
      type: 'assistant',
      parentUnit: 'B',
      unreadCount: 0,
      lastMessage: '设备维护通知',
      time: '昨天',
      messages: []
    },

    // 生产单位C
    {
      id: 3,
      name: '生产单位C',
      subtitle: '(下拉)',
      avatar: 'C',
      avatarColor: '#fa8c16',
      type: 'unit',
      unreadCount: 8,
      lastMessage: '孙助理: 紧急订单',
      time: '14:30',
      messages: []
    },
    {
      id: 301,
      name: '孙助理',
      subtitle: '生产单位C',
      avatar: '孙',
      avatarColor: '#faad14',
      type: 'assistant',
      parentUnit: 'C',
      unreadCount: 5,
      lastMessage: '紧急订单需要加急处理',
      time: '14:30',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: '孙助理',
          content: '您好，有一个紧急订单需要加急处理，请确认',
          time: '14:30'
        }
      ]
    },
    {
      id: 302,
      name: '周助理',
      subtitle: '生产单位C',
      avatar: '周',
      avatarColor: '#faad14',
      type: 'assistant',
      parentUnit: 'C',
      unreadCount: 3,
      lastMessage: '3D模型已完成',
      time: '13:50',
      messages: []
    },
    {
      id: 303,
      name: '吴助理',
      subtitle: '生产单位C',
      avatar: '吴',
      avatarColor: '#faad14',
      type: 'assistant',
      parentUnit: 'C',
      unreadCount: 0,
      lastMessage: '打样完成',
      time: '昨天',
      messages: []
    },

    // 生产单位D
    {
      id: 4,
      name: '生产单位D',
      subtitle: '(下拉)',
      avatar: 'D',
      avatarColor: '#13c2c2',
      type: 'unit',
      unreadCount: 2,
      lastMessage: '郑助理: 发货通知',
      time: '昨天',
      messages: []
    },
    {
      id: 401,
      name: '郑助理',
      subtitle: '生产单位D',
      avatar: '郑',
      avatarColor: '#13c2c2',
      type: 'assistant',
      parentUnit: 'D',
      unreadCount: 2,
      lastMessage: '订单已发货，请查收',
      time: '昨天',
      messages: []
    },
    {
      id: 402,
      name: '黄助理',
      subtitle: '生产单位D',
      avatar: '黄',
      avatarColor: '#13c2c2',
      type: 'assistant',
      parentUnit: 'D',
      unreadCount: 0,
      lastMessage: '生产进度正常',
      time: '2天前',
      messages: []
    },
    {
      id: 403,
      name: '钱助理',
      subtitle: '生产单位D',
      avatar: '钱',
      avatarColor: '#13c2c2',
      type: 'assistant',
      parentUnit: 'D',
      unreadCount: 0,
      lastMessage: '质量检测通过',
      time: '2天前',
      messages: []
    },

    // 其他联系人 - 医生、技师
    {
      id: 5,
      name: '订单102511144444301',
      subtitle: 'lee siew ngoh/2280390',
      avatar: '订',
      avatarColor: '#722ed1',
      type: 'order',
      unreadCount: 5,
      lastMessage: '设计方案已上传',
      time: '14:20',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: '医图博约',
          content: 'Dear Director, the customer\'s shape design is ready for your review. Thank you!',
          time: '2025-11-14 13:18:37',
          hasAttachment: true,
          attachmentType: '3D模型',
          attachmentName: '设计方案_102511144444301.stl'
        },
        {
          id: 2,
          sender: 'contact',
          senderName: '医图博约',
          content: '@ [医生] 黄向荣',
          time: '2025-11-14 13:19:40'
        },
        {
          id: 3,
          sender: 'me',
          content: 'Ok, please proceed. :)',
          time: '14:20'
        }
      ]
    },
    {
      id: 6,
      name: '黄向荣医生',
      subtitle: '主治医师',
      avatar: '黄',
      avatarColor: '#1890ff',
      type: 'doctor',
      unreadCount: 3,
      lastMessage: '订单确认无误，可以开始制作',
      time: '13:45',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: '黄向荣医生',
          content: '订单102511144444301的设计方案我已确认，可以开始制作了',
          time: '13:45'
        }
      ]
    },
    {
      id: 7,
      name: '王师傅',
      subtitle: '技师 - 生产单位A',
      avatar: '王',
      avatarColor: '#52c41a',
      type: 'technician',
      unreadCount: 1,
      lastMessage: '订单制作完成，请安排检验',
      time: '11:20',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: '王师傅',
          content: '订单102511144444301已完成制作，请安排质检',
          time: '11:20',
          hasAttachment: true,
          attachmentType: '图片',
          attachmentName: '成品照片.jpg'
        }
      ]
    },
    {
      id: 8,
      name: '李医生',
      subtitle: '副主任医师',
      avatar: '李',
      avatarColor: '#1890ff',
      type: 'doctor',
      unreadCount: 0,
      lastMessage: '患者反馈很满意',
      time: '昨天',
      messages: []
    }
  ])

  // 订单公告列表
  const announcements = [
    {
      id: 1,
      orderId: '102511144444301',
      patientName: 'Lee Siew Ngoh',
      status: 'completed',
      title: '订单已完成',
      time: '2025-11-18 15:30',
      content: '订单102511144444301已完成所有制作流程，已发货。\n\n订单进度：\n✅ 下单：2025-11-14 10:00 - 医生黄向荣\n✅ 接单：2025-11-14 10:30 - 生产单位A\n✅ 设计：2025-11-14 13:18 - 设计师李助理\n✅ 制作：2025-11-15 09:00 - 技师王师傅\n✅ 检验：2025-11-17 14:00 - 质检员张工\n✅ 完成：2025-11-18 15:30 - 已发货',
      publisher: '系统通知'
    },
    {
      id: 2,
      orderId: '102511084444302',
      patientName: 'Zhang Wei',
      status: 'in_production',
      title: '订单制作中',
      time: '2025-11-18 11:20',
      content: '订单102511084444302正在制作中。\n\n订单进度：\n✅ 下单：2025-11-17 14:00 - 医生李医生\n✅ 接单：2025-11-17 14:30 - 生产单位B\n✅ 设计：2025-11-18 09:00 - 设计师陈助理\n🔄 制作：2025-11-18 11:00 - 技师刘师傅 (进行中)\n⏳ 检验：待制作完成\n⏳ 完成：预计2025-11-20',
      publisher: '系统通知'
    },
    {
      id: 3,
      orderId: '102511034444303',
      patientName: 'Liu Ming',
      status: 'design_confirmed',
      title: '设计方案已确认',
      time: '2025-11-18 09:45',
      content: '订单102511034444303设计方案已获得医生确认。\n\n订单进度：\n✅ 下单：2025-11-16 16:00 - 医生王医生\n✅ 接单：2025-11-16 16:30 - 生产单位C\n✅ 设计：2025-11-18 09:00 - 设计师孙助理\n⏳ 制作：待排期\n⏳ 检验：待制作完成\n⏳ 完成：预计2025-11-21',
      publisher: '系统通知'
    }
  ]

  // 群文件列表
  const groupFiles = [
    {
      id: 1,
      name: '2024年度培训计划.pdf',
      size: '2.3 MB',
      uploader: '李主管',
      time: '2024-06-10'
    },
    {
      id: 2,
      name: '设备操作手册.docx',
      size: '1.5 MB',
      uploader: '技术部',
      time: '2024-06-08'
    }
  ]

  useEffect(() => {
    if (visible && contacts.length > 0) {
      setSelectedContact(contacts[0])
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      setSecondaryTab(defaultSecondaryTab || 'all')
    }
  }, [visible, defaultSecondaryTab])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      content: messageInput,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    setContacts(contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          messages: [...(contact.messages || []), newMessage],
          lastMessage: messageInput,
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
      }
      return contact
    }))

    setSelectedContact({
      ...selectedContact,
      messages: [...(selectedContact.messages || []), newMessage]
    })

    setMessageInput('')
  }

  // 根据当前Tab过滤并组织联系人列表
  const getDisplayContacts = () => {
    const matchesSearch = (contact) => contact.name.toLowerCase().includes(searchText.toLowerCase())
    
    if (secondaryTab === 'all') {
      // "消息" Tab: 显示所有非助理和非生产单位的联系人
      return contacts.filter(contact => 
        matchesSearch(contact) && contact.type !== 'unit' && contact.type !== 'assistant'
      )
    } else if (secondaryTab === 'atme') {
      // "我的" Tab: 显示所有助理
      return contacts.filter(contact => 
        contact.type === 'assistant' && matchesSearch(contact)
      )
    } else if (secondaryTab === 'organization') {
      // "组织" Tab: 显示组织结构(生产单位及其下属助理)
      return contacts.filter(contact => 
        matchesSearch(contact) && (contact.type === 'unit' || contact.type === 'assistant')
      )
    }
    
    return []
  }

  const displayContacts = getDisplayContacts()

  // 获取参与对话的成员列表
  const getChatMembers = () => {
    if (!selectedContact) return []
    
    // 从消息记录中提取所有参与者
    const members = new Map()
    
    // 添加当前用户
    members.set('me', {
      id: 'me',
      name: '我',
      role: '诊所管理员',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      avatarColor: '#1890ff'
    })
    
    // 从消息中提取其他成员
    if (selectedContact.messages && selectedContact.messages.length > 0) {
      selectedContact.messages.forEach(msg => {
        if (msg.sender === 'contact' && msg.senderName && !members.has(msg.senderName)) {
          // 根据发送者名称判断角色
          let role = '助理'
          let avatarColor = '#52c41a'
          
          if (msg.senderName.includes('医生')) {
            role = '医生'
            avatarColor = '#1890ff'
          } else if (msg.senderName.includes('师傅')) {
            role = '技师'
            avatarColor = '#fa8c16'
          } else if (msg.senderName.includes('助理')) {
            role = '助理'
            avatarColor = '#52c41a'
          }
          
          members.set(msg.senderName, {
            id: msg.senderName,
            name: msg.senderName,
            role: role,
            avatar: msg.senderName.charAt(0),
            avatarColor: avatarColor
          })
        }
      })
    }
    
    // 添加当前联系人(如果还没添加)
    if (selectedContact && !members.has(selectedContact.name)) {
      let role = '联系人'
      let avatarColor = selectedContact.avatarColor || '#bfbfbf'
      
      if (selectedContact.type === 'doctor') {
        role = '医生'
      } else if (selectedContact.type === 'assistant') {
        role = '助理'
      } else if (selectedContact.type === 'technician') {
        role = '技师'
      } else if (selectedContact.type === 'order') {
        role = '订单'
      }
      
      members.set(selectedContact.name, {
        id: selectedContact.id,
        name: selectedContact.name,
        role: role,
        avatar: selectedContact.avatar || selectedContact.name.charAt(0),
        avatarColor: avatarColor
      })
    }
    
    return Array.from(members.values())
  }

  // 渲染右侧内容
  const renderRightContent = () => {
    if (activeTab === 'announcement') {
      return (
        <div className="announcement-panel">
          <div className="announcement-header">
            <h2>订单公告</h2>
          </div>
          <div className="announcement-list">
            {announcements.map(item => (
              <div key={item.id} className="announcement-item">
                <div className="announcement-item-header">
                  <div className="announcement-title-group">
                    <h3>{item.title}</h3>
                    {item.orderId && (
                      <span className="order-badge">订单: {item.orderId}</span>
                    )}
                  </div>
                  <span className="announcement-time">{item.time}</span>
                </div>
                {item.patientName && (
                  <div className="announcement-patient">
                    患者: {item.patientName}
                  </div>
                )}
                <div className="announcement-content">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'members') {
      const chatMembers = getChatMembers()
      return (
        <div className="members-panel">
          <div className="members-header">
            <h2>群成员</h2>
            <span className="members-count">共 {chatMembers.length} 人</span>
          </div>
          <div className="members-list">
            {chatMembers.map(member => (
              <div key={member.id} className="member-item">
                <div 
                  className="member-avatar" 
                  style={{ 
                    background: member.avatarColor,
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {member.avatar.startsWith('http') ? (
                    <Avatar size={48} src={member.avatar} />
                  ) : (
                    <span style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>
                      {member.avatar}
                    </span>
                  )}
                </div>
                <div className="member-info">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'files') {
      return (
        <div className="files-panel">
          <div className="files-header">
            <h2>群文件</h2>
          </div>
          <div className="files-list">
            {groupFiles.map(file => (
              <div key={file.id} className="file-item">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-meta">
                    {file.size} · {file.uploader} · {file.time}
                  </div>
                </div>
                <Button type="link" size="small">下载</Button>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // 默认显示消息
    return selectedContact ? (
      <div className="chat-area">
        <div className="chat-header-modal">
          <div className="chat-title-modal">
            <span className="chat-name-modal">
              {selectedContact.name}
            </span>
            {selectedContact.subtitle && (
              <span className="chat-subtitle">{selectedContact.subtitle}</span>
            )}
          </div>
        </div>

        <div className="messages-area-modal">
          {selectedContact.messages && selectedContact.messages.length > 0 ? (
            selectedContact.messages.map((msg) => (
              <div key={msg.id} className={`message-item-modal ${msg.sender === 'me' ? 'message-right-modal' : 'message-left-modal'}`}>
                {msg.sender === 'contact' && (
                  <div className="message-avatar-wrapper-modal">
                    <div className="message-avatar-modal" style={{ background: '#52c41a' }}>
                      <span style={{ fontSize: '12px', color: '#fff' }}>
                        {msg.senderName ? msg.senderName.charAt(0) : '微'}
                      </span>
                    </div>
                  </div>
                )}
                <div className="message-content-wrapper-modal">
                  {msg.sender === 'contact' && msg.senderName && (
                    <div className="message-meta-modal">{msg.senderName}</div>
                  )}
                  <div className={`message-bubble-modal ${msg.sender === 'me' ? 'bubble-right-modal' : 'bubble-left-modal'}`}>
                    {msg.content}
                    {msg.hasAttachment && (
                      <div className="message-attachment">
                        <div className="attachment-icon">
                          {msg.attachmentType === '图片' ? '🖼️' : 
                           msg.attachmentType === '3D模型' ? '📦' : '📎'}
                        </div>
                        <div className="attachment-info">
                          <div className="attachment-name">{msg.attachmentName || '附件'}</div>
                          <div className="attachment-type">{msg.attachmentType}</div>
                        </div>
                        <Button type="link" size="small">下载</Button>
                      </div>
                    )}
                  </div>
                  {msg.time && (
                    <div className="message-time-modal">{msg.time}</div>
                  )}
                </div>
                {msg.sender === 'me' && (
                  <div className="message-avatar-wrapper-modal">
                    <Avatar
                      size={40}
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      className="message-avatar-modal"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <Empty description="暂无消息记录" style={{ marginTop: 100 }} />
          )}
        </div>

        <div className="input-area-modal">
          <div className="input-toolbar-modal">
            <Button type="text" icon={<SmileOutlined />} />
            <Button type="text" icon={<PictureOutlined />} />
            <Button type="text" icon={<FolderOutlined />} />
            <Button type="text" icon={<span>@</span>} />
          </div>
          <div className="input-box-modal">
            <Input.TextArea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="输入消息..."
              autoSize={{ minRows: 3, maxRows: 5 }}
              bordered={false}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
          </div>
          <div className="input-actions-modal">
            <Button
              type="primary"
              onClick={handleSendMessage}
              icon={<span>✈️</span>}
            >
              发 送
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <Empty description="请选择一个对话" style={{ marginTop: 200 }} />
    )
  }

  return (
    <Modal
      title={
        <div className="modal-title-wrapper">
          <span className="modal-title-icon">💬</span>
          <span className="modal-title-text">企业通信</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1100}
      className="messages-modal"
      closeIcon={<CloseOutlined />}
      styles={{
        body: { padding: 0, height: '700px' }
      }}
    >
      <Layout style={{ height: '100%', background: '#fff' }}>
        {/* 左侧联系人列表 */}
        <Sider width={280} theme="light" className="contacts-sider-modal">
          <div className="contacts-header-modal">
            <Input
              placeholder="🔍 搜索"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              bordered={false}
              className="search-input-modal"
            />
          </div>

          <Tabs
            activeKey={secondaryTab}
            onChange={setSecondaryTab}
            className="contacts-tabs-modal"
            items={[
              { key: 'all', label: '消息' },
              { key: 'atme', label: '助理' },
              { key: 'organization', label: '组织' }
            ]}
          />

          <List
            className="contacts-list-modal"
            dataSource={displayContacts}
            renderItem={(contact) => {
              const isAssistant = contact.type === 'assistant'
              const isDoctor = contact.type === 'doctor'
              const isTechnician = contact.type === 'technician'
              const isUnit = contact.type === 'unit'
              
              // 所有联系人统一尺寸
              const avatarSize = 40
              const avatarFontSize = 14
              const nameFontSize = 14
              const nameFontWeight = 500
              
              // 助理、医生、技师使用姓名首字作为头像
              const avatarText = (isAssistant || isDoctor || isTechnician) ? contact.name.charAt(0) : contact.avatar
              
              // 判断是否在组织Tab下的助理(需要缩进)
              const isOrganizationAssistant = secondaryTab === 'organization' && isAssistant
              
              return (
                <List.Item
                  className={`contact-item-modal ${selectedContact?.id === contact.id ? 'active' : ''} ${isOrganizationAssistant ? 'organization-assistant' : ''} ${isUnit ? 'organization-unit' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="contact-item-content-modal" style={{ paddingLeft: isOrganizationAssistant ? '32px' : '0' }}>
                    <div 
                      className="contact-avatar-modal" 
                      style={{ 
                        background: contact.avatarColor || '#bfbfbf',
                        width: `${avatarSize}px`,
                        height: `${avatarSize}px`,
                        borderRadius: '6px'
                      }}
                    >
                      <span className="avatar-text-modal" style={{ fontSize: `${avatarFontSize}px` }}>
                        {avatarText}
                      </span>
                    </div>
                    <div className="contact-info-modal">
                      <div className="contact-header-modal">
                        <div className="contact-name-modal" style={{ fontSize: `${nameFontSize}px`, fontWeight: nameFontWeight }}>
                          {contact.name}
                        </div>
                        {/* "消息"Tab显示时间, "助理"Tab显示时间, "组织"Tab生产单位不显示时间 */}
                        {contact.time && !(secondaryTab === 'organization' && isUnit) && (
                          <span className="contact-time-modal">{contact.time}</span>
                        )}
                      </div>
                      {/* "消息"Tab不显示subtitle, "助理"Tab显示subtitle, "组织"Tab助理显示subtitle */}
                      {contact.subtitle && secondaryTab !== 'all' && (
                        <div className="contact-subtitle-info">{contact.subtitle}</div>
                      )}
                      {/* "消息"Tab不显示lastMessage, "助理"和"组织"Tab的助理显示lastMessage */}
                      {contact.lastMessage && secondaryTab !== 'all' && !isUnit && (
                        <div className="contact-message-modal">{contact.lastMessage}</div>
                      )}
                      {/* "组织"Tab不显示红点, "消息"和"助理"Tab显示红点 */}
                      {contact.unreadCount > 0 && secondaryTab !== 'organization' && (
                        <Badge count={contact.unreadCount} className="contact-badge" />
                      )}
                    </div>
                  </div>
                </List.Item>
              )
            }}
          />
        </Sider>

        {/* 中间内容区域 */}
        <Content className="chat-content-modal">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="main-tabs-modal"
            items={[
              {
                key: 'message',
                label: (
                  <span>
                    <span className="tab-icon">💬</span> 消息
                  </span>
                )
              },
              {
                key: 'members',
                label: (
                  <span>
                    <span className="tab-icon">👥</span> 群成员
                  </span>
                )
              },
              {
                key: 'announcement',
                label: (
                  <span>
                    <span className="tab-icon">📢</span> 订单公告
                  </span>
                )
              },
              {
                key: 'files',
                label: (
                  <span>
                    <span className="tab-icon">📁</span> 群文件
                  </span>
                )
              }
            ]}
          />
          {renderRightContent()}
        </Content>
      </Layout>
    </Modal>
  )
}

export default MessagesModal
