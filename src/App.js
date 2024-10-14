import { ListBulletIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import './App.css';
import MessageList from './popup/popup';
import Options from './options/options';

function App() {
    const [isSRChecked, setIsSRChecked] = useState(true);

    const [ btnM, setBtnM ] = useState('btn-clicked');
    const [ btnO, setBtnO ] = useState('btn');
    const [ btnClicked, setBtnClicked ] = useState(1);

    const handleClickM = () => {
        if (btnM !== 'btn-clicked') {
            setBtnM('btn-clicked')
            setBtnO('btn');
            setBtnClicked(1);
        }
    };

    const handleClickO = () => {
        if (btnO !== 'btn-clicked') {
            setBtnM('btn')
            setBtnO('btn-clicked');
            setBtnClicked(2);
        }
    };

    return (
    <>
        <div className="container w-96 px-1">
            <div className="grid grid-cols-2 gap-1 py-5 justify-items-center">
                <div className="...">
                  <span className="sm:ml-3">
                    <button type="button" className={btnM} onClick={handleClickM}>
                        <ListBulletIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"/>
                        Messages
                    </button>
                  </span>
                </div>
                <div className="...">
                  <span className="sm:ml-3">
                    <button type="button" className={btnO} onClick={handleClickO}>
                        <AdjustmentsHorizontalIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5"/>
                        Options
                    </button>
                  </span>
                </div>
            </div>
            <div className={`overflow-y-auto ${btnClicked === 1 ? '' : 'hidden'} max-h-full`}>
                <MessageList isSRChecked={isSRChecked} />
            </div>
            <div className={`overflow-y-auto ${btnClicked === 2 ? '' : 'hidden'} max-h-full`}>
                <Options isSRChecked={isSRChecked} setIsSRChecked={setIsSRChecked} />
            </div>
        </div>
    </>
  );
}

export default App;
