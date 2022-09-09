
interface PopupProps {
    isOpen?: boolean,
    children?: React.ReactNode,    
    bgColor?: string,
    handleClose: () => void
}

const contentModalStyle = {    
    overflow: 'auto',
    maxHeight: 'calc(100vh - 125px)'
}

export default function Modal({
    isOpen,    
    children,
    bgColor,
    handleClose
}: PopupProps) {

    const handleWindowClick = (event) => {
        const modal = document.getElementById("stfu-modal");
        if (event.target.id == modal.id) {
            handleClose()
        }
    }
    return (
        <div
            id="stfu-modal"
            aria-hidden="true"
            role="dialog"
            style={{ backgroundColor: '#ffffff20', display: isOpen ? "flex" : "none" }}
            className="modal-fadeIn overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 justify-center items-center h-modal h-full inset-0"
            onClick={(e) => handleWindowClick(e)}
        >
            <div className="px-4 w-full w-auto h-auto mt-8">
                <div className={`p-3 rounded-2xl shadow bg-[#131723] `}>                    
                    {children}
                </div>
            </div>
        </div>
    )
}