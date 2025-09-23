import React, {useEffect} from 'react'

export default function BadgeToast({text, onClose}){
  useEffect(()=> { const t = setTimeout(onClose,2200); return ()=>clearTimeout(t) },[onClose])
  return (
    <div style={{
      position:'fixed', right:20, top:20, background:'#fff', padding:12, borderRadius:8, boxShadow:'0 8px 30px rgba(0,0,0,0.12)'
    }}>
      <strong>🎉 Badge unlocked</strong>
      <div style={{marginTop:6}}>{text}</div>
    </div>
  )
}
