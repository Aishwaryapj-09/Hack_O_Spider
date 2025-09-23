import React, { useState } from 'react'
import { api } from '../utils/api'
import Loader from './Loader'

export default function Auth({ onLogin }){
  const [reg, setReg] = useState({name:'', email:'', password:''})
  const [log, setLog] = useState({email:'', password:''})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function register(){
    if(!reg.name || !reg.email || !reg.password){ setMsg('Please fill all fields'); return }
    setLoading(true); setMsg('')
    try {
      const res = await api.post('/auth/register', reg)
      onLogin(res.token, res.user)
    } catch (e) { setMsg(e.message || 'Register failed') }
    setLoading(false)
  }

  async function login(){
    if(!log.email || !log.password){ setMsg('Enter email & password'); return }
    setLoading(true); setMsg('')
    try {
      const res = await api.post('/auth/login', log)
      onLogin(res.token, res.user)
    } catch (e) { setMsg(e.message || 'Login failed') }
    setLoading(false)
  }

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 360px'}}>
      <div className="card">
        <h3>Create account</h3>
        <div style={{marginTop:10}}>
          <input className="input" placeholder="Your name" value={reg.name} onChange={e=>setReg({...reg,name:e.target.value})}/>
          <input className="input" placeholder="Email" value={reg.email} onChange={e=>setReg({...reg,email:e.target.value})}/>
          <input className="input" type="password" placeholder="Password" value={reg.password} onChange={e=>setReg({...reg,password:e.target.value})}/>
          <div style={{marginTop:10, display:'flex', gap:8}}>
            <button className="btn" onClick={register} disabled={loading}>{loading ? <Loader size={20}/> : 'Register'}</button>
            <button className="btn ghost" onClick={()=>{ setReg({name:'',email:'',password:''}); setMsg('') }}>Clear</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Welcome back</h3>
        <div style={{marginTop:10}}>
          <input className="input" placeholder="Email" value={log.email} onChange={e=>setLog({...log,email:e.target.value})}/>
          <input className="input" type="password" placeholder="Password" value={log.password} onChange={e=>setLog({...log,password:e.target.value})}/>
          <div style={{marginTop:10}}>
            <button className="btn" onClick={login} disabled={loading}>{loading ? <Loader size={20}/> : 'Login'}</button>
          </div>
        </div>
      </div>

      {msg && <div style={{gridColumn:'1 / -1', marginTop:12}} className="msg">{msg}</div>}
    </div>
  )
}
