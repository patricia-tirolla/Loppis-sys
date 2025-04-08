import Popup from "reactjs-popup";
import SellerForm from "./SellerForm"

const SellerActionPopup = ({ mode, triggerText, seller, setSeller, sellerId, setSellerId, onSubmit }) => {
    return (
        <Popup trigger={<button>{triggerText}</button>} modal nested>
            {close => (
                <SellerForm 
                    mode={mode}
                    seller={seller}
                    setSeller={setSeller}
                    sellerId={sellerId}
                    setSellerId={setSellerId}
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                        setSeller && setSeller({ sellerName: '', sellerPhone: '' });
                        setSellerId && setSellerId('');
                        close();
                    }}
                />
            )}
        </Popup>
    )
};

export default SellerActionPopup