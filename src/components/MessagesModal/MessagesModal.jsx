import { useState, useEffect, useCallback } from 'react'
import { Modal, Layout, List, Input, Button, Badge, Empty, Tabs, Avatar } from 'antd'
import { SmileOutlined, PictureOutlined, FolderOutlined, CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './MessagesModal.css'

const { Sider, Content } = Layout

function MessagesModal({ visible, onClose, defaultSecondaryTab }) {
  const { t, i18n } = useTranslation()
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [activeTab, setActiveTab] = useState('message')
  const [secondaryTab, setSecondaryTab] = useState('all')

  const getMockContacts = useCallback((t) => [
    {
      id: 1,
      name: t('messages.mock.unitA'),
      subtitle: t('common.dropdown'),
      avatar: 'A',
      avatarColor: '#1890ff',
      type: 'unit',
      unreadCount: 5,
      lastMessage: `${t('messages.mock.assistantLi')}: ${t('messages.mock.msgUpdate')}`,
      time: '10:30',
      messages: []
    },
    {
      id: 101,
      name: t('messages.mock.assistantLi'),
      subtitle: t('messages.mock.unitA'),
      avatar: t('messages.mock.assistantLi').charAt(0),
      avatarColor: '#52c41a',
      type: 'assistant',
      parentUnit: 'A',
      unreadCount: 3,
      lastMessage: t('messages.mock.msgDone'),
      time: '10:30',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: t('messages.mock.assistantLi'),
          senderRole: 'assistant',
          content: t('messages.mock.msgContentUpdate'),
          time: '10:30'
        }
      ]
    },
    {
      id: 102,
      name: t('messages.mock.assistantWang'),
      subtitle: t('messages.mock.unitA'),
      avatar: t('messages.mock.assistantWang').charAt(0),
      avatarColor: '#52c41a',
      type: 'assistant',
      parentUnit: 'A',
      unreadCount: 2,
      lastMessage: t('messages.mock.msgDesign'),
      time: '09:15',
      messages: []
    },
    {
      id: 103,
      name: t('messages.mock.assistantZhang'),
      subtitle: t('messages.mock.unitA'),
      avatar: t('messages.mock.assistantZhang').charAt(0),
      avatarColor: '#52c41a',
      type: 'assistant',
      parentUnit: 'A',
      unreadCount: 0,
      lastMessage: t('messages.mock.msgMaterial'),
      time: t('common.time.yesterday'),
      messages: []
    },

    {
      id: 2,
      name: t('messages.mock.unitB'),
      subtitle: t('common.dropdown'),
      avatar: 'B',
      avatarColor: '#722ed1',
      type: 'unit',
      unreadCount: 3,
      lastMessage: `${t('messages.mock.assistantChen')}: ${t('messages.mock.msgQuality')}`,
      time: '11:20',
      messages: []
    },
    {
      id: 201,
      name: t('messages.mock.assistantChen'),
      subtitle: t('messages.mock.unitB'),
      avatar: t('messages.mock.assistantChen').charAt(0),
      avatarColor: '#eb2f96',
      type: 'assistant',
      parentUnit: 'B',
      unreadCount: 2,
      lastMessage: t('messages.mock.msgQuality'), // Simplified
      time: '11:20',
      messages: []
    },
    {
      id: 202,
      name: t('messages.mock.assistantLiu'),
      subtitle: t('messages.mock.unitB'),
      avatar: t('messages.mock.assistantLiu').charAt(0),
      avatarColor: '#eb2f96',
      type: 'assistant',
      parentUnit: 'B',
      unreadCount: 1,
      lastMessage: t('messages.mock.msgSchedule'),
      time: '10:45',
      messages: []
    },
    {
      id: 203,
      name: t('messages.mock.assistantZhao'),
      subtitle: t('messages.mock.unitB'),
      avatar: t('messages.mock.assistantZhao').charAt(0),
      avatarColor: '#eb2f96',
      type: 'assistant',
      parentUnit: 'B',
      unreadCount: 0,
      lastMessage: t('messages.mock.msgMaintain'),
      time: t('common.time.yesterday'),
      messages: []
    },

    {
      id: 3,
      name: t('messages.mock.unitC'),
      subtitle: t('common.dropdown'),
      avatar: 'C',
      avatarColor: '#fa8c16',
      type: 'unit',
      unreadCount: 8,
      lastMessage: `${t('messages.mock.assistantSun')}: ${t('messages.mock.msgUrgent')}`,
      time: '14:30',
      messages: []
    },
    {
      id: 301,
      name: t('messages.mock.assistantSun'),
      subtitle: t('messages.mock.unitC'),
      avatar: t('messages.mock.assistantSun').charAt(0),
      avatarColor: '#faad14',
      type: 'assistant',
      parentUnit: 'C',
      unreadCount: 5,
      lastMessage: t('messages.mock.msgUrgent'),
      time: '14:30',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: t('messages.mock.assistantSun'),
          senderRole: 'assistant',
          content: t('messages.mock.msgContentUrgent'),
          time: '14:30'
        }
      ]
    },
    {
      id: 302,
      name: t('messages.mock.assistantZhou'),
      subtitle: t('messages.mock.unitC'),
      avatar: t('messages.mock.assistantZhou').charAt(0),
      avatarColor: '#faad14',
      type: 'assistant',
      parentUnit: 'C',
      unreadCount: 3,
      lastMessage: t('messages.mock.msg3D'),
      time: '13:50',
      messages: []
    },
    {
      id: 303,
      name: t('messages.mock.assistantWu'),
      subtitle: t('messages.mock.unitC'),
      avatar: t('messages.mock.assistantWu').charAt(0),
      avatarColor: '#faad14',
      type: 'assistant',
      parentUnit: 'C',
      unreadCount: 0,
      lastMessage: t('messages.mock.msgSample'),
      time: t('common.time.yesterday'),
      messages: []
    },

    {
      id: 4,
      name: t('messages.mock.unitD'),
      subtitle: t('common.dropdown'),
      avatar: 'D',
      avatarColor: '#13c2c2',
      type: 'unit',
      unreadCount: 2,
      lastMessage: `${t('messages.mock.assistantZheng')}: ${t('messages.mock.msgDelivery')}`,
      time: t('common.time.yesterday'),
      messages: []
    },
    {
      id: 401,
      name: t('messages.mock.assistantZheng'),
      subtitle: t('messages.mock.unitD'),
      avatar: t('messages.mock.assistantZheng').charAt(0),
      avatarColor: '#13c2c2',
      type: 'assistant',
      parentUnit: 'D',
      unreadCount: 2,
      lastMessage: t('messages.mock.msgDeliveryContent'),
      time: t('common.time.yesterday'),
      messages: []
    },
    {
      id: 402,
      name: t('messages.mock.assistantHuang'),
      subtitle: t('messages.mock.unitD'),
      avatar: t('messages.mock.assistantHuang').charAt(0),
      avatarColor: '#13c2c2',
      type: 'assistant',
      parentUnit: 'D',
      unreadCount: 0,
      lastMessage: t('messages.mock.msgProduction'),
      time: t('common.time.daysAgo', { count: 2 }),
      messages: []
    },
    {
      id: 403,
      name: t('messages.mock.assistantQian'),
      subtitle: t('messages.mock.unitD'),
      avatar: t('messages.mock.assistantQian').charAt(0),
      avatarColor: '#13c2c2',
      type: 'assistant',
      parentUnit: 'D',
      unreadCount: 0,
      lastMessage: t('messages.mock.msgQualityPass'),
      time: t('common.time.daysAgo', { count: 2 }),
      messages: []
    },

    {
      id: 5,
      name: `${t('messages.roles.order')} 102511144444301`,
      subtitle: 'lee siew ngoh/2280390',
      avatar: t('messages.mock.orderAvatar'),
      avatarColor: '#722ed1',
      type: 'order',
      unreadCount: 5,
      lastMessage: t('messages.mock.msgDesignUploaded'),
      time: '14:20',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: t('messages.mock.senderNameYitu'),
          senderRole: 'contact',
          content: t('messages.mock.msgDesignReview'),
          time: '2025-11-14 13:18:37',
          hasAttachment: true,
          attachmentType: t('messages.attachment.model'),
          attachmentName: `${t('messages.attachment.designScheme')}_102511144444301.stl`
        },
        {
          id: 2,
          sender: 'contact',
          senderName: t('messages.mock.senderNameYitu'),
          senderRole: 'contact',
          content: `@ [${t('messages.roles.doctor')}] ${t('messages.mock.doctorHuang')}`,
          time: '2025-11-14 13:19:40'
        },
        {
          id: 3,
          sender: 'me',
          content: t('messages.mock.msgProceed'),
          time: '14:20'
        }
      ]
    },
    {
      id: 6,
      name: t('messages.mock.doctorHuang'),
      subtitle: t('messages.mock.subtitleDoctor'),
      avatar: t('messages.mock.doctorHuang').charAt(0),
      avatarColor: '#1890ff',
      type: 'doctor',
      unreadCount: 3,
      lastMessage: t('messages.mock.msgConfirm'),
      time: '13:45',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: t('messages.mock.doctorHuang'),
          senderRole: 'doctor',
          content: t('messages.mock.msgConfirmContent'),
          time: '13:45'
        }
      ]
    },
    {
      id: 7,
      name: t('messages.mock.technicianWang'),
      subtitle: t('messages.mock.subtitleTechnician'),
      avatar: t('messages.mock.technicianWang').charAt(0),
      avatarColor: '#52c41a',
      type: 'technician',
      unreadCount: 1,
      lastMessage: t('messages.mock.msgDoneTech'),
      time: '11:20',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: t('messages.mock.technicianWang'),
          senderRole: 'technician',
          content: t('messages.mock.msgDoneTechContent'),
          time: '11:20',
          hasAttachment: true,
          attachmentType: t('messages.attachment.image'),
          attachmentName: t('messages.mock.finishedPhoto')
        }
      ]
    },
    {
      id: 8,
      name: t('messages.mock.doctorLi'),
      subtitle: t('messages.mock.subtitleDoctor2'),
      avatar: t('messages.mock.doctorLi').charAt(0),
      avatarColor: '#1890ff',
      type: 'doctor',
      unreadCount: 0,
      lastMessage: t('messages.mock.msgFeedback'),
      time: t('common.time.yesterday'),
      messages: []
    }
  ], [t])

  const getMockAnnouncements = useCallback((t) => [
    {
      id: 1,
      orderId: '102511144444301',
      patientName: 'Lee Siew Ngoh',
      status: 'completed',
      title: t('messages.mock.announcement.completed'),
      time: '2025-11-18 15:30',
      content: t('messages.mock.announcement.contentCompleted', { orderId: '102511144444301' }),
      publisher: t('messages.systemNotification')
    },
    {
      id: 2,
      orderId: '102511084444302',
      patientName: 'Zhang Wei',
      status: 'in_production',
      title: t('messages.mock.announcement.inProduction'),
      time: '2025-11-18 11:20',
      content: t('messages.mock.announcement.contentInProduction', { orderId: '102511084444302' }),
      publisher: t('messages.systemNotification')
    },
    {
      id: 3,
      orderId: '102511034444303',
      patientName: 'Liu Ming',
      status: 'design_confirmed',
      title: t('messages.mock.announcement.designConfirmed'),
      time: '2025-11-18 09:45',
      content: t('messages.mock.announcement.contentDesignConfirmed', { orderId: '102511034444303' }),
      publisher: t('messages.systemNotification')
    }
  ], [t])

  const getMockFiles = useCallback((t) => [
    {
      id: 1,
      name: t('messages.mock.files.training'),
      size: '2.3 MB',
      uploader: t('messages.mock.files.uploaderLi'),
      time: '2024-06-10'
    },
    {
      id: 2,
      name: t('messages.mock.files.manual'),
      size: '1.5 MB',
      uploader: t('messages.mock.files.uploaderTech'),
      time: '2024-06-08'
    }
  ], [t])

  const [contacts, setContacts] = useState(() => getMockContacts(t))
  const [announcements, setAnnouncements] = useState(() => getMockAnnouncements(t))
  const [groupFiles, setGroupFiles] = useState(() => getMockFiles(t))

  useEffect(() => {
    // Default show messages
    if (visible && contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0])
    }
  }, [visible])

  useEffect(() => {
    setContacts(getMockContacts(t))
    setAnnouncements(getMockAnnouncements(t))
    setGroupFiles(getMockFiles(t))
  }, [i18n.language, t, getMockContacts, getMockAnnouncements, getMockFiles])

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
      time: new Date().toLocaleTimeString(i18n.language === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setContacts(contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          messages: [...(contact.messages || []), newMessage],
          lastMessage: messageInput,
          time: new Date().toLocaleTimeString(i18n.language === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })
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

  // Filter and organize contact list based on current Tab
  const getDisplayContacts = () => {
    const matchesSearch = (contact) => contact.name.toLowerCase().includes(searchText.toLowerCase())
    
    if (secondaryTab === 'all') {
      // "Messages" Tab: Show all contacts except assistants and production units
      return contacts.filter(contact => 
        matchesSearch(contact) && contact.type !== 'unit' && contact.type !== 'assistant'
      )
    } else if (secondaryTab === 'atme') {
      // "Me" Tab: Show all assistants
      return contacts.filter(contact => 
        contact.type === 'assistant' && matchesSearch(contact)
      )
    } else if (secondaryTab === 'organization') {
      // "Organization" Tab: Show organization structure (production units and their assistants)
      return contacts.filter(contact => 
        matchesSearch(contact) && (contact.type === 'unit' || contact.type === 'assistant')
      )
    }
    
    return []
  }

  const displayContacts = getDisplayContacts()

  // Get list of members participating in the chat
  const getChatMembers = () => {
    if (!selectedContact) return []
    
    // Extract all participants from message history
    const members = new Map()
    
    // Add current user
    members.set('me', {
      id: 'me',
      name: t('messages.me'),
      role: t('messages.roles.clinicAdmin'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      avatarColor: '#1890ff'
    })
    
    // Extract other members from messages
    if (selectedContact.messages && selectedContact.messages.length > 0) {
      selectedContact.messages.forEach(msg => {
        if (msg.sender === 'contact' && msg.senderName && !members.has(msg.senderName)) {
          // Determine based on sender role
          let role = t('messages.roles.assistant')
          let avatarColor = '#52c41a'
          
          if (msg.senderRole) {
             if (msg.senderRole === 'doctor') {
                role = t('messages.roles.doctor')
                avatarColor = '#1890ff'
             } else if (msg.senderRole === 'technician') {
                role = t('messages.roles.technician')
                avatarColor = '#fa8c16'
             } else if (msg.senderRole === 'assistant') {
                role = t('messages.roles.assistant')
                avatarColor = '#52c41a'
             }
          } else {
              // Fallback logic
              if (msg.senderName.includes(t('messages.keywords.doctor')) || msg.senderName.includes('Dr.') || msg.senderName.includes('Doctor')) {
                role = t('messages.roles.doctor')
                avatarColor = '#1890ff'
              } else if (msg.senderName.includes(t('messages.keywords.master')) || msg.senderName.includes('Master')) {
                role = t('messages.roles.technician')
                avatarColor = '#fa8c16'
              }
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
    
    // Add current contact (if not already added)
    if (selectedContact && !members.has(selectedContact.name)) {
      let role = t('messages.roles.contact')
      let avatarColor = selectedContact.avatarColor || '#bfbfbf'
      
      if (selectedContact.type === 'doctor') {
        role = t('messages.roles.doctor')
      } else if (selectedContact.type === 'assistant') {
        role = t('messages.roles.assistant')
      } else if (selectedContact.type === 'technician') {
        role = t('messages.roles.technician')
      } else if (selectedContact.type === 'order') {
        role = t('messages.roles.order')
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

  // Render right side content
  const renderRightContent = () => {
    if (activeTab === 'announcement') {
      return (
        <div className="announcement-panel">
          <div className="announcement-header">
            <h2>{t('messages.tabs.announcement')}</h2>
          </div>
          <div className="announcement-list">
            {announcements.map(item => (
              <div key={item.id} className="announcement-item">
                <div className="announcement-item-header">
                  <div className="announcement-title-group">
                    <h3>{item.title}</h3>
                    {item.orderId && (
                      <span className="order-badge">{t('messages.labels.order')}: {item.orderId}</span>
                    )}
                  </div>
                  <span className="announcement-time">{item.time}</span>
                </div>
                {item.patientName && (
                  <div className="announcement-patient">
                    {t('messages.labels.patient')}: {item.patientName}
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
            <h2>{t('messages.tabs.members')}</h2>
            <span className="members-count">{t('messages.memberCount', { count: chatMembers.length })}</span>
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
            <h2>{t('messages.tabs.files')}</h2>
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
                <Button type="link" size="small">{t('messages.download')}</Button>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Default show messages
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
                        {msg.senderName ? msg.senderName.charAt(0) : 'U'}
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
                          {msg.attachmentType === t('messages.attachment.image') ? '🖼️' : 
                           msg.attachmentType === t('messages.attachment.model') ? '📦' : '📎'}
                        </div>
                        <div className="attachment-info">
                          <div className="attachment-name">{msg.attachmentName || t('messages.attachment.file')}</div>
                          <div className="attachment-type">{msg.attachmentType}</div>
                        </div>
                        <Button type="link" size="small">{t('messages.download')}</Button>
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
            <Empty description={t('messages.noMessages')} style={{ marginTop: 100 }} />
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
              placeholder={t('messages.placeholder')}
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
              {t('messages.send')}
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <Empty description={t('messages.selectChat')} style={{ marginTop: 200 }} />
    )
  }

  return (
    <Modal
      title={
        <div className="modal-title-wrapper">
          <span className="modal-title-icon">💬</span>
          <span className="modal-title-text">{t('messages.title')}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      bodyStyle={{ padding: 0, height: '600px' }}
      className="messages-modal"
      centered
    >
      <Layout style={{ height: '100%', background: '#fff' }}>
        <Sider width={280} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
          <div className="search-box-modal">
            <Input.Search 
              placeholder={t('messages.search')} 
              allowClear 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            className="messages-tabs-modal"
            items={[
              { key: 'message', label: t('messages.tabs.message') },
              { key: 'announcement', label: t('messages.tabs.announcement') },
              { key: 'files', label: t('messages.tabs.files') }
            ]}
          />

          {activeTab === 'message' && (
            <>
              <div className="secondary-tabs-modal">
                <div 
                  className={`secondary-tab-item ${secondaryTab === 'all' ? 'active' : ''}`}
                  onClick={() => setSecondaryTab('all')}
                >
                  {t('messages.tabs.message')}
                </div>
                <div 
                  className={`secondary-tab-item ${secondaryTab === 'atme' ? 'active' : ''}`}
                  onClick={() => setSecondaryTab('atme')}
                >
                  {t('messages.tabs.assistant')}
                </div>
                <div 
                  className={`secondary-tab-item ${secondaryTab === 'organization' ? 'active' : ''}`}
                  onClick={() => setSecondaryTab('organization')}
                >
                  {t('messages.tabs.organization')}
                </div>
              </div>

              <List
                className="contact-list-modal"
                dataSource={displayContacts}
                renderItem={item => (
                  <List.Item 
                    className={`contact-item-modal ${selectedContact?.id === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedContact(item)
                      // If in "Message" Tab, no need to switch right view, as it defaults to chat
                      // If in "Members" or "Files" Tab, might need to switch back?
                      // Temporarily keep activeTab unchanged, only change selectedContact
                    }}
                  >
                    <div className="contact-avatar-wrapper">
                      <div 
                        className="contact-avatar-modal" 
                        style={{ background: item.avatarColor }}
                      >
                        {item.avatar.startsWith('http') ? (
                          <Avatar src={item.avatar} />
                        ) : (
                          <span>{item.avatar}</span>
                        )}
                      </div>
                      {item.unreadCount > 0 && (
                        <Badge count={item.unreadCount} className="unread-badge-modal" />
                      )}
                    </div>
                    <div className="contact-info-modal">
                      <div className="contact-top-modal">
                        <span className="contact-name-modal">{item.name}</span>
                        <span className="contact-time-modal">{item.time}</span>
                      </div>
                      <div className="contact-bottom-modal">
                        <span className="contact-message-modal">{item.lastMessage}</span>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </>
          )}
          
          {activeTab !== 'message' && (
             <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
               {activeTab === 'announcement' ? t('messages.tabs.announcement') : t('messages.tabs.files')}
             </div>
          )}
        </Sider>
        
        <Content style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Right Header Tabs */}
          {selectedContact && activeTab === 'message' && (
            <div className="chat-right-header-tabs">
               <div 
                 className={`right-tab-item ${activeTab === 'message' ? 'active' : ''}`}
                 onClick={() => setActiveTab('message')}
               >
                 {t('messages.tabs.message')}
               </div>
               <div 
                 className={`right-tab-item ${activeTab === 'members' ? 'active' : ''}`}
                 onClick={() => setActiveTab('members')}
               >
                 {t('messages.tabs.members')}
               </div>
               <div 
                 className={`right-tab-item ${activeTab === 'files' ? 'active' : ''}`}
                 onClick={() => setActiveTab('files')}
               >
                 {t('messages.tabs.files')}
               </div>
            </div>
          )}
          
          {renderRightContent()}
        </Content>
      </Layout>
    </Modal>
  )
}

export default MessagesModal
