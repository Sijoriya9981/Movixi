import { useState } from 'react';
import './style.scss'
const Switchtab = ({ data, ontabchange }) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setleft] = useState(0);
    const activeTab = (tab, index) => {

        setleft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        ontabchange(tab, index);
    }
    return (<>
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        onClick={() => activeTab(tab, index)}
                        key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}>
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left: left }}></span>
            </div>
        </div>
    </>)
}

export default Switchtab;