import React, { useEffect, useMemo } from "react";

import { titleScroller } from "../../../utils/Utils";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import SelectAsync from "../../../components/form/SelectAsync";
import TextArea from "../../../components/form/TextArea";
import InputFile from "../../../components/form/InputFile";
import DefaultAction from "../../../action/DefaultAction";
import validationStore from "../../../store/validationStore";
import dataStore from "../../../store/dataStore";
import {
  A_EDIT_PROFILE,
  A_UPDATE_PROFILE,
  A_U_GENDER,
} from "../../../vars/api";
import { FORM_EDIT_PROFILE, FORM_UPDATE_PROFILE } from "../../../vars/formName";
import { L_DETAIL, L_S_GENDER } from "../../../vars/loading";
import FormButton from "../../../components/button/FormButton";
import loadingStore from "../../../store/loadingStore";
import LoadingForm from "../../../components/LoadingForm";
import authStore from "../../../store/authStore";
import { objSelectTo } from "../../../helpers/ObjHelper";

function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control,
  } = useForm();

  // API FUNC
  const { selectData, sendData, detailData } = DefaultAction();

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

  // INIT
  useEffect(() => {
    detailData({
      formName: FORM_EDIT_PROFILE,
      path: A_EDIT_PROFILE,
      id: "",
    });
  }, []);

  useEffect(() => titleScroller("Edit Profile"), []);

  const onSubmit = (req) => {
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
              Edit Profile
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
                  setValue={(name, value) => setValue(name, value)}
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
                  defaultValue={objSelectTo(details, "gender", "gender")}
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
                    setDetail({ [FORM_EDIT_PROFILE]: { gender: e.value } });
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

              {/* submit */}
              <FormButton />
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default EditProfile;
