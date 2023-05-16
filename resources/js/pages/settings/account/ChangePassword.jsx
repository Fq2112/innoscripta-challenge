import React, { useEffect, useMemo } from "react";

import { titleScroller } from "../../../utils/Utils";
import Input from "../../../components/form/Input";
import Password from "../../../components/form/Password";
import { useForm } from "react-hook-form";
import validationStore from "../../../store/validationStore";
import {
    FORM_CHANGE_PASSWORD,
    FORM_EDIT_PROFILE,
} from "../../../vars/formName";
import loadingStore from "../../../store/loadingStore";
import DefaultAction from "../../../action/DefaultAction";
import dataStore from "../../../store/dataStore";
import { L_DETAIL } from "../../../vars/loading";
import { A_CHANGE_PASSWORD, A_EDIT_PROFILE } from "../../../vars/api";
import LoadingForm from "../../../components/LoadingForm";
import FormButton from "../../../components/button/FormButton";

function ChangePassword() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        control,
    } = useForm();

    // API FUNC
    const { sendData, detailData } = DefaultAction();

    // LOAD VALIDATION FROM ZUUSTAND
    const { validation } = validationStore((state) => state);

    const { details: getDetails } = dataStore((state) => state);

    // DATA EDIT FROM ZUUSTAND
    const details = useMemo(
        () => getDetails[FORM_EDIT_PROFILE] ?? {},
        [getDetails]
    );

    // LOAD LOADING FROM ZUUSTAND
    const { loading: getLoading } = loadingStore((state) => state);
    const loading = useMemo(() => getLoading[L_DETAIL], [getLoading]);

    // INIT
    useEffect(() => {
        detailData({
            formName: FORM_EDIT_PROFILE,
            path: A_EDIT_PROFILE,
            id: "",
        });
    }, []);

    useEffect(() => titleScroller("Change Password"), []);

    const onSubmit = (req) => {
        sendData({
            path: A_CHANGE_PASSWORD,
            id: "",
            withoutId: true,
            formName: FORM_CHANGE_PASSWORD,
            req,
        });
        resetForm();
    };

    const resetForm = () => {
        setValue("password", null);
        setValue("new_password", null);
        setValue("password_confirmation", null);
    };

    const updateValue = (name, value, isSelected = false) => {
        setValue(name, isSelected ? value?.value : value);
    };

    return (
        <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Page header */}
                <div className="sm:flex sm:justify-between sm:items-center mb-5">
                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-navy-100 dark:font-medium font-bold">
                            Change Password
                        </h1>
                    </div>
                </div>

                {/* loading */}
                {loading && <LoadingForm />}

                {/* Form */}
                {!loading && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={{ ...errors, ...validation }}
                                    placeholder="Enter your email"
                                    validation={{ disabled: true }}
                                    defaultValue={details.email}
                                    changeValue={updateValue}
                                />
                            </div>
                            <div>
                                <Password
                                    label="Current Password"
                                    name="password"
                                    register={register}
                                    preventHoverBorder={true}
                                    placeholder="Enter your new password"
                                    errors={{
                                        ...errors,
                                        ...validation,
                                    }}
                                    validation={{ required: true }}
                                />
                            </div>
                            <div>
                                <Password
                                    label="New Password"
                                    name="new_password"
                                    register={register}
                                    preventHoverBorder={true}
                                    placeholder="Enter your new password"
                                    errors={{
                                        ...errors,
                                        ...validation,
                                    }}
                                    validation={{ required: true }}
                                />
                            </div>
                            <div>
                                <Password
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    register={register}
                                    preventHoverBorder={true}
                                    placeholder="Retype your new password"
                                    errors={{
                                        ...errors,
                                        ...validation,
                                    }}
                                    validation={{ required: true }}
                                />
                            </div>

                            {/* submit */}
                            <FormButton onCancel={resetForm} />
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}

export default ChangePassword;
