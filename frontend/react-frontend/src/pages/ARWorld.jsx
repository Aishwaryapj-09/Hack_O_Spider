import React from 'react'

export default function ARWorld(){
  return (
    <div className="card">
      <h3>AR World</h3>
      <p>
        The AR demo is served as a static page at <code>/ar.html</code>. Click the link below to open it in a new tab.
        The AR page uses a Hiro marker. (Put <code>hiro-marker.png</code> in <code>public/</code>.)
      </p>
      <p>
        <a href="/ar.html" target="_blank" rel="noreferrer">
          Open AR World (new tab)
        </a>
      </p>
    </div>
  )
}
