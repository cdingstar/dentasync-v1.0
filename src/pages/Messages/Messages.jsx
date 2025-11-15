import React, { useState, useEffect } from 'react'
import { Layout, List, Avatar, Badge, Input, Button, Card, Tag, Empty, Tabs } from 'antd'
import { SearchOutlined, SmileOutlined, PictureOutlined, FolderOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import './Messages.css'

const { Sider, Content } = Layout

function Messages() {
  const location = useLocation()
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // 联系人列表
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: '未读消息',
      avatar: '未读',
      avatarColor: '#8c8c8c',
      type: 'unread',
      unreadCount: 99,
      lastMessage: '您有新的未读消息',
      time: '18:41',
      messages: []
    },
    {
      id: 2,
      name: '未读消息',
      avatar: '未读',
      avatarColor: '#8c8c8c',
      type: 'unread',
      unreadCount: 32,
      lastMessage: '您有新的未读消息',
      time: '17:20',
      messages: []
    },
    {
      id: 3,
      name: '医生AI助手',
      avatar: 'AI',
      avatarColor: '#36cfc9',
      type: 'ai',
      unreadCount: 0,
      lastMessage: '我是您的智能助手',
      time: '昨天',
      messages: []
    },
    {
      id: 4,
      name: '102511144444301',
      avatar: 'in',
      avatarColor: '#1890ff',
      type: 'order',
      unreadCount: 0,
      lastMessage: '2025/11-14 0957_35/Mei Ying Lin',
      time: '15:23',
      orderNo: '102511144444301',
      messages: [
        {
          id: 1,
          sender: 'contact',
          senderName: '医图博约',
          content: 'Dear Director, the customer\'s shape design is ready for your review. Thank you!',
          time: '2025-11-14 13:18:37',
          hasAttachment: true,
          attachmentType: '3D模型'
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
          content: 'Ok , please proceed. :M',
          time: '15:23'
        }
      ]
    },
    {
      id: 5,
      name: '韩莎（客服）',
      avatar: '韩',
      avatarColor: '#52c41a',
      type: 'service',
      unreadCount: 5,
      lastMessage: '您的订单已经在生产中',
      time: '14:31',
      messages: []
    },
    {
      id: 6,
      name: '102511084444301',
      avatar: '08',
      avatarColor: '#722ed1',
      type: 'order',
      unreadCount: 0,
      lastMessage: 'lee siew ngoh/ 2280390B',
      time: '14:30',
      messages: []
    },
    {
      id: 7,
      name: '李医生',
      avatar: '李',
      avatarColor: '#1890ff',
      type: 'doctor',
      unreadCount: 0,
      lastMessage: '关于患者病例的讨论',
      time: '昨天',
      messages: []
    },
    {
      id: 8,
      name: '王技师',
      avatar: '王',
      avatarColor: '#fa8c16',
      type: 'technician',
      unreadCount: 0,
      lastMessage: '牙冠制作已完成，请查看',
      time: '昨天',
      messages: []
    },
    {
      id: 9,
      name: '102511034444201',
      avatar: '03',
      avatarColor: '#13c2c2',
      type: 'order',
      unreadCount: 12,
      lastMessage: '订单进度更新通知',
      time: '2天前',
      messages: []
    },
    {
      id: 10,
      name: '张助理',
      avatar: '张',
      avatarColor: '#eb2f96',
      type: 'assistant',
      unreadCount: 0,
      lastMessage: '明天的预约已确认',
      time: '2天前',
      messages: []
    },
    {
      id: 11,
      name: '陈技师',
      avatar: '陈',
      avatarColor: '#722ed1',
      type: 'technician',
      badge: 0,
      lastMessage: '3D扫描文件已上传',
      time: '3天前',
      messages: []
    }
  ])

  // 从路由获取初始选中的联系人
  useEffect(() => {
    if (location.state?.serviceId) {
      const service = location.state.service
      const existingContact = contacts.find(c => c.serviceId === service.id)
      
      if (existingContact) {
        setSelectedContact(existingContact)
      } else {
        const newContact = {
          id: Date.now(),
          serviceId: service.id,
          name: service.name,
          avatar: service.avatar,
          avatarColor: '#52c41a',
          type: 'service',
          badge: 0,
          lastMessage: '',
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          messages: [
            {
              id: 1,
              sender: 'contact',
              senderName: service.name,
              content: `您好，我是${service.name}，很高兴为您服务。我的专长是：${service.expertise}`,
              time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }
        setContacts([newContact, ...contacts])
        setSelectedContact(newContact)
      }
    } else if (contacts.length > 0) {
      const firstContactWithMessages = contacts.find(c => c.messages && c.messages.length > 0)
      if (firstContactWithMessages) {
        setSelectedContact(firstContactWithMessages)
      }
    }
  }, [location.state])

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

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="messages-container-new">
      <Layout style={{ height: 'calc(100vh - 64px - 48px)', background: '#fff' }}>
        {/* 左侧联系人列表 */}
        <Sider width={300} theme="light" className="contacts-sider-new">
          <div className="contacts-header-new">
            <Input
              placeholder="搜索订单或联系人"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              variant="borderless"
              className="search-input-new"
            />
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="contacts-tabs-new"
            items={[
              { key: 'all', label: '所有' },
              { key: 'unread', label: '未读' },
              { key: 'atme', label: '@我' }
            ]}
          />

          <List
            className="contacts-list-new"
            dataSource={filteredContacts}
            renderItem={(contact) => (
              <List.Item
                className={`contact-item-new ${selectedContact?.id === contact.id ? 'active' : ''}`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="contact-item-content">
                  <div 
                    className="contact-avatar-new" 
                    style={{ background: contact.avatarColor || '#bfbfbf' }}
                  >
                    <span className="avatar-text">{contact.avatar}</span>
                  </div>
                  <div className="contact-info-new">
                    <div className="contact-header">
                      <div className="contact-name-new">
                        {contact.name}
                      </div>
                      <div className="contact-time-wrapper">
                        {contact.unreadCount > 0 && <span className="unread-count">{contact.unreadCount}</span>}
                        {contact.time && <span className="contact-time">{contact.time}</span>}
                      </div>
                    </div>
                    <div className="contact-message-new">{contact.lastMessage}</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Sider>

        {/* 右侧聊天区域 */}
        <Content className="chat-content-new">
          {selectedContact ? (
            <>
              <div className="chat-header-new">
                <div className="chat-title-new">
                  <span className="chat-name">
                    {selectedContact.orderNo || selectedContact.name}
                    {selectedContact.type === 'order' && selectedContact.badge > 0 && (
                      <Badge count={selectedContact.badge} style={{ marginLeft: 8 }} />
                    )}
                  </span>
                </div>
                <div className="chat-actions-new">
                  <Button type="text" icon={<span style={{ fontSize: '16px' }}>☰</span>} />
                </div>
              </div>

              <div className="messages-area-new">
                {selectedContact.messages && selectedContact.messages.length > 0 ? (
                  selectedContact.messages.map((msg) => (
                    <div key={msg.id} className={`message-item-new ${msg.sender === 'me' ? 'message-right-new' : 'message-left-new'}`}>
                      {msg.sender === 'contact' && (
                        <div className="message-avatar-wrapper">
                          <div className="message-avatar-new" style={{ background: '#52c41a' }}>
                            <span style={{ fontSize: '12px', color: '#fff' }}>微</span>
                          </div>
                        </div>
                      )}
                      <div className="message-content-wrapper-new">
                        {msg.sender === 'contact' && msg.senderName && (
                          <div className="message-meta">{msg.senderName}</div>
                        )}
                        {msg.hasAttachment && (
                          <div className="message-bubble-new message-attachment-new">
                            <div className="attachment-preview-new">
                              <div className="model-preview-new">3D模型</div>
                              <Button type="link" size="small">下载</Button>
                            </div>
                          </div>
                        )}
                        <div className={`message-bubble-new ${msg.sender === 'me' ? 'bubble-right-new' : 'bubble-left-new'}`}>
                          {msg.content}
                        </div>
                        {msg.time && (
                          <div className="message-time-new">{msg.time}</div>
                        )}
                      </div>
                      {msg.sender === 'me' && (
                        <div className="message-avatar-wrapper">
                          <Avatar 
                            size={40}
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            className="message-avatar-new"
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <Empty description="暂无消息记录" style={{ marginTop: 100 }} />
                )}
              </div>

              <div className="input-area-new">
                <div className="input-toolbar-new">
                  <Button type="text" icon={<SmileOutlined />} />
                  <Button type="text" icon={<PictureOutlined />} />
                  <Button type="text" icon={<FolderOutlined />} />
                </div>
                <div className="input-box-new">
                  <Input.TextArea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder=""
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    variant="borderless"
                    onPressEnter={(e) => {
                      if (e.ctrlKey || e.metaKey) {
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <div className="input-actions-new">
                  <span className="input-hint">使用 Ctrl + Enter 换行</span>
                  <Button 
                    type="primary" 
                    onClick={handleSendMessage}
                  >
                    发 送
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Empty description="请选择一个对话" style={{ marginTop: 200 }} />
          )}
        </Content>

        {/* 右侧信息面板 */}
        {selectedContact && (
          <Sider width={250} theme="light" className="info-panel">
            <div className="info-panel-content">
              <div className="panel-section">
                <h3>订单公告</h3>
                <p className="announcement-text">
                  【公告信息】11-14 22:33:12 订单已经接单，XXX目前在制作中，有问题可以群里联系XXX；<br/>
                  【公告信息】11-11 10:30:53 订单已经由XXX创建，安排到XXX工厂，等待接单中；
                </p>
              </div>
              <div className="panel-section">
                <h3>订单群成员</h3>
                <List
                  className="member-list"
                  dataSource={[
                    { name: '黄向荣', role: '医生', avatar: '黄', color: '#1890ff' },
                    { name: '李医生', role: '医生', avatar: '李', color: '#722ed1' },
                    { name: '王技师', role: '技师', avatar: '王', color: '#fa8c16' },
                    { name: '张技师', role: '技师', avatar: '张', color: '#52c41a' },
                    { name: '韩莎', role: '客服', avatar: '韩', color: '#eb2f96' },
                    { name: '刘助理', role: '助理', avatar: '刘', color: '#13c2c2' },
                    { name: '陈助理', role: '助理', avatar: '陈', color: '#fa541c' },
                    { name: '我', role: '医生', avatar: '我', color: '#2f54eb' }
                  ]}
                  renderItem={(member) => (
                    <List.Item className="member-item">
                      <div className="member-avatar" style={{ background: member.color }}>
                        {member.avatar}
                      </div>
                      <div className="member-info">
                        <span className="member-name">{member.name}</span>
                        {member.role && <Tag color="red" className="member-role">{member.role}</Tag>}
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Sider>
        )}
      </Layout>
    </div>
  )
}

export default Messages

