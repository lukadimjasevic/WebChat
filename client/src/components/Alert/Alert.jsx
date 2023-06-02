import React, { useEffect, useState } from "react";
import "./Alert.css";
import { BsCheckCircleFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useAlert } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { hide } from "../../features/alert";

const Alert = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [lineVisible, setLineVisible] = useState(false);

    let AlertIcon, alertColor;

    switch(alert.type) {
        case "success":
            AlertIcon = BsCheckCircleFill;
            alertColor = "#83AE35";
            break;
        case "info":
            AlertIcon = AiFillInfoCircle;
            alertColor = "#67AAEC";
            break;
        case "danger":
            AlertIcon = BsFillExclamationTriangleFill;
            alertColor = "#CA0B00";
            break;
    }

    const alertStyle = {
        borderTop: `2px solid ${alertColor}`,
        borderBottom: `2px solid ${alertColor}`,
        borderRight: `2px solid ${alertColor}`,
        borderLeft: `5px solid ${alertColor}`,
    };

    useEffect(() => {
        setTimeout(() => {
            setLineVisible(true);
            setTimeout(() => {
                setLineVisible(false);
                setTimeout(() => {
                    dispatch(hide());
                }, 1500)
            }, 2000)
        }, 1500)
    }, []);

    return (
        <div>
            <div className="alert-main" style={alertStyle}>
                <AlertIcon color={alertColor} size={25} />
                <span>{alert.message}</span>
                <MdClose color="var(--text-primary)" size={25} className="icon" onClick={() => dispatch(hide())} />
            </div>
            <div className={`alert-line ${lineVisible ? "line-show" : "line-hide"}`}></div>
        </div>
    );
};

export default Alert;