import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import loadingStore from "../../store/loadingStore";
import { L_POST } from "../../vars/loading";
import classNames from "classnames";
import paramsStore from "../../store/paramsStore";
import dataStore from "../../store/dataStore";

function FormButton({ onCancel,submitText="Submit" }) {
    const location = useLocation();

    // VARS BACK TO TABLE
    const navigate = useNavigate();
    const [goingBack, setGoingBack] = useState(false);

    // VARS RESET PARAMS FROM ZUUSTAND
    const { resetParams } = paramsStore((state) => state);

    // BACK TO TABLE EVENT
    useEffect(() => {
        if (goingBack) {
            resetParams();
            navigate(location.pathname);
        }
    }, [goingBack]);

    const { accessable } = dataStore((state) => state);
    const { loading: getLoading } = loadingStore((state) => state);
    const loading = useMemo(() => getLoading[L_POST], [getLoading]);

    return (
        <div className="flex gap-x-2 justify-end mt-6">
            <button
                type="button"
                className="btn bg-slate-200 hover:bg-slate-300 dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-navy-100 text-slate-600 whitespace-nowrap uppercase"
                onClick={() => (onCancel ? onCancel() : setGoingBack(true))}
            >
                cancel
            </button>
            {/* TODO:: UNEDITABLE */}
            <button
                disabled={accessable.can_update == false}
                className={classNames(
                    "flex gap-x-1 btn bg-primary-100 hover:bg-primary-200 text-white uppercase",
                    {
                        "opacity-75 cursor-not-allowed":
                            accessable.can_update == false,
                    }
                )}
                type="submit"
            >
                {submitText}
                {loading && (
                    <BiLoaderAlt className="animate-spin fill-current opacity-50 flex-none h-4 w-4" />
                )}
            </button>
        </div>
    );
}

export default FormButton;
