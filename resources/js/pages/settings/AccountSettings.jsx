import React, { useEffect, useMemo, useState } from "react";

import { titleScroller } from "../../utils/Utils";
import PageTitle from "../../components/layouts/partials/PageTitle";
import Input from "../../components/form/Input";
import AccordionList from "../../components/accordion/AccordionList";
import Password from "../../components/form/Password";
import { useForm } from "react-hook-form";
import validationStore from "../../store/validationStore";
import {
  FORM_CHANGE_PASSWORD,
  FORM_EDIT_PROFILE,
  FORM_UPDATE_PROFILE,
} from "../../vars/formName";
import loadingStore from "../../store/loadingStore";
import DefaultAction from "../../action/DefaultAction";
import dataStore from "../../store/dataStore";
import { L_DETAIL, L_S_GENDER } from "../../vars/loading";
import {
  A_CHANGE_PASSWORD,
  A_EDIT_PROFILE,
  A_UPDATE_PROFILE,
  A_U_GENDER,
} from "../../vars/api";
import LoadingForm from "../../components/LoadingForm";
import FormButton from "../../components/button/FormButton";
import classNames from "classnames";
import { FaAsterisk, FaUserEdit } from "react-icons/fa";
import authStore from "../../store/authStore";
import InputFile from "../../components/form/InputFile";
import SelectAsync from "../../components/form/SelectAsync";
import TextArea from "../../components/form/TextArea";
import { objSelectTo } from "../../helpers/ObjHelper";
import Extend from "../../components/layouts/Extend";
import { FaUserCog } from "react-icons/fa";
import { BsIncognito } from "react-icons/bs";

