const Options = ({ isSRChecked, setIsSRChecked }) => {
    const handleSRCheckboxChange = () => {
        setIsSRChecked(!isSRChecked)
    }

    return (
        <div className="grid grid-cols-5 gap-1 px-0.5 w-full min-h-32">
            <div className="w-full"></div>
            <div className="col-span-3 w-full py-10">
                <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                    <input type='checkbox' name='autoSaver' className='sr-only' checked={isSRChecked}
                           onChange={handleSRCheckboxChange}/>
                    <span
                        className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${isSRChecked ? 'bg-blue-600' : 'bg-[#CCCCCE]'}`}>
                        <span
                            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${isSRChecked ? 'translate-x-6' : ''}`}></span>
                    </span>
                    <span className='label flex items-center text-sm font-medium text-black'>
                        <span className='pl-1'> {isSRChecked ? 'Show' : 'Hide'} Read Messages</span>
                    </span>
                </label>
            </div>
            <div className="w-full"></div>
        </div>
    );
};

export default Options;