import Popup from "reactjs-popup";
import SellerForm from "../SellerForm/SellerForm";
import "./SellerActionPopup.css"

const SellerActionPopup = ({ mode, triggerText, seller, setSeller, sellerId, setSellerId, onSubmit }) => {
    return (
        <Popup trigger={<button className="popup-button">{triggerText}</button>} modal nested>
            {close => (

                <SellerForm 
                    className="popup-content"
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