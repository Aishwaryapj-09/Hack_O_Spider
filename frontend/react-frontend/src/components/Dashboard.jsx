import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'
import Loader from './Loader'
import Badge from './Badge'

// NEW: import the extra widgets
import GlobalImpact from './GlobalImpact'
import DailyChallenge from './DailyChallenge'
import EcoTips from './EcoTips'

export default function Dashboard({ token, user, onUserUpdate, onLogout }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionMsg, setActionMsg] = useState('')

  useEffect(() => {
    loadLeaderboard()
  }, [])

  async function loadLeaderboard() {
    try {
      const list = await api.get('/actions/leaderboard')
      setLeaderboard(list)
    } catch (e) {
      console.error(e)
    }
  }

  async function doAction(type) {
    if (!token) return
    setLoading(true)
    setActionMsg('')
    try {
      const res = await api.post('/actions/complete', { type }, token)
      if (res.user) onUserUpdate(res.user)
      setActionMsg('Action recorded 🎉')
      await loadLeaderboard()
    } catch (e) {
      setActionMsg(e.message || 'Action failed')
    } finally {
      setLoading(false)
      setTimeout(() => setActionMsg(''), 2200)
    }
  }

  return (
    <div>
      {/* --- Top User Info (no avatar) --- */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{user?.name}</div>
          <div className="small">{user?.email}</div>
        </div>

        <div className="userbar" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="user-pill">
            <div className="small">Points</div>
            <div className="points" style={{ marginLeft: 8 }}>
              {user?.points || 0}
            </div>
          </div>
          <button className="btn ghost" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* --- Main Section --- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 20,
          marginTop: 18
        }}
      >
        {/* Actions Card */}
        <div className="card">
          <h3>Actions</h3>
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: 10
            }}
          >
            <button
              className="btn"
              onClick={() => doAction('plant_tree')}
              disabled={loading}
            >
              {loading ? <Loader size={18} /> : 'Plant a Tree (50)'}
            </button>
            <button
              className="btn"
              onClick={() => doAction('reuse_bottle')}
              disabled={loading}
            >
              {loading ? <Loader size={18} /> : 'Reusable Bottle (10)'}
            </button>
            <button
              className="btn"
              onClick={() => doAction('save_electricity')}
              disabled={loading}
            >
              {loading ? <Loader size={18} /> : 'Save Electricity (10)'}
            </button>
            {/* OPEN AR: open in new tab and pass token so ar.html can call backend */}
            <button
              className="btn ghost"
              onClick={() => {
                const url = token ? `/ar.html?token=${encodeURIComponent(token)}` : '/ar.html'
                window.open(url, '_blank')
              }}
            >
              Open AR World
            </button>
          </div>
          {actionMsg && (
            <div style={{ marginTop: 12 }} className="msg">
              {actionMsg}
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div>
          {/* Badges */}
          <div className="card" style={{ marginBottom: 12 }}>
            <h4 style={{ marginBottom: 8 }}>Your Badges</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Badge text="First Tree" />
              <Badge text="Eco Starter" />
              <Badge text="Reuser" />
            </div>
          </div>

          {/* NEW: Global impact card */}
          <GlobalImpact />

          {/* NEW: Daily challenge */}
          <DailyChallenge />

          {/* NEW: Eco tip widget */}
          <EcoTips />

          {/* Leaderboard */}
          <div className="card">
            <h4>Leaderboard</h4>
            <div style={{ marginTop: 8 }}>
              {leaderboard.map((l, idx) => (
                <div key={l._id} className="leader">
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: '#eefaf0',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        color: '#17672b'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{l.name}</div>
                      <div className="small">{l.email || ''}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#1e7a35' }}>
                    {l.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