function AccountSettings() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm();

  // API FUNC
  const { selectData, sendData, detailData } = DefaultAction();

  const [isProfile, setisProfile] = useState(false);

  // LOAD VALIDATION FROM ZUUSTAND
  const { validation } = validationStore((state) => state);

  const { details: getDetails, setDetail } = dataStore((state) => state);
  const { setAuthData } = authStore((state) => state);

  // DATA EDIT FROM ZUUSTAND
  const details = useMemo(
    () => getDetails[FORM_EDIT_PROFILE] ?? {},
    [getDetails]
  );

  // LOAD LOADING FROM ZUUSTAND
  const { loading: getLoading } = loadingStore((state) => state);
  const loading = useMemo(() => getLoading[L_DETAIL], [getLoading]);

  const { name, photo } = authStore((state) => state);

  // accordion toggle
  const [focus, setFocus] = useState(null);

  // INIT
  useEffect(() => {
    detailData({
      formName: FORM_EDIT_PROFILE,
      path: A_EDIT_PROFILE,
      id: "",
    });
  }, []);

  useEffect(() => titleScroller("Account Settings"), []);

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

  const onSubmitProfile = (req) => {
    sendData({
      path: A_UPDATE_PROFILE,
      id: "",
      withoutId: true,
      formName: FORM_UPDATE_PROFILE,
      req,
      imgData: ["photo"],
      onSuccess: (e) => {
        let res = { name: e.name };
        if (e.photo) {
          res.photo = e.photo;
        }
        setAuthData(res);
      },
    });
  };

  return (
    <Extend isSlate={true}>
      <PageTitle
        isSlate={true}
        title="Account Settings"
        links={[
          { name: "Home", url: "/" },
          { name: "Settings" },
          { name: "Account" },
        ]}
        imageUrl="/images/page-title/settings.jpg"
      />

      <div className="bg-slate-100 w-full">
        <div className="w-full container mx-auto rounded-xl relative px-12 ">
          <div className="bg-white mb-32 relative w-full flex items-center rounded-xl shadow-md">
            {/* label */}
            <div
              className={classNames(
                "z-[1] transition-all duration-500 absolute w-2/5 shadow-xl before:absolute before:content-[''] before:w-full before:bg-secondary-400/60 before:rounded-xl before:h-full bg-cover bg-center bg-no-repeat px-6 py-4 md:px-8 xl:px-12 md:py-6 text-white rounded-xl flex flex-col justify-center items-center",
                {
                  "ml-[60%]": isProfile,
                }
              )}
              style={{
                height: "calc(100% + 3rem)",
                backgroundImage: `url("${photo}")`,
              }}
            >
              <div className="text-center mb-8 relative">
                {isProfile ? (
                  <>
                    <h2 className="uppercase text-4xl font-['Helvetica'] font-bold pb-4">
                      Preferences
                    </h2>
                    <h4 className="w-fit mx-auto text-xl">
                      Here you can edit your profile and the news preference as
                      well or you can click the button below to change your
                      account password
                    </h4>
                  </>
                ) : (
                  <>
                    <h2 className="uppercase text-4xl font-['Helvetica'] font-bold pb-4">
                      Password
                    </h2>
                    <h4 className="w-fit mx-auto text-xl">
                      Here you can change your account password or click the
                      button below to edit your profile and the news preference
                      as well
                    </h4>
                  </>
                )}
              </div>

              <button
                type="button"
                className="relative text-lg uppercase py-2 px-6 rounded-full hover-box-shadow font-medium transition-all duration-300 hover:scale-x-105 text-white bg-primary-400 "
                onClick={() => {
                  setisProfile(!isProfile);
                  setFocus(0);
                }}
              >
                {isProfile ? "Change Password" : "Edit Profile"}
              </button>
            </div>

            {/* form */}
            <div
              className={classNames(
                "min-h-[18rem] relative transition-all text-slate-600 duration-500 py-4",
                !isProfile ? "w-full" : "w-3/5",
                { "pl-[40%]": !isProfile }
              )}
            >
              <div className="px-6 py-4 md:px-8 xl:px-12 md:py-6 w-full">
                <div>
                  <h1 className="uppercase text-4xl pt-4 pb-6 font-['Helvetica'] font-extrabold text-center">
                    {isProfile ? (
                      <>
                        Edit <span className="text-primary-200">Profile</span>
                      </>
                    ) : (
                      <>
                        Change{" "}
                        <span className="text-primary-200">Password</span>
                      </>
                    )}
                  </h1>
                </div>
                <div className="relative w-full flex flex-col gap-6">
                  {loading ? (
                    <LoadingForm />
                  ) : (
                    <form
                      onSubmit={handleSubmit(
                        isProfile ? onSubmitProfile : onSubmit
                      )}
                    >
                      {isProfile ? (
                        <>
                          {/* personal data */}
                          <AccordionList
                            Icon={FaUserEdit}
                            title="Personal Data"
                            tabIndex="1"
                            focus={focus}
                            setFocus={setFocus}
                          >
                            <div className="py-4 space-y-4">
                              <div>
                                <Input
                                  label="Full Name"
                                  name="name"
                                  register={register}
                                  errors={{ ...errors, ...validation }}
                                  placeholder="Enter your full name"
                                  validation={{ required: true }}
                                  defaultValue={details.name}
                                  changeValue={updateValue}
                                />
                              </div>
                              <div>
                                <InputFile
                                  imageDefault={details.photo}
                                  imageOnly={true}
                                  label="Photo"
                                  name="photo"
                                  accept="image/png, image/jpeg, image/webp"
                                  register={register}
                                  errors={{ ...errors, ...validation }}
                                  placeholder="No file chosen"
                                  setValue={(name, value) =>
                                    setValue(name, value)
                                  }
                                />
                              </div>
                              <div>
                                <Input
                                  label="Birthdate"
                                  name="birthdate"
                                  type="date"
                                  register={register}
                                  errors={{ ...errors, ...validation }}
                                  placeholder="Enter your birthdate"
                                  validation={{ required: true }}
                                  defaultValue={details.birthdate}
                                  changeValue={updateValue}
                                />
                              </div>
                              <div>
                                <SelectAsync
                                  defaultValue={objSelectTo(
                                    details,
                                    "gender",
                                    "gender"
                                  )}
                                  placeholder="Gender"
                                  label="Gender"
                                  name="gender"
                                  errors={{ ...errors, ...validation }}
                                  validation={{
                                    required: true,
                                  }}
                                  isLoading={getLoading[L_S_GENDER]}
                                  register={register}
                                  loadAPI={(search, cb) =>
                                    selectData({
                                      path: A_U_GENDER,
                                      search,
                                      loadingVar: L_S_GENDER,
                                      cb,
                                    })
                                  }
                                  setValue={(e) => setValue("gender", e)}
                                  onChange={(e) => {
                                    setDetail({
                                      [FORM_EDIT_PROFILE]: { gender: e.value },
                                    });
                                    updateValue("gender", e, true);
                                  }}
                                />
                              </div>

                              <div>
                                <TextArea
                                  label="Address"
                                  name="address"
                                  register={register}
                                  errors={{ ...errors, ...validation }}
                                  placeholder="Enter your address"
                                  defaultValue={details.address}
                                  changeValue={updateValue}
                                />
                              </div>

                              <div>
                                <Input
                                  label="Phone"
                                  name="phone"
                                  register={register}
                                  errors={{ ...errors, ...validation }}
                                  placeholder="Enter your phone"
                                  validation={{ required: true }}
                                  setNumberOnly={true}
                                  defaultValue={details.phone}
                                  changeValue={updateValue}
                                />
                              </div>
                            </div>
                          </AccordionList>

                          {/* news preferences */}
                          <AccordionList
                            Icon={BsIncognito}
                            title="News Preferences"
                            tabIndex="2"
                            focus={focus}
                            setFocus={setFocus}
                          >
                            <div className="py-4 space-y-4">
                              {/* sources */}
                              <div className="flex flex-col gap-y-1">
                                {/* header */}
                                <div className="flex items-center gap-x-2">
                                  <input
                                    id="cb_sources"
                                    type="checkbox"
                                    className="form-checkbox cursor-pointer"
                                    name="cb_sources"
                                    //   value={e.value}
                                    //   onChange={(e) => {
                                    //     onChange(e);
                                    //     setValue(name, e.target.value);
                                    //   }}
                                  />
                                  <label
                                    className="flex font-medium cursor-pointer uppercase"
                                    htmlFor="cb_sources"
                                  >
                                    Sources
                                  </label>
                                </div>
                                {/* detail */}
                                <div className="flex flex-col ml-6">
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      id="cb-source-1"
                                      type="checkbox"
                                      className="form-checkbox cursor-pointer"
                                      name="cb_sources"
                                      //   value={e.value}
                                      //   onChange={(e) => {
                                      //     onChange(e);
                                      //     setValue(name, e.target.value);
                                      //   }}
                                    />
                                    <label
                                      className="text-sm font-medium cursor-pointer"
                                      htmlFor="cb-source-1"
                                    >
                                      Source A
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      id="cb-source-2"
                                      type="checkbox"
                                      className="form-checkbox cursor-pointer"
                                      name="cb_sources"
                                      //   value={e.value}
                                      //   onChange={(e) => {
                                      //     onChange(e);
                                      //     setValue(name, e.target.value);
                                      //   }}
                                    />
                                    <label
                                      className="text-sm font-medium cursor-pointer"
                                      htmlFor="cb-source-2"
                                    >
                                      Source B
                                    </label>
                                  </div>
                                </div>
                              </div>

                              {/* categories */}
                              <div className="flex flex-col gap-y-1">
                                {/* header */}
                                <div className="flex items-center gap-x-2">
                                  <input
                                    id="cb_categories"
                                    type="checkbox"
                                    className="form-checkbox cursor-pointer"
                                    name="cb_categories"
                                    //   value={e.value}
                                    //   onChange={(e) => {
                                    //     onChange(e);
                                    //     setValue(name, e.target.value);
                                    //   }}
                                  />
                                  <label
                                    className="flex font-medium cursor-pointer uppercase"
                                    htmlFor="cb_categories"
                                  >
                                    categories
                                  </label>
                                </div>
                                {/* detail */}
                                <div className="flex flex-col ml-6">
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      id="cb-category-1"
                                      type="checkbox"
                                      className="form-checkbox cursor-pointer"
                                      name="cb_categories"
                                      //   value={e.value}
                                      //   onChange={(e) => {
                                      //     onChange(e);
                                      //     setValue(name, e.target.value);
                                      //   }}
                                    />
                                    <label
                                      className="text-sm font-medium cursor-pointer"
                                      htmlFor="cb-category-1"
                                    >
                                      Category A
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      id="cb-category-2"
                                      type="checkbox"
                                      className="form-checkbox cursor-pointer"
                                      name="cb_categories"
                                      //   value={e.value}
                                      //   onChange={(e) => {
                                      //     onChange(e);
                                      //     setValue(name, e.target.value);
                                      //   }}
                                    />
                                    <label
                                      className="text-sm font-medium cursor-pointer"
                                      htmlFor="cb-category-2"
                                    >
                                      Category B
                                    </label>
                                  </div>
                                </div>
                              </div>

                              {/* authors */}
                              <div className="flex flex-col gap-y-1">
                                {/* header */}
                                <div className="flex items-center gap-x-2">
                                  <input
                                    id="cb_authors"
                                    type="checkbox"
                                    className="form-checkbox cursor-pointer"
                                    name="cb_authors"
                                    //   value={e.value}
                                    //   onChange={(e) => {
                                    //     onChange(e);
                                    //     setValue(name, e.target.value);
                                    //   }}
                                  />
                                  <label
                                    className="flex font-medium cursor-pointer uppercase"
                                    htmlFor="cb_authors"
                                  >
                                    authors
                                  </label>
                                </div>
                                {/* detail */}
                                <div className="flex flex-col ml-6">
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      id="cb-author-1"
                                      type="checkbox"
                                      className="form-checkbox cursor-pointer"
                                      name="cb_authors"
                                      //   value={e.value}
                                      //   onChange={(e) => {
                                      //     onChange(e);
                                      //     setValue(name, e.target.value);
                                      //   }}
                                    />
                                    <label
                                      className="text-sm font-medium cursor-pointer"
                                      htmlFor="cb-author-1"
                                    >
                                      Author A
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      id="cb-author-2"
                                      type="checkbox"
                                      className="form-checkbox cursor-pointer"
                                      name="cb_authors"
                                      //   value={e.value}
                                      //   onChange={(e) => {
                                      //     onChange(e);
                                      //     setValue(name, e.target.value);
                                      //   }}
                                    />
                                    <label
                                      className="text-sm font-medium cursor-pointer"
                                      htmlFor="cb-author-2"
                                    >
                                      Author B
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionList>
                        </>
                      ) : (
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
                        </div>
                      )}

                      <FormButton
                        onCancel={resetForm}
                        submitText="save changes"
                      />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Extend>
  );
}

export default AccountSettings;
