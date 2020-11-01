import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingScreen() {
    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>
            <LoadingOutlined />
        </div>
    )
}
