import { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";


// Declaring outside component to avoid recreation on each render
const emptyAddress = {
    city: "",
    country: "",
};

const STATUS = {
    IDLE: "IDLE",
    SUBITTED: "SUBITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED"
};

const Checkout = ({ cart, emptyCart }) => {
    const [address, setAddress] = useState(emptyAddress);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [saveError, setSaveError] = useState(null);
    const [touched, setTouched] = useState({});
    const getErrors = (address: any) => {
        const result: any = {}
        if (!address.city) result.city = "City is required";
        if (!address.country) result.city = "Country is required";
        return result;
    }

    // Dervied State
    const errors: any = getErrors(address);
    const isValid = Object.keys(errors).length === 0;
    const handleChange = (e: any) => {
        // TODO
        // e.persist();
        setAddress((curAddres) => {
            return {
                ...curAddres,
                [e.target.id]: e.target.value
            }
        })
    }

    const handleBlur = (event: any) => {
        // TODOC
        setTouched((cur) => {
            return {
                ...cur, [event.target.value]: true
            }
        })
    }

    const handleSubmit = async (event: any) => {
        // TODO
        event.preventDefault();
        setStatus(STATUS.SUBMITTING);
        if (isValid) {
            try {
                saveShippingAddress(address);
                setStatus(STATUS.COMPLETED);

            } catch (error: any) {
                setSaveError(error);
            }
        } else {
            setStatus(STATUS.SUBITTED);
        }
    }


    if (saveError) throw saveError;
    if (status === STATUS.COMPLETED) {
        return <h1>Thanks for shoping</h1>
    }

    return (
        <>
            <h1>Shipping Info</h1>
            {
                !isValid && status === STATUS.SUBITTED && (
                    <div role="alert">
                        <p>
                            Please fix the following errors
                        </p>
                        <ul>
                            {Object.keys(errors).map((key) => {
                                return <li role="alert">{errors[key]}</li>
                            })}
                        </ul>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="city">City</label>
                    <br />
                    <input
                        id="city"
                        type="text"
                        value={address.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <p role="alert">
                        {(touched.city || status === STATUS.SUBITTED) && errors.city}
                    </p>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <br />
                    <select
                        id="country"
                        value={address.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="">Select Country</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="USA">USA</option>
                    </select>
                    <p role="alert">
                        {(touched.country || status === STATUS.SUBITTED) && errors.country}
                    </p>
                </div>

                <div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Save Shipping Info"
                        disabled={status === STATUS.SUBMITTING}
                    />
                </div>
            </form>
        </>
    );

}

export default Checkout;