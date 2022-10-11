import React from "react";
import Styles from "../../pages/styles.module.css"

const Modal = props => {
    if (!props.show) {
        return null
    }

        return (
            <div className={Styles.modal} onClick={props.onClose}>
                <div className={Styles.modalcontent} onClick={e => e.stopPropagation()}>
                    <div className={Styles.modalheader}>
                        <h4 className={Styles.modaltitle}>Filters</h4>
                        <p onClick={props.onClose} className="bg-gray-200 px-1.5 w-4.5 h-4 mt-4 cursor-pointer text-xs rounded-full">x</p>
                    </div>
                    <div className={Styles.modalbody}>
                        <div className={Styles.modalBodyLeft}>
                                <ul>
                                    <li>Sort by <br/> <span className="text-red-500">popularity</span></li>
                                    <li>Cuisines</li>
                                    <li>Ratings</li>
                                    <li>Cost per person</li>
                                    <li>More filters</li>
                                </ul>
                        </div>
                        <div className={Styles.modalBodyRight}>
                                <ul>
                                    <li>Popularity</li>
                                    <li>Ratings:High to Low</li>
                                    <li>Delivery Time</li>
                                    <li>Cost: Low to High</li>
                                    <li>Cost: High to Low</li>
                                </ul>
                        </div>
                    </div>
                    <div className={Styles.modalfooter}>
                        <button onClick={props.onClose} className={Styles.btnClear}>Clear all</button>
                        <button onClick={props.onClose} className={Styles.btnApply}>Apply</button>

                    </div>
                </div>
            </div>
        )
}

export default Modal