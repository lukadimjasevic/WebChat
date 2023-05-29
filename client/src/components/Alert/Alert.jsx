import React from "react";
import "./Alert.css";
import { BsCheckCircleFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

const Alert = ({ children, type = "success", onClose }) => {
    let AlertIcon, alertColor;
    switch (type) {
        case "success":
            alertColor = "#83AE35";
            AlertIcon = BsCheckCircleFill;
            break;
        case "info":
            alertColor = "#67AAEC";
            AlertIcon = AiFillInfoCircle;
            break;
        case "danger":
            alertColor = "#CA0B00";
            AlertIcon = BsFillExclamationTriangleFill;
            break;
    }

    return (
        <div
            className="alert-main"
            style={{ border: `2px solid ${alertColor}`, borderLeft: `5px solid ${alertColor}` }}
        >
            <AlertIcon color={alertColor} size={25} />
            <span>{children}</span>
            <GrClose color="var(--text-primary)" size={25} className="icon" onClick={onClose} />
        </div>
    );
};

export default Alert;