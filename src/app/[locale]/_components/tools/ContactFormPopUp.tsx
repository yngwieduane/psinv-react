import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import "./ContactForm.css";
import { useTranslation } from "react-i18next";


import {
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const ContactFormPopUp = (props) => {
  const { t } = useTranslation();

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");

  const [postId, setPostId] = useState();
  const [statusAct, setStatusAct] = useState();

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
    };

    const formData2 = {
      TitleID: "129932",
      FirstName: enteredName,
      FamilyName: "n/a",
      MobileCountryCode: "",
      MobileAreaCode: "",
      MobilePhone: enteredPhone,
      TelephoneCountryCode: "",
      TelephoneAreaCode: "",
      Telephone: "",
      Email: enteredEmail,
      NationalityID: "65946",
      LanguageID: "",
      CompanyID: "",
      Remarks: "",
      RequirementType: "",
      ContactType: "",
      CountryID: "65946",
      StateID: "",
      CityID: "",
      DistrictID: "",
      CommunityID: "",
      PropertyID: "",
      UnitType: "",
      MethodOfContact: "",
      MediaType: "",
      MediaName: "",
      DeactivateNotification: "",
      Bedroom: "",
      Bathroom: "",
      Budget: "",
      Budget2: "",
      AreaFrom: "",
      AreaTo: "",
      RequirementCountryID: "",
      ExistingClient: "",
      CompaignSource: "",
      CompaignMedium: "",
      Company: "",
      NumberOfEmployee: "",
      LeadStageId: "",
      LeadRatingId: "",
      UnitId: "",
      ReferredToID: "",
      ReferredByID: "",
      IsBulkUpload: "",
      ActivityAssignedTo: "",
      ActivityDate: "",
      ActivityTypeId: "",
      ActivitySubject: "",
      ActivityRemarks: "",
      IsForAutoRotation: "",
      PropertyCampaignId: "",
      contactClassId: "",
    };

    console.log(formData);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData2),
    };
    fetch("https://api.portal.psi-crm.com/leads?APIKEY=160c2879807f44981a4f85fe5751272f4bf57785fb6f39f80330ab3d1604e050787d7abff8c5101a", requestOptions)
      .then((response) => response.json())
      .then((data) => setPostId(data.status));
      
    props.onSaveFormData(formData);
    setEnteredName("");
    setEnteredEmail("");
    setEnteredPhone("");
  };

  return (
    <form onSubmit={submitHandler} className="backdrop-blur-sm text-start">
    {(postId == 'Success') ? <div className="block text-white p-3 mb-5 rounded bg-green-500">Success</div> : ''}
    {(postId == 'Error') ? <div className="block text-white p-3 mb-5 rounded bg-red-500">Error</div> : ''}
      <div className="border-gray-900/10">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
          <div className="">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              {t("name")}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="full-name"
                id="full-name"
                autoComplete="given-name"
                value={enteredName}
                onChange={nameChangeHandler}
                placeholder="John Doe"
                className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium leading-6 text-black"
            >
              {t("phone_number")}
            </label>
            <div className="">
              <PhoneInput
              className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                international
                defaultCountry="AE"
                placeholder="Enter phone number"
                value={enteredPhone}
                countryCallingCodeEditable={false}
                onChange={setEnteredPhone}/>
              
            </div>
          </div>
          <div className="">
            
          <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-black"
            >
              {t("email_address")}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EnvelopeIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                placeholder="you@example.com"
                className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-3 py-3 text-md font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
              {t("send")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactFormPopUp;
